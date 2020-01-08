import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import WMSCapabilities from 'ol/format/WMSCapabilities';

// import * as ogc from '../shared/ogc-wms'
import * as wms from '../../../xmlns/www.opengis.net/wms';

interface IProxyPost {
  proxy: string;
}

@Injectable({
  providedIn: 'root'
})
export class OgcWmsService {
  WMS_Capabilities: wms.WMS_CapabilitiesType;
  constructor(private http: HttpClient) { }

  getWmsCaps(url: string, version: string) {
    const parser = new WMSCapabilities();
    const service = 'wms', request = 'GetCapabilities',
      body = {
        proxy: `${url}?SERVICE=${service}&VERSION=${version}&REQUEST=${request}`
      };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: <any>'text' // force response as text for xml
    };

    return this.http.post<string | Document | Node>('/proxy', JSON.stringify(body), httpOptions).pipe(map((res) => {
      return <wms.WMS_CapabilitiesType>parser.read(res);
    }));

  }
}
