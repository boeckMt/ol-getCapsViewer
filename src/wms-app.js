System.register(['rxjs/operator/map', 'rxjs/operator/mergeMap', 'rxjs/observable/interval', 'angular2/core', 'angular2/platform/browser', 'angular2/http', 'angular2/router', './components/about/about', './components/wms/wms', './components/wms/helpers/eventservice'], function(exports_1) {
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
    var core_1, browser_1, http_1, router_1, about_1, wms_1, eventservice_1;
    var WmsApp;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (about_1_1) {
                about_1 = about_1_1;
            },
            function (wms_1_1) {
                wms_1 = wms_1_1;
            },
            function (eventservice_1_1) {
                eventservice_1 = eventservice_1_1;
            }],
        execute: function() {
            WmsApp = (function () {
                function WmsApp(router, location) {
                    this.router = router;
                    this.location = location;
                }
                WmsApp.prototype.getLinkStyle = function (path) {
                    if (path === this.location.path()) {
                        return true;
                    }
                    else if (path.length > 0) {
                        return this.location.path().indexOf(path) > -1;
                    }
                };
                WmsApp = __decorate([
                    core_1.Component({
                        selector: 'wms-app',
                        templateUrl: './wms-app.html',
                        directives: [about_1.About, wms_1.Wms, router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        new router_1.Route({
                            path: '/about',
                            component: about_1.About,
                            name: 'About'
                        }),
                        new router_1.Route({
                            path: '/wms',
                            component: wms_1.Wms,
                            name: 'Wms'
                        })
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], WmsApp);
                return WmsApp;
            })();
            browser_1.bootstrap(WmsApp, [eventservice_1.EventService, router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS,
                core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
        }
    }
});
