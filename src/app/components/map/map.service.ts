import { Injectable } from '@angular/core';
import * as wms from '../../../../xmlns/www.opengis.net/wms';
import proj4 from 'proj4';
import olMap from 'ol/Map';
import olView from 'ol/View';
import olLayerGroup from 'ol/layer/Group';
import olBaseLayer from 'ol/layer/Base';
import olTileLayer from 'ol/layer/Tile';
import olTileWMS from 'ol/source/TileWMS';

import olProjection from 'ol/proj/Projection';
import { transform as olTransform, transformExtent as olTransformExtent, get as getProjection } from 'ol/proj';
import { applyTransform as olApplyTransform } from 'ol/extent';

import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import { defaults as olDefaultControls } from 'ol/control';


@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: olMap;
  view: olView;
  projection: olProjection;
  center: [number, number];
  zoom: number;
  baselayers: olLayerGroup;
  overlays: olLayerGroup;
  ratio: number;

  constructor() {
    this.map = ( {} as any);
    this.view = ( {} as any);
    this.baselayers = ( {} as any);
    this.overlays = ( {} as any);

    this.projection = 'EPSG:3857';
    this.zoom = 4;
    this.center = olTransform([0, 45], 'EPSG:4326', this.projection),

      this.view = new olView({
        projection: this.projection,
        center: this.center,
        zoom: this.zoom
      });

    const baselayer = new olTileLayer({
      preload: Infinity,
      source: new olTileWMS({
        url: 'https://geoservice.dlr.de/eoc/basemap/wms',
        params: { LAYERS: 'litemap', TILED: true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    });

    this.baselayers = new olLayerGroup( {
      name: 'baselayers',
      layers: [baselayer]
    } as any);

    this.overlays = new olLayerGroup( {
      name: 'overlays'
    } as any);

    const scalec = new ScaleLine();
    const fullc = new FullScreen();

    this.map = new olMap({
      view: this.view,
      layers: [
        this.baselayers,
        this.overlays
      ],
      controls: olDefaultControls().extend([
        scalec, fullc
      ]),
      // target: 'map'
    });
  }

  setTarget(target: string | HTMLElement) {
    // target: 'map'
    let _target;
    if (typeof target === 'string') {
      _target = document.getElementById(target);
    } else {
      _target = target;
    }

    // hack - target heigth changing on route change with parent container height change????
    // not working if first route is not map...
    if (!this.ratio) {
      this.ratio = _target.clientWidth / _target.clientHeight;
    }

    // console.dir(_target.clientHeight, _target.clientWidth);
    if (_target) {
      this.map.setTarget(_target);
      // hack - target heigth changing on route change with parent container height change????
      // this.map.setSize([_target.clientWidth,_target.clientWidth/this.ratio])
      // console.log(this.map.getSize());
    } else {
      console.log('target for map does not exist!');
    }
  }

  addOverlay(layer: olBaseLayer) {
    this.overlays.getLayers().push(layer);
  }

  removeOverlay(layer: olBaseLayer) {
    this.overlays.getLayers().remove(layer);
  }

  createWmsLayer(layer: wms.LayerType, wmsurl) {
    console.log(layer)
    return new olTileLayer({
      title: layer.Title,
      anchor: (layer as any).anchor,
      abstract: layer.Abstract,
      extent: olTransformExtent( layer.EX_GeographicBoundingBox as any, 'EPSG:4326', this.projection),
      source: new olTileWMS({
        url: wmsurl,

        params: { LAYERS: layer.Name, TILED: true },
        serverType: 'geoserver',
        // Countries have transparency, so do not fade tiles:
        transition: 0
      })
    } as any);
  }

  setProjection(code, proj4def, bbox) {
    if (code === null || proj4def === null || bbox === null) {
      // Nothing usable found, using EPSG:3857...';
      this.projection = 'EPSG:3857';

      this.view = new olView({
        projection: this.projection,
        center: this.center,
        zoom: this.zoom
      });

      this.map.setView(this.view);
      return;
    }

    const newProjCode = 'EPSG:' + code;
    proj4.defs(newProjCode, proj4def);
    this.projection = getProjection(newProjCode);
    const fromLonLat = olTransform('EPSG:4326', this.projection);

    // very approximate calculation of projection extent
    const extent = olApplyTransform(
      [bbox[1], bbox[2], bbox[3], bbox[0]], fromLonLat);
    this.projection.setExtent(extent);
    this.view = new olView({
      projection: this.projection
    });
    this.map.setView(this.view);
    this.view.fit(extent);
  }
}
