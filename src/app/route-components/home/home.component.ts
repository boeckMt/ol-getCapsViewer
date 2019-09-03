import { Component, HostBinding } from '@angular/core';
import { AppStoreService } from '../../shared/app-store.service';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @HostBinding('class') class = 'content-container';
  caps: wms.WMS_CapabilitiesType;
  service: wms.ServiceType;
  capability: wms.CapabilityType;
  private subscriber: Subscription;

  constructor(private store: AppStoreService) {
    this.subscriber = store.caps$.subscribe((caps) => {
      if (caps) {
        this.caps = caps;
        this.capability = caps.Capability;
        this.service = caps.Service;
      }
    })


  }
}
