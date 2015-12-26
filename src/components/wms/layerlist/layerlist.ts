/// <reference path="../../../typings/tsd.d.ts" />

import {Component, CORE_DIRECTIVES, Input, Output, EventEmitter} from 'angular2/angular2';


import {StartsWithPipe} from '../helpers/startswithpipe';
import {EventService} from '../helpers/eventservice';


@Component({
  selector: 'layer-list',
  templateUrl: './components/wms/layerlist/layerlist.html',
  directives: [CORE_DIRECTIVES],
  pipes: [StartsWithPipe]
})

export class LayerList {
  @Input() layersarray:Array<Object>; // stored value
  //@Input() selected: Object;
  //@Output() selectedChange: EventEmitter<Object> = new EventEmitter();

  filter: string;
  selectedLayer: string;
  evt: any;

  constructor(evt: EventService) {
    this.filter = '';
    this.evt = evt;
  }

  sendLayerData(layer: any) {
    this.selectedLayer = layer.Name;
    this.evt.emitter.next(layer);
  }

}
