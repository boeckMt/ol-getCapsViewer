/// <reference path="../../../typings/tsd.d.ts" />

import {Component, Input, EventEmitter,ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import __Wms1_1_1 = Wms1_1_1;
import __Ol = ol;

import {EventService} from '../helpers/eventservice';

@Component({
  selector: 'layer-detail',
  templateUrl: './components/wms/layerdetail/layerdetail.html',
  directives: [CORE_DIRECTIVES]
})

export class LayerDetail {
  @ViewChild('mapDiv') mapDiv;
  @Input() capabilities: any; // stored value

  map: ol.Map;
  baseLayer: ol.layer.Tile;
  wmsLayer: ol.layer.Tile;
  bboxLayer: ol.layer.Vector;
  options: olx.MapOptions;
  viewOptions: olx.ViewOptions;
  view: any;
  ldetail: Object;

  constructor(private evt: EventService) {

  }

  ngAfterViewInit() {
    // viewChild is updated after the view has been initialized
    var _target: Element = this.mapDiv.nativeElement;
    this.initMap(_target, this.evt);
  }

  initMap(_target: Element, evt: EventService){
    if (_target && !_target.hasChildNodes()) {
      this.viewOptions = {
        center: ol.proj.fromLonLat([0, 0], 'EPSG:3857'),
        zoom: 2
      }

      this.view = new ol.View(this.viewOptions)
      this.baseLayer = new ol.layer.Tile({
        opacity: 0.5,
        source: new ol.source.XYZ({
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
          attributions: [new ol.Attribution({
            html: '&copy <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer" target="_blank">ArcGIS</a>'
          })]
        })
      })

      this.options = {
        target: _target,
        layers: [
          this.baseLayer
        ],
        view: this.view
      }

      this.map = new ol.Map(this.options);

      this.map.on('click', (evt) => {
        var coos: ol.Coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(coos)
      })

    }

    if (this.map) {
      evt.layerEmitter.subscribe((data) => {
        console.log(data)
        this.ldetail = data;
        this.addLayer(data);
      });

      evt.capsEmitter.subscribe((data) => {
        this.removeOverlays();
      });
    }

  }


  addLayer(_layer: __Wms1_1_1.Layer): void {
    // create a service that we can subscribe to and submit events
    // Then we use the dependency injection mechanism to inject that service anywhere on the application where we need it.
    console.log(_layer)
    this.removeOverlays();

    var _url = _layer.url = this.capabilities.url
    var _layers = _layer.Name;
    var _attribution;

    if (!_layer.Attribution) {
      _attribution = new ol.Attribution({
        html: `&copy <a href="${_url}" target="_blank">${_layer.Name}</a>`
      })
    } else {
      _attribution = new ol.Attribution({
        html: `&copy <a href="${_url}" target="_blank">${_layer.Attribution}</a>`
      })
    }


    var _extent = this.extentBuilder(_layer);

    //--------------------------------------------------------------------------
    this.wmsLayer = new ol.layer.Tile({
      extent: _extent,
      source: new ol.source.TileWMS({
        url: _url,
        params: { 'LAYERS': _layers, 'TILED': true, 'VERSION': this.capabilities.version },
        //params:{'BBOX':'', 'CRS':'', 'FORMAT':'', 'HEIGHT':'', 'LAYERS':'', 'REQUEST':'', 'SERVICE':'', 'STYLES':'', 'TILED	':'',
        //'TRANSPARENT':'', 'VERSION':'', 'WIDTH':''}
        serverType: 'geoserver',
        attributions: []
      })
    })

    this.bboxLayer = this.createBboxLayer(_extent);


    this.map.addLayer(this.bboxLayer);
    this.map.addLayer(this.wmsLayer);

    this.map.getView().fit(_extent, this.map.getSize());
    console.log(this.map.getLayers().getArray())
  }

  removeOverlays(): void {
    this.map.removeLayer(this.bboxLayer)
    this.map.removeLayer(this.wmsLayer)
    //console.log(this.map.getLayers().getArray())
  }

  checkExtentLatLng(extent: Array<number>): boolean {
    var max: number;
    var numbers: Array<number> = [];
    var isLatLng: boolean = false;
    extent.forEach(num => {
      var numdigits = Math.abs(num).toString().split(".")[0].length;
      numbers.push(numdigits);
    })

    if (Math.max(...numbers) <= 3) {
      isLatLng = true;
    } else {
      isLatLng = false;
    }

    return isLatLng;
  }

  adjustLatInfCoos(coordinate: number): number {
    var _coordinate;
    if (coordinate >= 90) {
      _coordinate = 89;
    } else if (coordinate <= -90) {
      _coordinate = -89;
    } else {
      _coordinate = coordinate;
    }
    return _coordinate;
  }

  adjustLngInfCoos(coordinate: number): number {
    var _coordinate;
    if (coordinate >= 180) {
      _coordinate = 179;
    } else if (coordinate <= -180) {
      _coordinate = -179;
    } else {
      _coordinate = coordinate;
    }
    return _coordinate;
  }

  createBboxLayer(extent: __Ol.Extent): ol.layer.Vector {
    var polygonFeature = new ol.Feature(ol.geom.Polygon.fromExtent(extent));

    var extentLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [polygonFeature]
      })
    })

    return extentLayer;
  }

  extentBuilder(layer: __Wms1_1_1.Layer): __Ol.Extent {
    var _extent;
    var crs = 'EPSG:4326';

    // check available extents
    if (layer.EX_GeographicBoundingBox) {
      crs = 'EPSG:4326';
      _extent = layer.EX_GeographicBoundingBox;
    } else {
      _extent = layer.BoundingBox[0].extent;

      if (layer.BoundingBox[0].crs) {
        crs = layer.BoundingBox[0].crs;
      }
    }

    if (this.checkExtentLatLng(_extent)) {

      //change -/+ 180 and 90 values
      for (let i = 0; i < _extent.length; i++) {
        if (i == 0 || i == 2) {
          _extent[i] = this.adjustLngInfCoos(_extent[i]);
        } else if (i == 1 || i == 3) {
          _extent[i] = this.adjustLatInfCoos(_extent[i]);
        }
      }

      _extent = ol.proj.transformExtent(_extent, crs, 'EPSG:3857')
    }

    return _extent;
  }




}
