// express proxy and static files -server for WMS viewer
import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';

const port = 9055;
const app = express();

app.use('/', express.static(`./`));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({
  type: 'application/json'
}));


app.post('/proxy', (req, res) => {
  const proxyUrl = req.body.proxy;
  console.log(proxyUrl);

  const options: any = {
    // timeout: 1000,
    rejectUnauthorized: false,
    url: proxyUrl,
  };

  if (req.headers.authorization) {
    options.headers = {
      authorization: req.headers.authorization
    };
  }


  request.get(options, (error, response, body) => {
    if (error) {
      return console.error('proxy failed:', error);
    }

    if (response.headers['content-type'].lastIndexOf('text/html') >= 0) {
      res.status(406).json({ error: 'The requested resource is only capable of generating content not acceptable according to the Accept headers sent in the request' });
    } else {
      res.set('Content-Type', response.headers['content-type']);
      res.send(body);
    }

  });
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const serverport = server.address().port;
  console.log('proxy server for wms-app listening at http://%s:%s', host, serverport);
});

