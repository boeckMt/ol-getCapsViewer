/// <reference path="../../../typings/tsd.d.ts" />

import {Component,Input, Output, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

import {StartsWithPipe} from '../helpers/startswithpipe';
import {EventService} from '../helpers/eventservice';

import __Ol = ol;
import __Wms1_1_1 = Wms1_1_1;


@Component({
  selector: 'layer-list',
  templateUrl: './components/wms/layerlist/layerlist.html',
  directives: [CORE_DIRECTIVES],
  pipes: [StartsWithPipe]
})

export class LayerList {
  filter: string;
  selectedLayer: string;
  evt: any;

  capabilitys: __Wms1_1_1.GetCapabilities;
  layersarray: Array<__Wms1_1_1.Layer> = [];
  layer: __Wms1_1_1.Layer;


  constructor(evt: EventService) {
    this.filter = '';
    this.evt = evt;

    evt.capsEmitter.subscribe((data: __Wms1_1_1.GetCapabilities) => {
      this.capabilitys = data;

      if(!data.Capability.Layer.Layer){
        this.layersarray = [data.Capability.Layer];
      }else{
          this.layersarray = data.Capability.Layer.Layer;
      }
    });
  }

  sendLayerData(layer: any) {
    this.selectedLayer = layer.Name;
    this.evt.layerEmitter.next(layer);
  }

}
