/// <reference path="../../../typings/tsd.d.ts" />
import {EventEmitter} from 'angular2/angular2';

export class EventService {
  _emitter: any = new EventEmitter();

  constructor() {
  }

  get emitter() {
    //console.log("----------")
    //console.log(this._emitter)
    return this._emitter; //.toRx();
  }

}
