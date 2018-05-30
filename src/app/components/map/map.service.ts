import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import * as wms from '../../../../xmlns/www.opengis.net/wms';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: ol.Map;
  view: ol.View;
  baselayers: ol.layer.Group;
  overlays: ol.layer.Group;

  constructor() {
    this.map = <any>{}
    this.view = <any>{}
    this.baselayers = <any>{}
    this.overlays = <any>{}


    this.view = new ol.View({
      center: ol.proj.transform([0, 45], 'EPSG:4326', 'EPSG:3857'),
      zoom: 4,
    });

    var baselayer = new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.OSM()
    })

    this.baselayers = new ol.layer.Group(<any>{
      name: 'baselayers',
      layers: [baselayer]
    })

    this.overlays = new ol.layer.Group(<any>{
      name: 'overlays'
    })

    this.map = new ol.Map({
      view: this.view,
      layers: [
        this.baselayers,
        this.overlays
      ],
      controls: [],
      //target: 'map'
    });
  }

  setTarget(target) {
    //target: 'map'
    this.map.setTarget(target);
  }

  addOverlay(layer: ol.layer.Base) {
    this.overlays.getLayers().push(layer);
  }

  removeOverlay(layer: ol.layer.Base) {
    this.overlays.getLayers().remove(layer);
  }

  createWmsLayer(layer:wms.LayerType) {
    return new ol.layer.Tile(<any>{
      title: layer.Title,
      abstract: layer.Abstract,
      //extent: ol.proj.transformExtent(<any>layer.EX_GeographicBoundingBox, 'EPSG:4326', 'EPSG:3857'),
      source: new ol.source.TileWMS({
        url: '',
        params: { 'LAYERS': layer.Name, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    })
  }
}
