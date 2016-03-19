System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    'rxjs/add/observable/*': '../node_modules/rxjs/add/observable/*.js',
    'rxjs/add/operator/*': '../node_modules/rxjs/add/operator/*.js',
    'rxjs/*': '../node_modules/rxjs/*.js',
    'angular2/*': '../node_modules/angular2/*.js'
  }
  /*
  bundles: {
    'wms-app': ['componets/wms/wms', 'componets/wms/layerlist/layerlist', 'componets/wms/layerdetail/layerdetail']
  }
  bundles: {
    'wms-app': ['componets/wms/wms', 'componets/wms/layerlist/layerlist', 'componets/wms/layerdetail/layerdetail']
  },
  typescriptOptions: {
    'target': 'es5',
    'module': 'commonjs'
  },
  meta: {
    './module/path.js': {
      format: 'cjs'
    }
  }

  depCache: {
    'wms-app': ['componets/wms/wms'], // moduleA depends on moduleB
    'componets/wms/wms': ['componets/wms/layerlist/layerlist', 'componets/wms/layerdetail/layerdetail'] // moduleB depends on moduleC
  }
  */
});
