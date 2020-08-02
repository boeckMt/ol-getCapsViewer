//depends on https://github.com/danrevah/ngx-pipes
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { MapService } from '../map/map.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wms-cap-capability',
  templateUrl: './wms-cap-capability.component.html',
  styleUrls: ['./wms-cap-capability.component.scss']
})
export class WmsCapCapabilityComponent {
  @Input()
  get capability(): wms.CapabilityType {
    return this.Capability;
    // throw new Error('Attribute "capability" is required');
  }
  set capability(value: wms.CapabilityType) {
    // Object.defineProperty(this, 'capability', { value, writable: true, configurable: true });
    this.Capability = value;
    this.initData(value);
  }

  @Input()
  get serviceurl(): string {
    return this.url;
  }
  set serviceurl(value: string) {
    this.url = value;
  }

  Capability: wms.CapabilityType;
  CapabilityView = { anchor: 'capabilities', title: 'Caps.Capability' };
  Request: wms.RequestType;
  RequestView = { anchor: 'requesty', title: 'Caps.Capability.Request' };
  Layer: wms.LayerType;
  LayerView = { anchor: 'layer', title: 'Caps.Capability.Layer' };
  layersarray: wms.LayerType[];
  url: string;
  constructor(private mapsvc: MapService, private router: Router, private route: ActivatedRoute) {
    this.layersarray = [];
  }

  initData(value?) {
    this.url = this.serviceurl;
    this.Capability = value;
    if (this.capability.Request) {
      this.Request = this.capability.Request;
    }

    if (this.capability.Layer) {
      this.Layer = this.capability.Layer;

      this.getAllLayers(this.Layer);
      // console.log(this.layersarray);
    }

  }


  getAllLayers(Layer: wms.LayerType) {
    if (Layer.Layer) {
      this.layersarray = [];
      const layers = Layer.Layer;
      layers.forEach((_layer) => {
        // if(_layer.Name){
        _layer['anchor'] = this.createAnchor(_layer.Title);
        this.layersarray.push(_layer);
        // }
        this.getAllLayers(_layer);
      });
    }
  }

  createAnchor(Title) {
    return Title.replace(/\s/g, '-').replace(/[,.:()_#$%&{}§"]/g, '');
  }

  toggleObject(layer: wms.LayerType) {
    console.log(layer);
    window.location.hash = '';
    if (layer['toggle'] !== true) {
      layer['toggle'] = true;
      window.location.hash = layer['anchor'];
    } else {
      layer['toggle'] = false;
      window.location.hash = '';
    }
  }

  addToMap(layer: wms.LayerType) {
    // TODO get CRS - reproject...
    const ol_layer = this.mapsvc.createWmsLayer(layer, this.serviceurl);
    // console.log(ol_layer);
    this.mapsvc.addOverlay(ol_layer);
    this.router.navigate(['map']);
  }
}
