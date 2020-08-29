import { Component, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import olBaseLayer from 'ol/layer/Base';

@Component({
  selector: 'ol-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent implements OnInit {
  layersarray: olBaseLayer[];
  constructor(private mapsvc: MapService) {
    this.layersarray = [];
  }

  ngOnInit() {
    this.layersarray = [...this.mapsvc.overlays.getLayers().getArray()];
  }

  removeLayer(layer: olBaseLayer) {
    // console.log(layer);
    const index = this.layersarray.indexOf(layer);
    this.mapsvc.removeOverlay(layer);
    this.layersarray = this.layersarray.filter(l => l.get('id') !== layer.get('id'));
  }

  removeAllLayers() {
    this.layersarray.map(l => {
      this.removeLayer(l);
    });
  }

  toggleLayer(layer: olBaseLayer) {
    const visible = layer.getVisible();
    layer.setVisible(!visible);
  }

  getLayerVisibleIcon(layer: olBaseLayer) {
    return layer.getVisible() ? 'eye-hide' : 'eye';
  }
}
