//depends on https://github.com/danrevah/ngx-pipes
import { Component, Input } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { MapService } from '../map/map.service';
import { Router, ActivatedRoute } from '@angular/router';

interface IToggleLayerType extends wms.LayerType {
  toggle?: boolean;
  anchor?: string;
}

type requestKeys = keyof wms.CapabilityType['Request'];
type layerKeys = keyof wms.CapabilityType['Layer'];

const wgs84 = 'EPSG:4326';
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
  CapabilityView = { toggle: false, anchor: 'capabilities', title: 'Caps.Capability' };
  Request: wms.RequestType;
  RequestView = { toggle: false, anchor: 'requesty', title: 'Caps.Capability.Request' };
  Layer: IToggleLayerType;
  LayerView = { toggle: false, anchor: 'layer', title: 'Caps.Capability.Layer' };
  layersarray: IToggleLayerType[];
  url: string;
  layerSearch: string = null;
  constructor(private mapsvc: MapService, private router: Router, private route: ActivatedRoute) {
    this.layersarray = [];
  }

  initData(value?): void {
    this.url = this.serviceurl;
    this.Capability = value;
    if (this.capability.Request) {
      this.Request = this.capability.Request;
    }

    if (this.capability.Layer) {
      this.Layer = this.capability.Layer;

      this.layersarray = [];
      this.getAllLayers(this.Layer);
      // console.log(this.layersarray);
    }

  }

  showDeepPropsRequest(key: requestKeys, obj: wms.CapabilityType['Request']) {
    if (key === 'GetCapabilities' || key === 'GetFeatureInfo' || key === 'GetMap') {
      return obj[key].Format;
    }
  }

  showDeepPropsLayer(key: layerKeys, obj: wms.CapabilityType['Layer']) {
    if (key === 'AuthorityURL') {
      return obj[key].map(i => `${i.name}: ${i.OnlineResource}`);
    } else if (key === 'Layer') {
      return JSON.stringify(obj[key].map(l => l.Title));
    } else if (key === 'BoundingBox') {
      // TODO: _BoundingBoxType wrong
      // return obj[key].find(i => i === wgs84);
      return obj[key];
    } else {
      return obj[key];
    }

  }

  getAllLayers(Layer: IToggleLayerType) {
    if (Layer.Layer) {
      const layers = Layer.Layer;
      if (Layer.Name) {
        this.layersarray.push(Layer);
      }
      layers.forEach((l: IToggleLayerType) => {
        l.anchor = this.createAnchor(l.Title);
        this.getAllLayers(l);
      });
    } else {
      if (Layer.Name) {
        this.layersarray.push(Layer);
      }
    }
  }

  createAnchor(Title) {
    return Title.replace(/\s/g, '-').replace(/[,.:()_#$%&{}§"]/g, '');
  }

  toggleObject(obj: any) {
    window.location.hash = '';
    if (obj.toggle !== true) {
      obj.toggle = true;
      window.location.hash = obj.anchor;
    } else {
      obj.toggle = false;
      window.location.hash = '';
    }
  }

  addToMap(layer: IToggleLayerType) {
    // TODO get CRS - reproject...
    const layers = [];
    if (layer.Layer.length) {
      layer.Layer.forEach(l => {
        const olLayer = this.mapsvc.createWmsLayer(l, this.serviceurl);
        layers.push(olLayer);
      });
    } else {
      const olLayer = this.mapsvc.createWmsLayer(layer, this.serviceurl);
      layers.push(olLayer);
    }

    layers.forEach(l => {
      this.mapsvc.addOverlay(l);
    });
    this.router.navigate(['map']);
  }
}
