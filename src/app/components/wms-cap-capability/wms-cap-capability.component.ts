//depends on https://github.com/danrevah/ngx-pipes
import { Component, Input } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { Router, ActivatedRoute } from '@angular/router';
import { createWMSLayer } from 'src/app/shared/layer-from-caps';
import { LayersService } from '@dlr-eoc/services-layers';

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

  @Input()
  get version(): string {
    return this.serviceVersion;
  }
  set version(value: string) {
    this.serviceVersion = value;
  }

  Capability: wms.CapabilityType;
  CapabilityView = { toggle: false, anchor: 'capabilities', title: 'Caps.Capability' };
  Request: wms.RequestType;
  RequestView = { toggle: false, anchor: 'requesty', title: 'Caps.Capability.Request' };
  Layer: IToggleLayerType;
  LayerView = { toggle: false, anchor: 'layer', title: 'Caps.Capability.Layer' };
  layersarray: IToggleLayerType[];
  protected url: string;
  protected serviceVersion: string;
  layerSearch: string = null;
  constructor(private router: Router, private route: ActivatedRoute, private layerSvc: LayersService) {
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

    // only simple test implementation
    const wmslayer = createWMSLayer(layer, this.serviceurl, this.version);
    this.layerSvc.addLayer(wmslayer, 'Layers'); // this is not working with -> providers: [LayersService, MapStateService, MapOlService] in map route

    this.router.navigate(['map']);
  }
}
