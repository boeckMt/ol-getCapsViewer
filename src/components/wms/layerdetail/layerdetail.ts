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


  addLayer(_layer: any) {
    // create a service that we can subscribe to and submit events
    // Then we use the dependency injection mechanism to inject that service anywhere on the application where we need it.
    _layer.url = this.capabilities.url;
    this.removeAllLayers();
    console.log(_layer)

    var layer = new ol.layer.Tile({
      extent: [-13884991, 2870341, -7455066, 6338219],
      source: new ol.source.TileWMS({
        url: _layer.url,
        params: { 'LAYERS': _layer.Name, 'TILED': true },
        serverType: 'geoserver'
      })
    })

    this.map.addLayer(layer)

  }

  removeAllLayers(){
    var layers = this.map.getLayers();
    var overlays = this.map.getOverlays()

    //this.map.removeLayer()
    layers.forEach((layer, index)=> {
      //var props: any = layer.getProperties();
      console.log(layer, index)
      if(index > 0){
        this.map.removeLayer(layer)
      }
    })

  }

}
