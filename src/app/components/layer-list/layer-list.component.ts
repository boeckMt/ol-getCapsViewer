import { Component, OnInit, AfterViewInit } from '@angular/core';
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
export class LayerListComponent implements AfterViewInit {
  layersarray: wms.LayerType[]///layer.Base[];
  wmsurl: string = ''
  constructor(private mapsvc: MapService, private wmssvc: OgcWmsService, private store: AppStoreService) {
    this.layersarray = [];
  }

  ngOnInit() {
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


    //this.mapsvc.createWmsLayer

    //this.layersarray = this.mapsvc.overlays.getLayers().getArray()



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



  to_tree(obj) {
    // --------v create an <ul> element
    var f, li, ul = document.createElement("ul");
    // --v loop through its children
    for (f = 0; f < obj.folder.length; f++) {
      li = document.createElement("li");
      li.appendChild(document.createTextNode(obj.folder[f].title));
      // if the child has a 'folder' prop on its own, call me again
      if (obj.folder[f].folder) {
        li.appendChild(this.to_tree(obj.folder[f].folder));
      }
      ul.appendChild(li);
    }
    return ul;
  }


  ngAfterViewInit() {

  }


}
