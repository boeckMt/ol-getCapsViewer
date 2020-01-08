import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import * as wms from '../../../xmlns/www.opengis.net/wms';
import { ClrAlert, ClrAlerts } from '@clr/angular';


type clrAlert = {
  type: 'alert-danger' | 'alert-warning' | 'alert-info' | 'alert-success';
  action: string
  text: string
};



@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  private alert: BehaviorSubject<clrAlert>;
  private loading: BehaviorSubject<boolean>;
  private caps: BehaviorSubject<wms.WMS_CapabilitiesType>;

  public  alert$: Observable<clrAlert>;
  public  loading$: Observable<boolean>;
  public  caps$: Observable<wms.WMS_CapabilitiesType>;

  constructor() {
    this.alert = new BehaviorSubject<clrAlert>(null);
    this.loading = new BehaviorSubject<boolean>(false);
    this.caps = new BehaviorSubject<wms.WMS_CapabilitiesType>(null);

    this.alert$ = this.alert.asObservable();
    this.loading$ = this.loading.asObservable();
    this.caps$ = this.caps.asObservable();
  }


  setLoading(loading:boolean) {
    this.loading.next(loading);
  }
  getLoading() {
    return this.loading.getValue();
  }
  setAlert(alert:clrAlert) {
    this.alert.next(alert)
  }
  getAlert() {
    return this.alert.getValue();
  }
  setCaps(caps:wms.WMS_CapabilitiesType) {
    this.caps.next(caps);
  }
  getCaps() {
    return this.caps.getValue();
  }
}

