import {Observable} from 'angular2/angular2'
import 'rxjs/operator/map';
import 'rxjs/operator/mergeMap';
import 'rxjs/observable/interval'

import {Component, View, bootstrap, provide} from 'angular2/angular2';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_DIRECTIVES, RouteConfig, Location, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, Route, Router} from 'angular2/router';

import {About} from './components/about/about';
import {Wms} from './components/wms/wms';
import {EventService} from './components/wms/helpers/eventservice';

declare var System: any;

@Component(
  {
    selector: 'wms-app',
    templateUrl: './wms-app.html',
    directives: [About, Wms, ROUTER_DIRECTIVES]
  })

@RouteConfig([
  new Route({
    path: '/about',
    component: About,
    name: 'About'
  }),
  new Route({
    path: '/wms',
    component: Wms,
    name: 'Wms'
  })
])

class WmsApp {

  router: Router;
  location: Location;

  constructor(router: Router, location: Location) {
    this.router = router;
    this.location = location;
  }

  getLinkStyle(path) {
    if (path === this.location.path()) {
      return true;
    }
    else if (path.length > 0) {
      return this.location.path().indexOf(path) > -1;
    }
  }
}

bootstrap(WmsApp, [EventService, ROUTER_PROVIDERS, HTTP_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy })]);
