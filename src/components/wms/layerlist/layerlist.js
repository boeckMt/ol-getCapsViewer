/// <reference path="../../../typings/tsd.d.ts" />
System.register(['angular2/core', 'angular2/common', '../helpers/startswithpipe', '../helpers/eventservice'], function(exports_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, startswithpipe_1, eventservice_1;
    var __Ol, LayerList;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (startswithpipe_1_1) {
                startswithpipe_1 = startswithpipe_1_1;
            },
            function (eventservice_1_1) {
                eventservice_1 = eventservice_1_1;
            }],
        execute: function() {
            LayerList = (function () {
                function LayerList(evt) {
                    var _this = this;
                    this.layersarray = [];
                    this.filter = '';
                    this.evt = evt;
                    evt.capsEmitter.subscribe(function (data) {
                        _this.capabilitys = data;
                        if (!data.Capability.Layer.Layer) {
                            _this.layersarray = [data.Capability.Layer];
                        }
                        else {
                            _this.layersarray = data.Capability.Layer.Layer;
                        }
                    });
                }
                LayerList.prototype.sendLayerData = function (layer) {
                    this.selectedLayer = layer.Name;
                    this.evt.layerEmitter.next(layer);
                };
                LayerList = __decorate([
                    core_1.Component({
                        selector: 'layer-list',
                        templateUrl: './components/wms/layerlist/layerlist.html',
                        directives: [common_1.CORE_DIRECTIVES],
                        pipes: [startswithpipe_1.StartsWithPipe]
                    }), 
                    __metadata('design:paramtypes', [eventservice_1.EventService])
                ], LayerList);
                return LayerList;
            })();
            exports_1("LayerList", LayerList);
        }
    }
});
