import { Injectable } from '@angular/core';
import * as ol from 'openlayers';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import * as proj4 from 'proj4';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: ol.Map;
  view: ol.View;
  projection: ol.ProjectionLike;
  center: [number, number];
  zoom: number;
  baselayers: ol.layer.Group;
  overlays: ol.layer.Group;
  ratio:number;

  constructor() {
    this.map = <any>{}
    this.view = <any>{}
    this.baselayers = <any>{}
    this.overlays = <any>{}

    this.projection = 'EPSG:3857'
    this.zoom = 4;
    this.center = ol.proj.transform([0, 45], 'EPSG:4326', this.projection),

    this.view = new ol.View({
      projection: this.projection,
      center: this.center,
      zoom: this.zoom
    });

    var baselayer = new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.TileWMS({
        url: 'https://geoservice.dlr.de/eoc/basemap/wms',
        params: { 'LAYERS': 'litemap', 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
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
      //controls: [],
      //target: 'map'
    });
  }

  setTarget(target) {
    //target: 'map'
    let _target = document.getElementById(target);
    
    //hack - target heigth changing on route change with parent container height change????
    //not working if first route is not map...
    if(!this.ratio){
      this.ratio = _target.clientWidth / _target.clientHeight;
    }
    
    console.dir(_target.clientHeight, _target.clientWidth)
    if(_target){
      this.map.setTarget(_target);
      //hack - target heigth changing on route change with parent container height change????
      this.map.setSize([_target.clientWidth,_target.clientWidth/this.ratio])
      console.log(this.map.getSize());
    }else{
      console.log('target for map does not exist!')
    }
  }

  addOverlay(layer: ol.layer.Base) {
    this.overlays.getLayers().push(layer);
  }

  removeOverlay(layer: ol.layer.Base) {
    this.overlays.getLayers().remove(layer);
  }

  createWmsLayer(layer:wms.LayerType, wmsurl) {
    return new ol.layer.Tile(<any>{
      title: layer.Title,
      abstract: layer.Abstract,
      //extent: ol.proj.transformExtent(<any>layer.EX_GeographicBoundingBox, 'EPSG:4326', 'EPSG:3857'),
      source: new ol.source.TileWMS({
        url: wmsurl,
        params: { 'LAYERS': layer.Name, 'TILED': true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    })
  }

  setProjection(code, proj4def, bbox) {
    if (code === null || proj4def === null || bbox === null) {
      //Nothing usable found, using EPSG:3857...';
      this.projection = 'EPSG:3857'

      this.view = new ol.View({
        projection: this.projection,
        center: this.center,
        zoom: this.zoom
      })

      this.map.setView(this.view);
      return;
    }

    var newProjCode = 'EPSG:' + code;
    proj4.defs(newProjCode, proj4def);
    this.projection = ol.proj.get(newProjCode);
    var fromLonLat = ol.proj.getTransform('EPSG:4326', this.projection);

    // very approximate calculation of projection extent
    var extent = ol.extent.applyTransform(
        [bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
    this.projection.setExtent(extent);
    this.view = new ol.View({
      projection: this.projection
    });
    this.map.setView(this.view);
    this.view.fit(extent);
  }
}
