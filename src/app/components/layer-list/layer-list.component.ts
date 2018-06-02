import { Component } from '@angular/core';
import { MapService } from '../map/map.service';
import { layer } from 'openlayers';
import { OgcWmsService } from '../../shared/ogc-wms.service';

import * as wms from '../../../../xmlns/www.opengis.net/wms';
import { AppStoreService } from '../../shared/app-store.service';

@Component({
  selector: 'ol-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent {
  layersarray: wms.LayerType[]///layer.Base[];
  wmsurl: string = ''
  constructor(private mapsvc: MapService, private wmssvc: OgcWmsService, private store: AppStoreService) {
    this.layersarray = [];

/*
    //https://maps.dwd.de/geoserver/dwd/wms
    //https://geoservice.dlr.de/eoc/basemap/wms
    let _store = this.store.getStoreData();

    if (!_store.caps) {
      _store.loading = true;
      this.store.publishToStore(_store)
      let wmsurl = 'https://maps.dwd.de/geoserver/dwd/wms'
      this.wmssvc.getWmsCaps(wmsurl, '1.3.0', (result) => {
        console.log(result)

        this.makeLayersFlatt(result.Capability.Layer);
        //this.layersarray.push(result.Capability.Layer);

        console.log(this.layersarray);
        _store.loading = false;
        _store.caps = result;
        this.store.publishToStore(_store)
      });
    } else {
      this.makeLayersFlatt(_store.caps.Capability.Layer);
      console.log(this.layersarray);
    }

    */
  }

  /**
   * Layer is only addable if it has a Name prop for the getMap Request
   */

  makeLayersFlatt(layer: wms.LayerType) {
    if (layer.Layer && layer.Name) {
      let _layer = Object.assign({}, layer);
      delete _layer.Layer
      _layer['hasLayers'] = true;
      this.layersarray.push(_layer)
    } else {
      this.layersarray.push(layer)
    }
  }

}
