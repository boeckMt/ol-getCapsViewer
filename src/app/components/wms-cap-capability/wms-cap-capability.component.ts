//depends on https://github.com/danrevah/ngx-pipes
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';

@Component({
  selector: 'wms-cap-capability',
  templateUrl: './wms-cap-capability.component.html',
  styleUrls: ['./wms-cap-capability.component.scss']
})
export class WmsCapCapabilityComponent implements OnInit {
  @Input() capability: wms.CapabilityType;
  Capability
  Request
  Layer
  constructor() { }

  ngOnInit() {
    this.initData()
  }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes['capability']) {
      this.initData();
    }
  }

  initData() {
    this.Capability = this.capability;
    if (this.capability.Request) {
      this.Request = this.capability.Request;
    }

    if (this.capability.Layer) {
      this.Layer = this.capability.Layer;
    }
    
  }

}
