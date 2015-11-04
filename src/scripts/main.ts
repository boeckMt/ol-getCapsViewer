//http://www.typescriptlang.org/Handbook#basic-types
module WmsCapsViewer{
    declare var $: any, ol:any;

    function capsToView(data:any){
        var layers:Array<any>
        layers = data.Capability.Layer.Layer;
        console.log(data.Capability.Layer.Layer[0].Title)

        var _html:string;
        layers.forEach((layer,i)=>{
            _html +=
            `<tr>
              <th scope="row">${i}</th>
              <td>${layer.Title}</td>
              <td><button class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span></button></td>
            </tr>`
        })
        $('#layersTable').html(_html);

        //$('#layersTable').html(JSON.stringify(layers, null, 2));
    }

    export function parseCaps(response:XMLDocument){
        var result:any = olParser.read(response);
        //console.log(result)
        capsToView(result)
    }



    var olParser = new ol.format.WMSCapabilities();

    export function parse(url:string, callback:Function){
        $.ajax(url).then(callback);
    }
}

WmsCapsViewer.parse('testdata/capabilities_1_1_1.xml', WmsCapsViewer.parseCaps)
