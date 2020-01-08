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
export class WmsCapCapabilityComponent implements OnInit {
  @Input() capability: wms.CapabilityType;
  @Input() serviceurl: string;
  Capability: wms.CapabilityType
  Request: wms.RequestType;
  Layer: wms.LayerType;
  layersarray: wms.LayerType[];
  url:string;
  constructor(private mapsvc: MapService, private router: Router, private route: ActivatedRoute) {
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
          _layer['anchor'] = this.createAnchor(_layer.Title);
        this.layersarray.push(_layer)
        //}
        this.getAllLayers(_layer);
      })
    }
  }

  createAnchor(Title){
    return Title.replace(/\s/g,'-').replace(/[,.:()_#$%&{}§"]/g,'');
  }

  toggleLayerTable(layer:wms.LayerType) {
    console.log(layer);
    if (layer['toggle'] != true) {
      layer['toggle'] = true;
    } else {
      layer['toggle'] = false;
    }
    window.location.hash = ''; 
    window.location.hash = layer['anchor'];
  }

  addToMap(layer: wms.LayerType) {
    //TODO get CRS - reproject...
    let ol_layer = this.mapsvc.createWmsLayer(layer, this.serviceurl)
    console.log(ol_layer)
    this.mapsvc.addOverlay(ol_layer);
    this.router.navigate(['map']);
  }
}
