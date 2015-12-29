/// <reference path="../../../typings/tsd.d.ts" />

import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter} from 'angular2/angular2';

import __Ol = ol;

import {EventService} from '../helpers/eventservice';

@Component({
  selector: 'layer-detail',
  templateUrl: './components/wms/layerdetail/layerdetail.html',
  directives: [CORE_DIRECTIVES]
})

export class LayerDetail {
  @Input() capabilities: any; // stored value
  //@Input() layer: Object;

  map: ol.Map;
  options: olx.MapOptions;
  viewOptions: olx.ViewOptions;
  view: any;
  ldetail: Object;

  constructor(evt: EventService) {
    evt.emitter.subscribe((data) => {
      this.ldetail = data;
      this.addLayer(data);
    });


    var _target: HTMLElement = document.getElementById("map");

    if (!_target.hasChildNodes()) {
      this.viewOptions = {
        center: ol.proj.fromLonLat([0, 0], 'EPSG:3857'),
        zoom: 2
      }

      this.view = new ol.View(this.viewOptions)

      this.options = {
        target: _target,
        //controls: ol.control.defaults({ attribution: false }).extend([new ol.control.Attribution()]),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
/*
            opacity: 0.5,
            source: new ol.source.XYZ({
              url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
              attributions: new ol.Attribution({
                html: '&copy <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer">ArcGIS</a>'
              })
            })
*/

          })
        ],
        view: this.view
      }

      this.map = new ol.Map(this.options);

      this.map.on('click', (evt) => {
        var coos: ol.Coordinate = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
        console.log(coos)
      })

    }
  }


  addLayer(_layer: any): void {
    // create a service that we can subscribe to and submit events
    // Then we use the dependency injection mechanism to inject that service anywhere on the application where we need it.
    _layer.url = this.capabilities.url;
    this.removeAllLayers();
    console.log(_layer)
    var _url = _layer.url;
    var _layers = _layer.Name;
    var crs = 'EPSG:4326';
    var _extent;


    //version 1.3.0
    if (_layer.EX_GeographicBoundingBox) {
      crs = 'EPSG:4326';
      _extent = _layer.EX_GeographicBoundingBox;
    } else { //version 1.1.1
      _extent = _layer.BoundingBox[0].extent;

      if (_layer.BoundingBox[0].crs) {
        crs = _layer.BoundingBox[0].crs;
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
    console.log(_extent)

    //--------------------------------------------------------------------------
    var layer = new ol.layer.Tile({
      extent: _extent,
      source: new ol.source.TileWMS({
        url: _url,
        params: { 'LAYERS': _layers, 'TILED': true, 'VERSION': this.capabilities.version },
        //params:{'BBOX':'', 'CRS':'', 'FORMAT':'', 'HEIGHT':'', 'LAYERS':'', 'REQUEST':'', 'SERVICE':'', 'STYLES':'', 'TILED	':'',
        //'TRANSPARENT':'', 'VERSION':'', 'WIDTH':''}
        serverType: 'geoserver'
      })
    })


    this.addBboxLayer(_extent);
    this.map.addLayer(layer);
    this.map.getView().fit(_extent, this.map.getSize());

  }

  removeAllLayers(): void {
    var layers = this.map.getLayers();

    layers.forEach((layer, index) => {
      if (index != 0) {
        this.map.removeLayer(layer)
      }
      //console.log(layer, index)
    })

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

  addBboxLayer(extent: __Ol.Extent): void {
    this.removeAllLayers();

    var polygonFeature = new ol.Feature(ol.geom.Polygon.fromExtent(extent));

    var extentLayer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [polygonFeature]
      })
    })

    this.map.addLayer(extentLayer)
  }




}
