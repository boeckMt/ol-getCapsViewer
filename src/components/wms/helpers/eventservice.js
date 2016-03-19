/// <reference path="../../../typings/tsd.d.ts" />
"use strict";
var core_1 = require('angular2/core');
var EventService = (function () {
    function EventService() {
        this.layerEmitter = new core_1.EventEmitter();
        this.capsEmitter = new core_1.EventEmitter();
    }
    return EventService;
}());
exports.EventService = EventService;
