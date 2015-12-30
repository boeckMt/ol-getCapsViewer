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
var angular2_1 = require('angular2/angular2');
var startswithpipe_1 = require('../helpers/startswithpipe');
var eventservice_1 = require('../helpers/eventservice');
var LayerList = (function () {
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
        angular2_1.Component({
            selector: 'layer-list',
            templateUrl: './components/wms/layerlist/layerlist.html',
            directives: [angular2_1.CORE_DIRECTIVES],
            pipes: [startswithpipe_1.StartsWithPipe]
        }), 
        __metadata('design:paramtypes', [eventservice_1.EventService])
    ], LayerList);
    return LayerList;
})();
exports.LayerList = LayerList;
