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
        center: ol.proj.fromLonLat([-100.9687542915344, 40.11168866559598], 'EPSG:3857'),
        zoom: 3
      }

      this.view = new ol.View(this.viewOptions)

      this.options = {
        target: _target,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
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
    var _extent = _layer.BoundingBox[0].extent;
    if (this.checkExtentLatLng(_extent)) {
      _extent = ol.proj.transformExtent(_extent, 'EPSG:4326', 'EPSG:3857')
    }

    var layer = new ol.layer.Tile({
      extent: _extent,
      source: new ol.source.TileWMS({
        url: _url,
        params: { 'LAYERS': _layers, 'TILED': true },
        //params:{'BBOX':'', 'CRS':'', 'FORMAT':'', 'HEIGHT':'', 'LAYERS':'', 'REQUEST':'', 'SERVICE':'', 'STYLES':'', 'TILED	':'',
        //'TRANSPARENT':'', 'VERSION':'', 'WIDTH':''}
        serverType: 'geoserver'
      })
    })


    this.addBboxLayer(_extent);
    this.map.addLayer(layer);
    this.map.getView().fitExtent(_extent, this.map.getSize());

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
