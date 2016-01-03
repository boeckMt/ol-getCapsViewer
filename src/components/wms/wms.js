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
var eventservice_1 = require('./helpers/eventservice');
var Wms = (function () {
    function Wms(location, http, evt) {
        this.olParser = new __Ol.format.WMSCapabilities();
        //this.location = location;
        this.evt = evt;
        this.http = http;
        this.service = 'wms';
        this.wmsversion = '1.1.1';
        this.request = 'GetCapabilities';
        this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';
        //If you want an empty object of an interface, you can do just:
        this.emptyCaps = {
            Capability: {},
            Service: {},
            version: ''
        };
        this.capabilities = this.emptyCaps;
        this.loading = false;
        this.loadError = false;
        //in route change
        this.evt.capsEmitter.next('clear Map');
        //this.loadGetCapabilities();
        //  './httpSampleData/getcapabilities_1.1.1.xml'
        //  http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer
        // https://geodienste.sachsen.de/wms_geosn_dtk-p-color/guest
        // http://schemas.opengis.net/wms/1.1.1/capabilities_1_1_1.xml
    }
    Wms.prototype.loadGetCapabilities = function () {
        var _this = this;
        if (this.wmsUrl) {
            this.loading = true;
            this.loadError = false;
            this.capabilities = this.emptyCaps;
            var body = {
                proxy: this.wmsUrl + "?service=" + this.service + "&version=" + this.wmsversion + "&request=" + this.request
            };
            this.http.request(new http_1.Request({
                method: http_1.RequestMethod.Post,
                url: '/proxy',
                body: JSON.stringify(body),
                headers: new http_1.Headers({ 'Content-Type': 'application/json' })
            })).map(function (res) { return res.text(); }).subscribe(function (res) { return _this.handleResult(res); }, function (err) { return _this.handleError(err); });
        }
        else {
            console.log('no url provided!');
        }
    };
    Wms.prototype.handleResult = function (res) {
        var capsJson = this.olParser.read(res);
        if (capsJson) {
            this.loadError = false;
            this.loading = false;
            this.capabilities = capsJson;
            this.capabilities.url = this.wmsUrl;
            this.capabilities.fullUrl = this.wmsUrl + "?service=" + this.service + "&version=" + this.wmsversion + "&request=" + this.request;
            this.evt.capsEmitter.next(this.capabilities);
            console.log(this.capabilities);
        }
    };
    Wms.prototype.handleError = function (err) {
        this.capabilities = this.emptyCaps;
        this.loadError = true;
        this.loading = false;
        console.error("There was an error:" + err);
    };
    Wms.prototype.clearWmsUrl = function () {
        this.wmsUrl = '';
    };
    Wms = __decorate([
        angular2_1.Component({
            selector: 'wms',
            templateUrl: './components/wms/wms.html',
            directives: [router_1.ROUTER_DIRECTIVES, angular2_1.CORE_DIRECTIVES, layerlist_1.LayerList, layerdetail_1.LayerDetail]
        }), 
        __metadata('design:paramtypes', [router_2.Location, http_1.Http, eventservice_1.EventService])
    ], Wms);
    return Wms;
})();
exports.Wms = Wms;
