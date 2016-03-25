declare var require;

var gulp = require('gulp');

//------------------------------------------------------------------------------
var concat = require('gulp-concat');

gulp.task('concatjs', () => {
  gulp.src([
    "node_modules/es6-shim/es6-shim.min.js",
    "node_modules/angular2/bundles/angular2-polyfills.js",
    "node_modules/systemjs/dist/system.js",
    "system.config.js",

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
gulp.task('copyfont', () => {
  gulp.src(
    "node_modules/materialize-css/dist/font/**/*"
  )
    .pipe(gulp.dest('./dist/font'));
});

gulp.task('copystyles', () => {
  gulp.src([
    "node_modules/materialize-css/dist/css/materialize.min.css",
    "node_modules/openlayers/dist/ol.css",
    "src/styles/*.css"
  ])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/styles/'));
});

/*
gulp.task('copyhtml', () => {
  gulp.src(["src/index.html"
  ]).pipe(gulp.dest('./dist/'));
});
*/


//------------------------------------------------------------------------------

var inlineNg2Template = require('gulp-inline-ng2-template');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.template.json');

gulp.task('nginlinetemplate', () => {
  gulp.src('./src/**/*.ts')
    .pipe(inlineNg2Template({ base: '/src' }))
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./.tmp/'));
});


//------------------------------------------------------------------------------

var path = require("path");
var Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './system.build.config.js');

gulp.task('bundle',() => {
  //bundle not includes rxjs and angular2??
  builder.buildStatic('./.tmp/wms-app', './dist/scripts/wms-app.bundle.js', { format: 'amd', minify: false, sourceMaps: true });
});

//------------------------------------------------------------------------------
var htmlreplace = require('gulp-html-replace');

gulp.task('htmlreplace', () => {
  gulp.src('./src/index.html')
    .pipe(htmlreplace({
    'css1': 'styles/bundle.css',
    'js1': 'scripts/node_modules.bundle.js',
    'js2': 'scripts/wms-app.bundle.js'
  }))
    .pipe(gulp.dest('./dist'));
});


//------------------------------------------------------------------------------
var clean = require('gulp-clean');

gulp.task('clean-folders', () => {
  return gulp.src(['./.tmp/', './dist/'], { read: false })
    .pipe(clean({ force: true }));
});


//Gulp - If you want to create a series where tasks run in a particular order, you need to do two things
//give it a hint to tell it when the task is done
//and give it a hint that a task depends on completion of another.
//https://github.com/gulpjs/gulp/blob/master/docs/API.md
// gulp.task('templateBundle',['nginlinetemplate', 'bundle']); not working?!!!
