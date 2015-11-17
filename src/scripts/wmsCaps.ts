module WmsCapsViewer{
    declare var $: any, ol:any;

    function capsToView(data:any){
        var layers:Array<any>
        layers = data.Capability.Layer.Layer;
        console.log(data)

        var _html:string;
        layers.forEach((layer,i)=>{
            _html +=
            `<tr>
              <th scope="row">${i}</th>
              <td>${layer.Title}</td>
              <td onclick="console.log('bscfbd')" title="show details" class="detail-click"><span class="glyphicon glyphicon-chevron-right"></span></td>
            </tr>`
        })
        $('#layersTable').html(_html);

        //$('#layersTable').html(JSON.stringify(layers, null, 2));
    }

    export function parseCaps(response:XMLDocument){
        var result:any = olParser.read(response);
        //console.log(result)
        capsToView(result)
        mapAddLayer(result)
        createMap()
    }

    var olParser = new ol.format.WMSCapabilities();

    export function parse(url:string, callback:Function){
        $.ajax(url).then(callback);
    }

    function createMap(){
        var layers = [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          }),
          new ol.layer.Tile({
            source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
              url: 'http://demo.boundlessgeo.com/geoserver/wms',
              params: {'LAYERS': 'topp:states', 'TILED': true},
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

    function mapAddLayer(caps:any){
        var url, extent, layer;
        var wmsLayer = new ol.layer.Tile({
          extent: [-13884991, 2870341, -7455066, 6338219],
          source: new ol.source.TileWMS(/** @type {olx.source.TileWMSOptions} */ ({
            url: 'http://demo.boundlessgeo.com/geoserver/wms',
            params: {'LAYERS': 'topp:states', 'TILED': true},
            serverType: 'geoserver'
          }))
        })
    }

}
