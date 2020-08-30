"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express proxy and static files -server for WMS viewer
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var request_1 = __importDefault(require("request"));
var port = 9055;
var app = express_1.default();
app.use('/', express_1.default.static("./"));
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(body_parser_1.default.json({
    type: 'application/json'
}));
app.post('/proxy', function (req, res) {
    var proxyUrl = req.body.proxy;
    console.log(proxyUrl);
    var options = {
        // timeout: 1000,
        rejectUnauthorized: false,
        url: proxyUrl,
    };
    if (req.headers.authorization) {
        options.headers = {
            authorization: req.headers.authorization
        };
    }
    request_1.default.get(options, function (error, response, body) {
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
    var serverport = server.address().port;
    console.log('proxy server for wms-app listening at http://%s:%s', host, serverport);
});
//# sourceMappingURL=index.js.map