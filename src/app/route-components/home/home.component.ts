import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { OgcWmsService } from 'src/app/shared/ogc-wms.service';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'content-container';
  caps: wms.WMS_CapabilitiesType;
  service: wms.ServiceType;
  capability: wms.CapabilityType;
  private subscriber: Subscription;

  constructor(private wmsSvc: OgcWmsService) {
  }

  ngOnInit(): void {
    this.subscriber = this.wmsSvc.caps$.subscribe((caps) => {
      if (caps) {
        this.caps = caps;
        this.capability = caps.Capability;
        this.service = caps.Service;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
