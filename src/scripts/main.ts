//http://www.typescriptlang.org/Handbook#basic-types
/// <reference path="wmsCaps.ts" />

module OlCapsViewer{
    declare var $: any, ol:any;
    var getCapsReq = '?version=1.1.1&service=wms&request=getCapabilities'
    var wmsInput = {
        url: '/geoserver/wms' +getCapsReq
    };

    WmsCapsViewer.parse(wmsInput.url, WmsCapsViewer.parseCaps)
}
