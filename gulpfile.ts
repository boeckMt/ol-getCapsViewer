var gulp = require('gulp');

//------------------------------------------------------------------------------
var concat = require('gulp-concat');

gulp.task('concat', function() {
  gulp.src([
    "node_modules/underscore/underscore-min.js",
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/openlayers/dist/ol.js",
    "node_modules/materialize-css/dist/js/materialize.min.js",

    "node_modules/angular2/bundles/angular2-polyfills.js",
    "node_modules/angular2/bundles/angular2.dev.js",
    "node_modules/angular2/bundles/http.dev.js",
    "node_modules/angular2/bundles/router.dev.js",
    "node_modules/rxjs/bundles/Rx.umd.js"
  ]).pipe(concat('node_modules.bundle.js'))
    .pipe(gulp.dest('./dist/scripts/'));
});

//------------------------------------------------------------------------------
gulp.task('copystyles', function() {
  gulp.src(["src/styles/*.css"
  ]).pipe(gulp.dest('./dist/styles/'));
});

gulp.task('copyhtml', function() {
  gulp.src(["src/index.html"
  ]).pipe(gulp.dest('./dist/'));
});


//------------------------------------------------------------------------------

var inlineNg2Template = require('gulp-inline-ng2-template');
gulp.task('nginlinetemplate', function() {

//  gulp.src('./src/**/*.ts')
  //  .pipe(inlineNg2Template({ base: '/src' }))
    //.pipe(tsc())
  //  .pipe(gulp.dest('./tmp/'));

});


//------------------------------------------------------------------------------

var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './config.js');

gulp.task('bundle', function() {
  //bundle not includes rxjs and angular2??
  builder.buildStatic('./src/wms-app', './dist/scripts/wms-app.bundle.js', {format: 'amd', minify: false, sourceMaps: true });
});


//------------------------------------------------------------------------------
// copy dependencies
/*
gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/angular2/bundles/angular2-polyfills.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/rxjs/bundles/Rx.js',
      'node_modules/angular2/bundles/angular2.dev.js',
      'node_modules/angular2/bundles/router.dev.js'
    ])
    .pipe(gulp.dest('dist/lib'))
});
*/


//------------------------------------------------------------------------------
// copy static assets - i.e. non TypeScript compiled source
/*
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['app/*', 'index.html', 'styles.css', ...], { base : './' })
    .pipe(gulp.dest('dist'))
});
*/
