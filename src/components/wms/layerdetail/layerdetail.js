/// <reference path="../../../typings/tsd.d.ts" />
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
var eventservice_1 = require('../helpers/eventservice');
var LayerDetail = (function () {
    function LayerDetail(evt) {
        var _this = this;
        evt.emitter.subscribe(function (data) {
            _this.ldetail = data;
            _this.addLayer(data);
        });
        var _target = document.getElementById("map");
        if (!_target.hasChildNodes()) {
            this.viewOptions = {
                center: ol.proj.fromLonLat([-100.9687542915344, 40.11168866559598], 'EPSG:3857'),
                zoom: 3
            };
            this.view = new ol.View(this.viewOptions);
            this.options = {
                target: _target,
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: this.view
            };
            this.map = new ol.Map(this.options);
            this.map.on('click', function (evt) {
                var coos = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                console.log(coos);
            });
        }
    }
    LayerDetail.prototype.addLayer = function (_layer) {
        // create a service that we can subscribe to and submit events
        // Then we use the dependency injection mechanism to inject that service anywhere on the application where we need it.
        _layer.url = this.capabilities.url;
        this.removeAllLayers();
        console.log(_layer);
        var layer = new ol.layer.Tile({
            extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileWMS({
                url: _layer.url,
                params: { 'LAYERS': _layer.Name, 'TILED': true },
                serverType: 'geoserver'
            })
        });
        this.map.addLayer(layer);
    };
    LayerDetail.prototype.removeAllLayers = function () {
        var _this = this;
        var layers = this.map.getLayers();
        var overlays = this.map.getOverlays();
        //this.map.removeLayer()
        layers.forEach(function (layer, index) {
            //var props: any = layer.getProperties();
            console.log(layer, index);
            if (index > 0) {
                _this.map.removeLayer(layer);
            }
        });
    };
    __decorate([
        angular2_1.Input(), 
        __metadata('design:type', Object)
    ], LayerDetail.prototype, "capabilities", void 0);
    LayerDetail = __decorate([
        angular2_1.Component({
            selector: 'layer-detail',
            templateUrl: './components/wms/layerdetail/layerdetail.html',
            directives: [angular2_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [eventservice_1.EventService])
    ], LayerDetail);
    return LayerDetail;
})();
exports.LayerDetail = LayerDetail;
