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
var router_1 = require('angular2/router');
var router_2 = require('angular2/router');
var http_1 = require('angular2/http');
var __Ol = ol;
var layerlist_1 = require('./layerlist/layerlist');
var layerdetail_1 = require('./layerdetail/layerdetail');
var Wms = (function () {
    function Wms(location, http) {
        this.olParser = new __Ol.format.WMSCapabilities();
        this.capsLoaded = new angular2_1.EventEmitter();
        this.location = location;
        this.http = http;
        this.service = 'wms';
        this.version = '1.1.1';
        this.request = 'GetCapabilities';
        this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';
        this.capabilities = {
            Capability: { Layer: { Layer: [] } },
            Service: {},
            version: ''
        };
        this.loadGetCapabilities();
    }
    Wms.prototype.loadGetCapabilities = function () {
        var _this = this;
        console.log(this.wmsUrl);
        var url = this.wmsUrl + "?service=" + this.service + "&version=" + this.version + "&request=" + this.request;
        this.http.get(url).map(function (res) { return res.text(); }).subscribe(function (res) {
            var capsJson = _this.olParser.read(res);
            _this.capabilities = capsJson;
            _this.capabilities.url = _this.wmsUrl;
            _this.capsLoaded.next('caps loaded');
            console.log(capsJson);
        });
    };
    Wms.prototype.getLinkStyle = function (path) {
        return this.location.path().indexOf(path) > -1;
    };
    Wms = __decorate([
        angular2_1.Component({
            selector: 'wms',
            templateUrl: './components/wms/wms.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.CORE_DIRECTIVES, layerlist_1.LayerList, layerdetail_1.LayerDetail],
            events: ['capsLoaded']
        }), 
        __metadata('design:paramtypes', [router_2.Location, http_1.Http])
    ], Wms);
    return Wms;
})();
exports.Wms = Wms;
