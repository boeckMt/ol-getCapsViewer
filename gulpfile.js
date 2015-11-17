var gulp = require('gulp');
var server = require('gulp-server-livereload');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      defaultFile: "index.html",
      open: true,
      port:9005,
      proxies: [{source: '/geoserver/wms', target: 'http://demo.boundlessgeo.com/geoserver/wms'}]
    }));
});
