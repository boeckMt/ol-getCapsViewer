/// <reference path="../../../typings/tsd.d.ts" />
var angular2_1 = require('angular2/angular2');
var EventService = (function () {
    function EventService() {
        this._emitter = new angular2_1.EventEmitter();
    }
    Object.defineProperty(EventService.prototype, "emitter", {
        get: function () {
            //console.log("----------")
            //console.log(this._emitter)
            return this._emitter; //.toRx();
        },
        enumerable: true,
        configurable: true
    });
    return EventService;
})();
exports.EventService = EventService;
