import { Component } from '@angular/core';
import { AppStoreService } from '../../shared/app-store.service';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'content-container' } //to add class to the component for clarity container height
})
export class HomeComponent {
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
