import { Component, OnInit, Input } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';

@Component({
  selector: 'layer-tree',
  templateUrl: './layer-tree.component.html',
  styleUrls: ['./layer-tree.component.scss']
})
export class LayerTreeComponent implements OnInit {
  @Input('layer') layer: wms.LayerType;
  constructor() {

  }


  hasLayers(layer: wms.LayerType) {
    if (Array.isArray(layer.Layer) && layer.Layer.length > 0) {
      layer['expand'] = true;
      return true;
    } else {
      return false;
    }
  }



  ngOnInit() {
  }

}
