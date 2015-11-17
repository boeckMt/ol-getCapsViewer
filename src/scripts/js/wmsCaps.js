var WmsCapsViewer;
(function (WmsCapsViewer) {
    function capsToView(data) {
        var layers;
        layers = data.Capability.Layer.Layer;
        console.log(data);
        var _html;
        layers.forEach(function (layer, i) {
            _html +=
                "<tr>\n              <th scope=\"row\">" + i + "</th>\n              <td>" + layer.Title + "</td>\n              <td onclick=\"console.log('bscfbd')\" title=\"show details\" class=\"detail-click\"><span class=\"glyphicon glyphicon-chevron-right\"></span></td>\n            </tr>";
        });
        $('#layersTable').html(_html);
    }
    function parseCaps(response) {
        var result = olParser.read(response);
        capsToView(result);
        mapAddLayer(result);
        createMap();
    }
    WmsCapsViewer.parseCaps = parseCaps;
    var olParser = new ol.format.WMSCapabilities();
    function parse(url, callback) {
        $.ajax(url).then(callback);
    }
    WmsCapsViewer.parse = parse;
    function createMap() {
        var layers = [
            new ol.layer.Tile({
                source: new ol.source.MapQuest({ layer: 'sat' })
            }),
            new ol.layer.Tile({
                source: new ol.source.TileWMS(({
                    url: 'http://demo.boundlessgeo.com/geoserver/wms',
                    params: { 'LAYERS': 'topp:states', 'TILED': true },
                    serverType: 'geoserver'
                }))
            })
        ];
        var map = new ol.Map({
            layers: layers,
            target: 'map',
            view: new ol.View({
                center: [-10997148, 4569099],
                zoom: 4
            })
        });
    }
    function mapAddLayer(caps) {
        var url, extent, layer;
        var wmsLayer = new ol.layer.Tile({
            extent: [-13884991, 2870341, -7455066, 6338219],
            source: new ol.source.TileWMS(({
                url: 'http://demo.boundlessgeo.com/geoserver/wms',
                params: { 'LAYERS': 'topp:states', 'TILED': true },
                serverType: 'geoserver'
            }))
        });
    }
})(WmsCapsViewer || (WmsCapsViewer = {}));
