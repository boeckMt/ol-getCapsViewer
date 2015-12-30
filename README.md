# ol-getCapsViewer
#### OGC (WMS) GetCapabilities Viewer with openlayers 3
---


The project is created with [angular-2-samples](https://github.com/thelgevold/angular-2-samples) and [materializecss](http://materializecss.com)

1-Install the TypeScript compiler: npm install -g typescript@^1.7.0

2-Run npm install and bower install

Start the TypeScript compiler: npm run tsc

Start a Webserver and launch index.html: npm run serve


#### Features
* WMS URL and Version as Input
* Get the WMS GetCapabilities XML through a custom express-proxy-server (for SOP)
* Parse the WMS GetCapabilities with openlayers3
* Generate a Table with all Layers
* Show Layer Details, add WMS-and Bbox-Layer on Table click
* Zoom to the Layer Extent

## Status: in development !!!
* Handle versions 1.1.1 and 1.3.0
* Handle Projections...
* Show further Capabilities like the [Geoportal Capabilities-Viewer](https://geoportal.bayern.de/getcapabilities)


---
This Project is developed with the [Atom Editor](https://atom.io/), [atom-typescript](https://atom.io/packages/atom-typescript) and [stylus-autocompile](https://atom.io/packages/stylus-autocompile)
