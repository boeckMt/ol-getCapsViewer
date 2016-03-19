/// <reference path="../../../typings/tsd.d.ts" />
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
var core_1 = require('angular2/core');
var common_1 = require('angular2/common');
var eventservice_1 = require('../helpers/eventservice');
var LayerDetail = (function () {
    function LayerDetail(evt) {
        this.evt = evt;
    }
    LayerDetail.prototype.ngAfterViewInit = function () {
        // viewChild is updated after the view has been initialized
        var _target = this.mapDiv.nativeElement;
        this.initMap(_target, this.evt);
    };
    LayerDetail.prototype.initMap = function (_target, evt) {
        var _this = this;
        if (_target && !_target.hasChildNodes()) {
            this.viewOptions = {
                center: ol.proj.fromLonLat([0, 0], 'EPSG:3857'),
                zoom: 2
            };
            this.view = new ol.View(this.viewOptions);
            this.baseLayer = new ol.layer.Tile({
                opacity: 0.5,
                source: new ol.source.XYZ({
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
                    attributions: [new ol.Attribution({
                            html: '&copy <a href="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer" target="_blank">ArcGIS</a>'
                        })]
                })
            });
            this.options = {
                target: _target,
                layers: [
                    this.baseLayer
                ],
                view: this.view
            };
            this.map = new ol.Map(this.options);
            this.map.on('click', function (evt) {
                var coos = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                console.log(coos);
            });
        }
        if (this.map) {
            evt.layerEmitter.subscribe(function (data) {
                _this.ldetail = data;
                _this.ldetail.legendUrl = _this.getLegentGraphic(data);
                _this.ldetailKes = Object.keys(data);
                console.log(_this.ldetail);
                _this.addLayer(data);
            });
            evt.capsEmitter.subscribe(function (data) {
                _this.removeOverlays();
                _this.ldetail = null;
            });
        }
    };
    LayerDetail.prototype.addLayer = function (_layer) {
        // create a service that we can subscribe to and submit events
        // Then we use the dependency injection mechanism to inject that service anywhere on the application where we need it.
        console.log(_layer);
        this.removeOverlays();
        var _url = _layer.url = this.capabilities.url;
        var _layers = _layer.Name;
        var _attribution;
        if (!_layer.Attribution) {
            _attribution = new ol.Attribution({
                html: "&copy <a href=\"" + _url + "\" target=\"_blank\">" + _layer.Name + "</a>"
            });
        }
        else {
            _attribution = new ol.Attribution({
                html: "&copy <a href=\"" + _url + "\" target=\"_blank\">" + _layer.Attribution + "</a>"
            });
        }
        var _extent = this.extentBuilder(_layer);
        //--------------------------------------------------------------------------
        this.wmsLayer = new ol.layer.Tile({
            extent: _extent,
            source: new ol.source.TileWMS({
                url: _url,
                params: { 'LAYERS': _layers, 'TILED': true, 'VERSION': this.capabilities.version },
                //params:{'BBOX':'', 'CRS':'', 'FORMAT':'', 'HEIGHT':'', 'LAYERS':'', 'REQUEST':'', 'SERVICE':'', 'STYLES':'', 'TILED	':'',
                //'TRANSPARENT':'', 'VERSION':'', 'WIDTH':''}
                serverType: 'geoserver',
                attributions: []
            })
        });
        this.bboxLayer = this.createBboxLayer(_extent);
        this.map.addLayer(this.bboxLayer);
        this.map.addLayer(this.wmsLayer);
        this.map.getView().fit(_extent, this.map.getSize());
        console.log(this.map.getLayers().getArray());
    };
    LayerDetail.prototype.removeOverlays = function () {
        this.map.removeLayer(this.bboxLayer);
        this.map.removeLayer(this.wmsLayer);
        //console.log(this.map.getLayers().getArray())
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
    LayerDetail.prototype.createBboxLayer = function (extent) {
        var polygonFeature = new ol.Feature(ol.geom.Polygon.fromExtent(extent));
        var extentLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [polygonFeature]
            })
        });
        return extentLayer;
    };
    LayerDetail.prototype.extentBuilder = function (layer) {
        var _extent;
        var crs = 'EPSG:4326';
        // check available extents
        if (layer.EX_GeographicBoundingBox) {
            crs = 'EPSG:4326';
            _extent = layer.EX_GeographicBoundingBox;
        }
        else {
            _extent = layer.BoundingBox[0].extent;
            if (layer.BoundingBox[0].crs) {
                crs = layer.BoundingBox[0].crs;
            }
        }
        if (this.checkExtentLatLng(_extent)) {
            //change -/+ 180 and 90 values
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
        return _extent;
    };
    LayerDetail.prototype.getLegentGraphic = function (detail) {
        return this.capabilities.url + "?&SERVICE=WMS&VERSION=" + this.capabilities.version + "&REQUEST=GetLegendGraphic&LAYER=" + detail.Name + "&FORMAT=image/png";
    };
    __decorate([
        core_1.ViewChild('mapDiv'), 
        __metadata('design:type', Object)
    ], LayerDetail.prototype, "mapDiv", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LayerDetail.prototype, "capabilities", void 0);
    LayerDetail = __decorate([
        core_1.Component({
            selector: 'layer-detail',
            templateUrl: './components/wms/layerdetail/layerdetail.html',
            directives: [common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [eventservice_1.EventService])
    ], LayerDetail);
    return LayerDetail;
}());
exports.LayerDetail = LayerDetail;
