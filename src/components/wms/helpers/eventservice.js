/// <reference path="../../../typings/tsd.d.ts" />
System.register(['angular2/core'], function(exports_1) {
    "use strict";
    var core_1;
    var EventService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EventService = (function () {
                function EventService() {
                    this.layerEmitter = new core_1.EventEmitter();
                    this.capsEmitter = new core_1.EventEmitter();
                }
                return EventService;
            })();
            exports_1("EventService", EventService);
        }
    }
});
