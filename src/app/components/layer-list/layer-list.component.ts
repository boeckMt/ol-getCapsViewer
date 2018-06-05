import { Component, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { layer } from 'openlayers';


@Component({
  selector: 'ol-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent implements OnInit{
  layersarray: layer.Base[];
  constructor(private mapsvc: MapService) {
    this.layersarray = [];
  }

  ngOnInit() {
    this.layersarray = this.mapsvc.overlays.getLayers().getArray()
  }

  removeLayer(layer:layer.Base){
    console.log(layer)
    this.mapsvc.removeOverlay(layer)
  }



}
