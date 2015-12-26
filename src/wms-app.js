var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require('rxjs/operator/map');
require('rxjs/operator/mergeMap');
require('rxjs/observable/interval');
var http_1 = require('angular2/http');
var angular2_1 = require('angular2/angular2');
var about_1 = require('./components/about/about');
var wms_1 = require('./components/wms/wms');
var router_1 = require('angular2/router');
var eventservice_1 = require('./components/wms/helpers/eventservice');
var WmsApp = (function () {
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
        angular2_1.Component({
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
/*
class ComponentHelper {
  static LoadComponentAsync(name, path) {
    return System.import(path).then(c => c[name]);
  }
}
*/
angular2_1.bootstrap(WmsApp, [eventservice_1.EventService, router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS,
    angular2_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy })]);
