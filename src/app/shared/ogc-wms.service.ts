import { Injectable } from '@angular/core';
import { format } from 'openlayers';

//import * as ogc from '../shared/ogc-wms'
import * as wms from '../../../xmlns/www.opengis.net/wms';

@Injectable({
  providedIn: 'root'
})
export class OgcWmsService {
  WMS_Capabilities: wms.WMS_CapabilitiesType;
  constructor() { }

  getWmsCaps(url:string, version:string, cb: (result: wms.WMS_CapabilitiesType) => any){
    var parser = new format.WMSCapabilities();
    fetch(`${url}?service=wms&request=GetCapabilities&version=${version}`).then((response) => {
      return response.text();
    }).then((text) => {
      var result = <wms.WMS_CapabilitiesType>parser.read(text);
      this.WMS_Capabilities = result;
      cb(this.WMS_Capabilities);
    });
  }
}
