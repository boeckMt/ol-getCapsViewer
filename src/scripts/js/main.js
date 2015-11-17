var OlCapsViewer;
(function (OlCapsViewer) {
    var getCapsReq = '?version=1.1.1&service=wms&request=getCapabilities';
    var wmsInput = {
        url: '/geoserver/wms' + getCapsReq
    };
    WmsCapsViewer.parse(wmsInput.url, WmsCapsViewer.parseCaps);
})(OlCapsViewer || (OlCapsViewer = {}));
