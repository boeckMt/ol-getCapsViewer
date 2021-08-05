import * as wms from '../../../xmlns/www.opengis.net/wms';
import { WmsLayer } from '@dlr-eoc/services-layers';

export function createWMSLayer(layer: wms.LayerType, url: string, version: string) {
  console.log(version, url, layer);
  const timeDimensions = layer?.Dimension?.find(d => d.units === 'ISO8601');
  return new WmsLayer({
    removable: true,
    name: layer.Title,
    id: layer.Name,
    type: 'wms',
    url,
    params: {
      LAYERS: layer.Name,
      // FORMAT: layer.
      TIME: timeDimensions?.default ?? undefined,
      VERSION: version,
      // TILED?: string;
      // TRANSPARENT?: boolean;
      // STYLES?: string;
    },
    description: layer.Abstract,
    attribution: layer.Attribution as never, // if type string
    legendImg: layer?.Style?.[0]?.LegendURL?.[0].OnlineResource as never, // if not type _OnlineResourceType
    dimensions: {
      time: {
        values: (timeDimensions as any)?.values, // _DimensionType not correct
        units: timeDimensions?.units,
        /*       display: {
                format:
                period:
                default:
              }; */
      }
    },
    tileSize: 512
  });
}
