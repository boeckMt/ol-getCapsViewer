"use strict";
var angular2_1 = require('angular2/angular2');
var EventService = (function () {
    function EventService() {
        this.layerEmitter = new angular2_1.EventEmitter();
        this.capsEmitter = new angular2_1.EventEmitter();
    }
    return EventService;
})();
exports.EventService = EventService;
