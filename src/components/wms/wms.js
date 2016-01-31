System.register(['angular2/core', 'angular2/common', 'angular2/router', 'angular2/http', './layerlist/layerlist', './layerdetail/layerdetail', './helpers/eventservice'], function(exports_1) {
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
    var core_1, common_1, router_1, router_2, http_1, layerlist_1, layerdetail_1, eventservice_1;
    var __Ol, Wms;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (layerlist_1_1) {
                layerlist_1 = layerlist_1_1;
            },
            function (layerdetail_1_1) {
                layerdetail_1 = layerdetail_1_1;
            },
            function (eventservice_1_1) {
                eventservice_1 = eventservice_1_1;
            }],
        execute: function() {
            __Ol = ol;
            Wms = (function () {
                function Wms(location, http, evt) {
                    this.location = location;
                    this.http = http;
                    this.evt = evt;
                    this.olParser = new __Ol.format.WMSCapabilities();
                    this.service = 'wms';
                    this.wmsversion = '1.1.1';
                    this.request = 'GetCapabilities';
                    this.wmsUrl = 'http://demo.boundlessgeo.com/geoserver/wms';
                    //this.loadGetCapabilities();
                    //  './httpSampleData/getcapabilities_1.1.1.xml'
                    //  http://gis.srh.noaa.gov/arcgis/services/NDFDTemps/MapServer/WMSServer
                    // https://geodienste.sachsen.de/wms_geosn_dtk-p-color/guest
                    // http://schemas.opengis.net/wms/1.1.1/capabilities_1_1_1.xml
                    this.initCaps();
                    //in route change
                    this.evt.capsEmitter.next('clear Map');
                }
                Wms.prototype.initCaps = function () {
                    var emptyCaps = {
                        Capability: {},
                        Service: {},
                        version: ''
                    };
                    this.capabilities = emptyCaps;
                    this.evt.capsEmitter.next(this.capabilities);
                    this.loading = false;
                    this.loadError = false;
                };
                Wms.prototype.loadGetCapabilities = function () {
                    var _this = this;
                    this.initCaps();
                    if (this.wmsUrl) {
                        this.loading = true;
                        //this.loadError = false;
                        //this.capabilities = this.emptyCaps;
                        //this.evt.capsEmitter.next(this.capabilities);
                        var body = {
                            proxy: this.wmsUrl + "?service=" + this.service + "&version=" + this.wmsversion + "&request=" + this.request
                        };
                        this.reqObj = this.http.request(new http_1.Request({
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
                    this.initCaps();
                    this.loadError = true;
                    console.error("There was an error:" + err);
                };
                Wms.prototype.clearWmsUrl = function () {
                    this.wmsUrl = '';
                    this.cancelRequest();
                };
                Wms.prototype.cancelRequest = function () {
                    //this.reqObj.next('canceled');
                    this.reqObj.complete();
                    this.initCaps();
                };
                Wms = __decorate([
                    core_1.Component({
                        selector: 'wms',
                        templateUrl: './components/wms/wms.html',
                        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, layerlist_1.LayerList, layerdetail_1.LayerDetail]
                    }), 
                    __metadata('design:paramtypes', [router_2.Location, http_1.Http, eventservice_1.EventService])
                ], Wms);
                return Wms;
            })();
            exports_1("Wms", Wms);
        }
    }
});
