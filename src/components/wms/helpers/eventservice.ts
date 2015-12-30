/// <reference path="../../../typings/tsd.d.ts" />

import {EventEmitter} from 'angular2/angular2';

export class EventService {
  layerEmitter: any;
  capsEmitter: any;

  constructor() {
    this.layerEmitter = new EventEmitter();
    this.capsEmitter = new EventEmitter();
  }

}
