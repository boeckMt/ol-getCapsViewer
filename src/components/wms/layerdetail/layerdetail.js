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
                center: ol.proj.fromLonLat([0, 0], 'EPSG:3857'),
                zoom: 2
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
        _layer.url = this.capabilities.url;
        this.removeAllLayers();
        console.log(_layer);
        var _url = _layer.url;
        var _layers = _layer.Name;
        var crs = 'EPSG:4326';
        var _extent;
        if (_layer.EX_GeographicBoundingBox) {
            crs = 'EPSG:4326';
            _extent = _layer.EX_GeographicBoundingBox;
        }
        else {
            _extent = _layer.BoundingBox[0].extent;
            if (_layer.BoundingBox[0].crs) {
                crs = _layer.BoundingBox[0].crs;
            }
        }
        if (this.checkExtentLatLng(_extent)) {
            for (var i = 0; i < _extent.length; i++) {
                if (i == 0 || i == 2) {
                    _extent[i] = this.adjustLngInfCoos(_extent[i]);
                }
                else if (i == 1 || i == 3) {
                    _extent[i] = this.adjustLatInfCoos(_extent[i]);
                }
            }
            _extent = ol.proj.transformExtent(_extent, crs, 'EPSG:3857');
        }
        console.log(_extent);
        var layer = new ol.layer.Tile({
            extent: _extent,
            source: new ol.source.TileWMS({
                url: _url,
                params: { 'LAYERS': _layers, 'TILED': true, 'VERSION': this.capabilities.version },
                serverType: 'geoserver'
            })
        });
        this.addBboxLayer(_extent);
        this.map.addLayer(layer);
        this.map.getView().fit(_extent, this.map.getSize());
    };
    LayerDetail.prototype.removeAllLayers = function () {
        var _this = this;
        var layers = this.map.getLayers();
        layers.forEach(function (layer, index) {
            if (index != 0) {
                _this.map.removeLayer(layer);
            }
        });
    };
    LayerDetail.prototype.checkExtentLatLng = function (extent) {
        var max;
        var numbers = [];
        var isLatLng = false;
        extent.forEach(function (num) {
            var numdigits = Math.abs(num).toString().split(".")[0].length;
            numbers.push(numdigits);
        });
        if (Math.max.apply(Math, numbers) <= 3) {
            isLatLng = true;
        }
        else {
            isLatLng = false;
        }
        return isLatLng;
    };
    LayerDetail.prototype.adjustLatInfCoos = function (coordinate) {
        var _coordinate;
        if (coordinate >= 90) {
            _coordinate = 89;
        }
        else if (coordinate <= -90) {
            _coordinate = -89;
        }
        else {
            _coordinate = coordinate;
        }
        return _coordinate;
    };
    LayerDetail.prototype.adjustLngInfCoos = function (coordinate) {
        var _coordinate;
        if (coordinate >= 180) {
            _coordinate = 179;
        }
        else if (coordinate <= -180) {
            _coordinate = -179;
        }
        else {
            _coordinate = coordinate;
        }
        return _coordinate;
    };
    LayerDetail.prototype.addBboxLayer = function (extent) {
        this.removeAllLayers();
        var polygonFeature = new ol.Feature(ol.geom.Polygon.fromExtent(extent));
        var extentLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [polygonFeature]
            })
        });
        this.map.addLayer(extentLayer);
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
