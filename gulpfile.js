var gulp = require('gulp');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _open = require('open');
gulp.task('proxyserver', function () {
    var port = 9005;
    var app = express();
    app.use(express.static(__dirname));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({
        type: 'application/json'
    }));
    app.post('/proxy', function (req, res) {
        var proxyUrl = req.body.proxy;
        request.get({
            timeout: 1000,
            url: proxyUrl
        }, function (error, response, body) {
            if (error) {
                return console.error('proxy failed:', error);
            }
            if (response.headers['content-type'].lastIndexOf('text/html') >= 0) {
                res.status(406).json({ error: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request' });
            }
            else {
                res.set('Content-Type', response.headers['content-type']);
                res.send(body);
            }
        });
    });
    var server = app.listen(port, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log('Example app listening at http://%s:%s', host, port);
    });
    _open("http://localhost:" + port + "/src/index.html#/wms", "firefox");
});
//------------------------------------------------------------------------------
var concat = require('gulp-concat');
gulp.task('concat', function () {
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
        .pipe(gulp.dest('./dist/'));
});
//------------------------------------------------------------------------------
var path = require("path");
var Builder = require('systemjs-builder');
// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder('./', './config.js');
gulp.task('bundle', function () {
    //bundle not includes rxjs and angular2??
    builder.buildStatic('./src/wms-app', './dist/wms-app.bundle.js', { format: 'amd', minify: false, sourceMaps: true });
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
