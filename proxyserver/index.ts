//express proxy and static files -server for WMS viewer
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var port = 9055;
var app = express();

app.use('/',express.static(`./`));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/json'
}));


app.post('/proxy', (req, res) => {
  var proxyUrl = req.body.proxy;
  request.get({
    //timeout: 1000,
    rejectUnauthorized: false,
    url: proxyUrl
  }, (error, response, body) => {
      if (error) {
        return console.error('proxy failed:', error);
      }

      if (response.headers['content-type'].lastIndexOf('text/html') >= 0) {
        res.status(406).json({ error: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request' })
      } else {
        res.set('Content-Type', response.headers['content-type']);
        res.send(body);
      }

    });
});

var server = app.listen(port, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('proxy server for wms-app listening at http://%s:%s', host, port);
})

