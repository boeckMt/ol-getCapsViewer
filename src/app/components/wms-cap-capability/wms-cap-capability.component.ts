//depends on https://github.com/danrevah/ngx-pipes
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { MapService } from '../map/map.service';

@Component({
  selector: 'wms-cap-capability',
  templateUrl: './wms-cap-capability.component.html',
  styleUrls: ['./wms-cap-capability.component.scss']
})
export class WmsCapCapabilityComponent implements OnInit {
  @Input() capability: wms.CapabilityType;
  @Input() serviceurl: string;
  Capability: wms.CapabilityType
  Request: wms.RequestType;
  Layer: wms.LayerType;
  layersarray: wms.LayerType[];
  url:string;
  constructor(private mapsvc: MapService) {
    this.layersarray = [];
  }

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
    this.url = this.serviceurl;
    this.Capability = this.capability;
    if (this.capability.Request) {
      this.Request = this.capability.Request;
    }

    if (this.capability.Layer) {
      this.Layer = this.capability.Layer;

      this.getAllLayers(this.Layer)
      console.log(this.layersarray)
    }

  }


  getAllLayers(Layer: wms.LayerType) {
    if (Layer.Layer) {
      let layers = Layer.Layer;
      layers.forEach((_layer) => {
        //if(_layer.Name){
        this.layersarray.push(_layer)
        //}
        this.getAllLayers(_layer);
      })
    }
  }

  toggleLayerTable(layer) {
    console.log(layer);
    if (layer.toggle != true) {
      layer.toggle = true;
    } else {
      layer.toggle = false;
    }

    console.log(layer);

  }

  addToMap(layer: wms.LayerType) {
    //TODO get CRS - reproject...
    let ol_layer = this.mapsvc.createWmsLayer(layer, this.serviceurl)
    console.log(ol_layer)
    this.mapsvc.addOverlay(ol_layer);
  }

}
