import { Component } from '@angular/core';

import './components/icons/ukis';

import { AlertService, IAlert } from './components/global-alert/alert.service';
import { ProgressService, IProgress } from './components/global-progress/progress.service';
import { Router } from '@angular/router';
// import { dwdcaps } from '../../tmp/capabilities';
import { OgcWmsService } from './shared/ogc-wms.service';

interface IUi {
  floating: boolean;
  flipped: boolean;
  alert: null | IAlert;
  progress: null | IProgress;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';
  shortTitle = '';

  ui: IUi = {
    floating: false,
    flipped: false,
    alert: null,
    progress: null
  };

  public wmsurl: string;
  wmsversion: '1.1.1' | '1.3.0' = '1.3.0';
  wmsversions: string[] = ['1.1.1', '1.3.0'];

  constructor(
    private alertService: AlertService,
    private progressService: ProgressService,
    public router: Router,
    public wmsSvc: OgcWmsService
  ) {
    // this.wmsurl = 'https://geoservice.dlr.de/eoc/basemap/wms';
    this.wmsurl = 'http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xml';
    // this.wmsurl = 'https://maps.dwd.de/geoserver/dwd/wms';
    this.init();
  }

  requestCaps(): void {

    this.progressService.progress({
      indeterminate: true
    });
    this.wmsSvc.getWmsCaps(this.wmsurl, this.wmsversion).subscribe((result) => {
      console.log(result);
      result.wmsurl = this.wmsurl;
      this.wmsversion = result.version as any;
      this.wmsSvc.setCaps(result);
      this.progressService.progress(null);
    }, (error) => {
      console.log(error);
      this.progressService.progress(null);
      this.alertService.alert({
        type: 'alert-danger',
        closeable: true,
        text: JSON.stringify(error)
      });
    });


    /** for test oly */
    /* this.wmsversion = dwdcaps.version as any;
    console.log(dwdcaps);
    this.wmsSvc.setCaps(dwdcaps as any); */
  }

  setVersion(version: '1.1.1' | '1.3.0'): void {
    this.wmsversion = version;
    console.log(this.wmsversion);
  }

  checkVersion(version: '1.1.1' | '1.3.0'): boolean {
    if (this.wmsversion === version) {
      return true;
    } else {
      return false;
    }
  }

  init() {
    this.getHtmlMeta(['title', 'version', 'description', 'short-title']);

    if (this['TITLE']) {
      this.title = this['TITLE'];
    }
    if (this['SHORT-TITLE']) {
      this.shortTitle = this['SHORT-TITLE'];
    }

    this.alertService.alert$.subscribe((ev) => {
      this.setAlert(ev);
    });

    this.progressService.progress$.subscribe((ev) => {
      this.showProgress(ev);
    });
  }

  showProgress = (progress: IProgress) => {
    this.ui.progress = progress;
  }

  setAlert = (alert: IAlert) => {
    this.ui.alert = alert;
  }

  getHtmlMeta(names: string[]) {
    const ref = document.getElementsByTagName('meta');
    for (let i = 0, len = ref.length; i < len; i++) {
      const meta = ref[i];
      const name = meta.getAttribute('name');
      if (names.includes(name)) {
        this[name.toUpperCase()] = meta.getAttribute('content') || meta.getAttribute('value');
      }
    }
  }
}
