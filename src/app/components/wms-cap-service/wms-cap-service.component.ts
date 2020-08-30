//depends on https://github.com/danrevah/ngx-pipes
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';

@Component({
  selector: 'wms-cap-service',
  templateUrl: './wms-cap-service.component.html',
  styleUrls: ['./wms-cap-service.component.scss']
})
export class WmsCapServiceComponent implements OnInit {
  @Input() service: wms.ServiceType
  Service
  ContactInformation
  ContactPersonPrimary
  ContactAddress
  constructor() {

  }

  ngOnInit() {
    this.initData()
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['service']) {
      this.initData();
    }
  }

  initData() {
    this.Service = this.service;
    if (this.service.ContactInformation) {
      this.ContactInformation = this.Service.ContactInformation;

      if (this.service.ContactInformation.ContactPersonPrimary) {
        this.ContactPersonPrimary = this.Service.ContactInformation.ContactPersonPrimary;
      }

      if (this.service.ContactInformation.ContactAddress) {
        this.ContactAddress = this.Service.ContactInformation.ContactAddress;
      }
    }
  }

}
