import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import WMSCapabilities from 'ol/format/WMSCapabilities';

// import * as ogc from '../shared/ogc-wms'
import * as wms from '../../../xmlns/www.opengis.net/wms';
import { BehaviorSubject, Observable } from 'rxjs';

interface IProxyPost {
  proxy: string;
}

interface ICapabilitiesTypeExt extends wms.WMS_CapabilitiesType {
  wmsurl: string;
}

@Injectable({
  providedIn: 'root'
})
export class OgcWmsService {
  WMS_Capabilities: ICapabilitiesTypeExt;

  private caps: BehaviorSubject<wms.WMS_CapabilitiesType>;
  public caps$: Observable<wms.WMS_CapabilitiesType>;

  constructor(private http: HttpClient) {
    this.caps = new BehaviorSubject<wms.WMS_CapabilitiesType>(null);
    this.caps$ = this.caps.asObservable();
  }

  getWmsCaps(url: string, version: string) {
    const parser = new WMSCapabilities();
    const service = 'wms';
    const request = 'GetCapabilities';
    const body = {
      proxy: `${url}?SERVICE=${service}&VERSION=${version}&REQUEST=${request}`
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      // observe?: 'body' | 'events' | 'response',
      // params?: HttpParams|{[param: string]: string | string[]},
      // reportProgress?: boolean,
      // withCredentials?: boolean,
      responseType: 'text' as any // force response as text for xml
    };

    return this.http.post<string | Document | Element>('/proxy', JSON.stringify(body), httpOptions).pipe(map((res) => {
      console.log(res)
      return parser.read(res) as ICapabilitiesTypeExt;
    }));

  }

  setCaps(caps: wms.WMS_CapabilitiesType) {
    this.caps.next(caps);
  }
  getCaps() {
    return this.caps.getValue();
  }
}
