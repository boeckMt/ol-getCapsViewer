import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {RouteParams} from 'angular2/router';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {ComponentInstruction, Location} from 'angular2/router';
import {Http, Request, Response, RequestMethod, Headers} from 'angular2/http';

import __Ol = ol;
import __Wms1_1_1 = Wms1_1_1;

import {LayerList} from './layerlist/layerlist';
import {LayerDetail} from './layerdetail/layerdetail';
import {EventService} from './helpers/eventservice';


@Component({
  selector: 'wms',
  templateUrl: './components/wms/wms.html',
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LayerList, LayerDetail]
})


export class Wms {
  capabilities: any; //__Ol.format.WMSCapabilities;
  emptyCaps: __Wms1_1_1.GetCapabilities;
  wmsUrl: string;
  wmsversion: string;
  service: string;
  request: string;
  reqObj: any;
  olParser: any = new __Ol.format.WMSCapabilities();
  loadError: boolean;
  loading: boolean;


  constructor(private location: Location, private http: Http, private evt: EventService) {
    this.service = 'wms';
    this.wmsversion = '1.1.1';
    this.request = 'GetCapabilities';
    this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';
    //this.loadGetCapabilities();
    //  './httpSampleData/getcapabilities_1.1.1.xml'
    //  http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer
    // https://geodienste.sachsen.de/wms_geosn_dtk-p-color/guest
    // http://schemas.opengis.net/wms/1.1.1/capabilities_1_1_1.xml

    this.initCaps();

    //in route change
    this.evt.capsEmitter.next('clear Map');
  }

  initCaps(): void {
    var emptyCaps: __Wms1_1_1.GetCapabilities = <__Wms1_1_1.GetCapabilities> {
      Capability: <__Wms1_1_1.Capability> {},
      Service: <__Wms1_1_1.Service> {},
      version: ''
    };

    this.capabilities = emptyCaps;
    this.evt.capsEmitter.next(this.capabilities);

    this.loading = false;
    this.loadError = false;
  }

  loadGetCapabilities(): void {
    this.initCaps();

    if (this.wmsUrl) {
      this.loading = true;
      //this.loadError = false;
      //this.capabilities = this.emptyCaps;
      //this.evt.capsEmitter.next(this.capabilities);

      var body = {
        proxy: `${this.wmsUrl}?service=${this.service}&version=${this.wmsversion}&request=${this.request}`
      };

      this.reqObj = this.http.request(new Request({
        method: RequestMethod.Post,
        url: '/proxy',
        body: JSON.stringify(body),
        headers: new Headers({ 'Content-Type': 'application/json' })
      })).map((res: Response) => res.text()).subscribe(res => this.handleResult(res), err => this.handleError(err));
    } else {
      console.log('no url provided!')
    }
  }

  handleResult(res): void {
    let capsJson: JSON = this.olParser.read(res);
    if (capsJson) {
      this.loadError = false;
      this.loading = false;

      this.capabilities = capsJson;
      this.capabilities.url = this.wmsUrl;
      this.capabilities.fullUrl = `${this.wmsUrl}?service=${this.service}&version=${this.wmsversion}&request=${this.request}`;
      this.evt.capsEmitter.next(this.capabilities);
      console.log(this.capabilities)
    }
  }

  handleError(err): void {
    this.initCaps();
    this.loadError = true;
    console.error(`There was an error:${err}`);
  }

  clearWmsUrl(): void {
    this.wmsUrl = '';
    this.cancelRequest();
  }

  cancelRequest(): void {
    //this.reqObj.next('canceled');
    this.reqObj.complete();
    this.initCaps();
  }


}
