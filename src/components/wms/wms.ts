import {CORE_DIRECTIVES, Component, EventEmitter} from 'angular2/angular2';

import {RouteParams} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ComponentInstruction, Location} from 'angular2/router';
import {Http, Request, Response, RequestMethod, Headers} from 'angular2/http';

import __Ol = ol;

import {LayerList} from './layerlist/layerlist';
import {LayerDetail} from './layerdetail/layerdetail';
import {EventService} from './helpers/eventservice';


@Component({
  selector: 'wms',
  templateUrl: './components/wms/wms.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LayerList, LayerDetail]
})


export class Wms {
  location: Location;
  capabilities: any; //__Ol.format.WMSCapabilities;
  layers: Array<Object>;
  wmsUrl: string;
  wmsversion: string;
  service: string;
  request: string;
  http: Http;
  olParser: any = new __Ol.format.WMSCapabilities();
  loadError: boolean;
  loading: boolean;
  evt: any;

  constructor(location: Location, http: Http, evt: EventService) {

    //this.location = location;
    this.evt = evt;
    this.http = http;

    this.service = 'wms';
    this.wmsversion = '1.1.1';
    this.request = 'GetCapabilities';
    this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';

//  './httpSampleData/getcapabilities_1.1.1.xml'
    //  http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer
    this.capabilities = {
      Capability: { Layer: { Layer: [] } },
      Service: {},
      version: ''
    };
    this.loading = false;
    this.loadError = false;

    //this.loadGetCapabilities();
  }

  loadGetCapabilities() {
    this.loading = true;

    var body = {
      proxy: `${this.wmsUrl}?service=${this.service}&version=${this.wmsversion}&request=${this.request}`
    };

    this.http.request(new Request({
      method: RequestMethod.Post,
      url: '/proxy',
      body: JSON.stringify(body),
      headers: new Headers({ 'Content-Type': 'application/json' })
      //search: 'param=value'
    })).map((res: Response) => res.text()).subscribe(res => this.handleResult(res), err => this.handleError(err));

  }

  handleResult(res) {
    var capsJson: JSON = this.olParser.read(res);
    if (capsJson) {
      this.loadError = false;
      this.loading = false;

      this.capabilities = capsJson;
      this.capabilities.url = this.wmsUrl;
      this.capabilities.fullUrl = `${this.wmsUrl}?service=${this.service}&version=${this.wmsversion}&request=${this.request}`;
      this.evt.capsEmitter.next('loaded');
      console.log(this.capabilities)
    }
  }

  handleError(err) {
    this.capabilities = {
      Capability: { Layer: { Layer: [] } },
      Service: {},
      version: ''
    };
    this.loadError = true;
    console.error(`There was an error:${err}`);
  }

/*
  getLinkStyle(path) {
    return this.location.path().indexOf(path) > -1;
  }
*/
}
