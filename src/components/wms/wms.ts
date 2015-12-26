import {CORE_DIRECTIVES, Component, EventEmitter} from 'angular2/angular2';

import {RouteParams} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ComponentInstruction, Location} from 'angular2/router';
import {Http, Response, Headers} from 'angular2/http';

import __Ol = ol;

import {LayerList} from './layerlist/layerlist';
import {LayerDetail} from './layerdetail/layerdetail';


@Component({
  selector: 'wms',
  templateUrl: './components/wms/wms.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LayerList, LayerDetail],
  events: ['capsLoaded']
})


export class Wms {
  location: Location;
  capabilities: any; //__Ol.format.WMSCapabilities;
  layers: Array<Object>;
  wmsUrl: string;
  version: string;
  service: string;
  request: string;
  http: Http;
  olParser: any = new __Ol.format.WMSCapabilities();
  capsLoaded = new EventEmitter();

  constructor(location: Location, http: Http) {
    this.location = location;
    this.http = http;
    this.service = 'wms';
    this.version = '1.1.1';
    this.request = 'GetCapabilities';
    this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';
    //  './httpSampleData/getcapabilities_1.1.1.xml'
    //  shttp://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer
    this.capabilities = {
      Capability: { Layer: { Layer: [] } },
      Service: {},
      version: ''
    };

    this.loadGetCapabilities();
  }

  loadGetCapabilities() {
    console.log(this.wmsUrl)
    var url = `${this.wmsUrl}?service=${this.service}&version=${this.version}&request=${this.request}`;
    this.http.get(url).map((res: Response) => res.text()).subscribe(res => {
      var capsJson: JSON = this.olParser.read(res);
      this.capabilities = capsJson;
      this.capabilities.url = this.wmsUrl;
      this.capsLoaded.next('caps loaded');
      console.log(capsJson)
    });

  }


  getLinkStyle(path) {
    return this.location.path().indexOf(path) > -1;
  }
}
