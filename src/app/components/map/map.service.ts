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

import ScaleLine from 'ol/control/ScaleLine';
import FullScreen from 'ol/control/FullScreen';
import { defaults as olDefaultControls } from 'ol/control';

export interface IolWmsTileLayer extends olTileLayer {
  title: string;
  anchor: string;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: olMap;
  view: olView;
  projection: olProjection;
  epsgWgs84 = 'EPSG:4326';
  center: [number, number];
  zoom: number;
  baselayers: olLayerGroup;
  overlays: olLayerGroup;
  ratio: number;

  constructor() {
    this.map = ({} as any);
    this.view = ({} as any);
    this.baselayers = ({} as any);
    this.overlays = ({} as any);

    this.projection = getProjection('EPSG:3857');
    this.zoom = 4;
    this.center = olTransform([0, 45], this.epsgWgs84, this.projection) as any,

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

    this.baselayers = new olLayerGroup({
      name: 'baselayers',
      layers: [baselayer]
    } as any);

    this.overlays = new olLayerGroup({
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
    let wgs84bbox = null;
    if (layer.EX_GeographicBoundingBox) {
      wgs84bbox = layer.EX_GeographicBoundingBox;
    }
    else if (layer.BoundingBox && layer.BoundingBox.find(i => i.CRS === this.epsgWgs84)) {
      wgs84bbox = layer.BoundingBox.find(i => i.CRS === this.epsgWgs84);
    }

    const wmsSource = new olTileWMS({
      url: wmsurl,
      params: { LAYERS: layer.Name, TILED: true },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    });

    const templayer: IolWmsTileLayer = new olTileLayer({
      title: layer.Title,
      anchor: (layer as any).anchor,
      abstract: layer.Abstract,
      source: wmsSource
    } as any) as IolWmsTileLayer;
    if (wgs84bbox) {
      const extent = olTransformExtent(wgs84bbox, this.epsgWgs84, this.projection);
      templayer.setExtent(extent);
    }
    return templayer;
  }

  setProjection(code, proj4def, bbox) {
    if (code === null || proj4def === null || bbox === null) {
      // Nothing usable found, using EPSG:3857...';
      this.projection = getProjection('EPSG:3857');

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

    // very approximate calculation of projection extent
    const extent = olTransformExtent([bbox[1], bbox[2], bbox[3], bbox[0]], this.epsgWgs84, this.projection);
    this.projection.setExtent(extent);
    this.view = new olView({
      projection: this.projection
    });
    this.map.setView(this.view);
    this.view.fit(extent);
  }
}
