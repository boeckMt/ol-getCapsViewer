var gulp = require('gulp');
var server = require('gulp-server-livereload');

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var _open = require('open');


gulp.task('webserver', () => {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      defaultFile: "index.html",
      open: true,
      port: 9005,
      proxies: [{
        source: '/geoserver/wms',
        target: '*'
      }]
    }));
});

gulp.task('proxyserver', () => {
  var port = 9005;
  var app = express();

  app.use(express.static(__dirname));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json({
    type: 'application/json'
  }));


  app.post('/proxy',(req, res)=>{
    var proxyUrl = req.body.proxy;
    request.get({
      url: proxyUrl
    }, (error, response, body) => {
      if (error) {
        return console.error('proxy failed:', error);
      }

      if(response.headers['content-type'].lastIndexOf('text/html') >= 0){
        res.status(406).json({ error: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request'})
      }else{
        res.set('Content-Type', response.headers['content-type']);
        res.send(body);
      }

    });
  });

  var server = app.listen(port,() =>{
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  })

  _open(`http://localhost:${port}/src/index.html#/wms`, "firefox");
});
