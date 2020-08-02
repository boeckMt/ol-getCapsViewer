# OlGetCapsViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.

- [openlayers](http://openlayers.org)
- [clarity design](https://clarity.design)
- [json2ts](http://json2ts.com/)
- [angular](https://angular.io)
- [cxsd](https://www.npmjs.com/package/cxsd)


#### Features
* WMS URL and Version as Input
* Get the WMS GetCapabilities XML
* Parse the WMS GetCapabilities
* Generate a Table with all Layers
* Show Layer Details

## Status: in development !!!

#### Map View
* [] Split Layers and Baselayers on map view
* [] Toggle Layer on/off
* [] Show Legend for Layers
* [] Add Layers as Group with Layer and Bbox

* [] Check Layer CRS and Extent...
* [] Handle Projections...

#### Capabilities View
* [] Show objects in lists as not as '[object Object]'
* [] Get Legend in Capabilities View if available
* [] Show further Capabilities like the [Geoportal Capabilities-Viewer](https://geoportal.bayern.de/getcapabilities)
* [] Handle versions 1.1.1 and 1.3.0 with Parser to get a generalized obj for the MapView

* [] Parse the WMS GetCapabilities (OgcWmsService) with jsonix and w3c-schemas to better handle Versions

## Getting started
Run `npm install`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
