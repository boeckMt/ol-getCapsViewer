import { Component, ViewEncapsulation } from '@angular/core';
import { AppStoreService } from './shared/app-store.service';
import { Subscription } from 'rxjs/Subscription';
import { OgcWmsService } from './shared/ogc-wms.service';

//import '@clr/icons';
//import '@clr/icons/shapes/all-shapes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  alert: any = false;
  loading: boolean = false;
  private subscriber1: Subscription;
  private subscriber2: Subscription;

  wmsurl: string;
  wmsversion: '1.1.1' | '1.3.0' = '1.3.0';
  wmsversions: string[] = ['1.1.1', '1.3.0'];

  constructor(private store: AppStoreService, private wmssvc: OgcWmsService) {
    this.loading = store.getLoading();
    this.alert = store.getAlert();

    this.wmsurl = 'http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xml'; //'https://maps.dwd.de/geoserver/dwd/wms';
    //https://geoservice.dlr.de/eoc/basemap/wms

    this.subscriber1 = this.store.loading$.subscribe((loading) => {
      this.loading = loading;
    })

    this.subscriber2 = this.store.alert$.subscribe((alert) => {
      this.alert = alert;
    })
  }

  requestCaps() {


    //if (!_store.caps) {

    this.store.setLoading(true);
    this.wmssvc.getWmsCaps(this.wmsurl, this.wmsversion).subscribe((result) => {
      console.log(result)
      //this.makeLayersFlatt(result.Capability.Layer);
      //this.layersarray.push(result.Capability.Layer);


      this.wmsversion = <any>result.version;
      this.store.setCaps(result)
      this.store.setLoading(false);
    }, (error) => {
      console.log(error)
      this.store.setLoading(false);
      this.store.setAlert({
        type: 'alert-danger',
        action: 'Close',
        text: JSON.stringify(error)
      })
    });
    //}
  }
  alertAction() {
    console.log('do an action');
  }
  alertClose() {
    this.store.setAlert(null);
  }

  setVersion(version: '1.1.1' | '1.3.0') {
    this.wmsversion = version
    console.log(this.wmsversion)
  }

  checkVersion(version: '1.1.1' | '1.3.0') {
    if (this.wmsversion == version) {
      return true;
    } else {
      return false;
    }
  }
}
