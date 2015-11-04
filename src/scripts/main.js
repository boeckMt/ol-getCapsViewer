var WmsCapsViewer;
(function (WmsCapsViewer) {
    function capsToView(data) {
        var layers;
        layers = data.Capability.Layer.Layer;
        console.log(data.Capability.Layer.Layer[0].Title);
        var _html;
        layers.forEach(function (layer, i) {
            _html +=
                "<tr>\n              <th scope=\"row\">" + i + "</th>\n              <td>" + layer.Title + "</td>\n              <td><button class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-plus\"></span></button></td>\n            </tr>";
        });
        $('#layersTable').html(_html);
    }
    function parseCaps(response) {
        var result = olParser.read(response);
        capsToView(result);
    }
    WmsCapsViewer.parseCaps = parseCaps;
    var olParser = new ol.format.WMSCapabilities();
    function parse(url, callback) {
        $.ajax(url).then(callback);
    }
    WmsCapsViewer.parse = parse;
})(WmsCapsViewer || (WmsCapsViewer = {}));
WmsCapsViewer.parse('testdata/capabilities_1_1_1.xml', WmsCapsViewer.parseCaps);
