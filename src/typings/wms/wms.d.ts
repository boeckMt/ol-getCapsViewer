// Type definitions OGC WMS version 1.1.1 (1.3.0)
// Project:
// Definitions by: boeckMt <https://github.com/woutergd>
// Definitions:
// source: http://www.opengeospatial.org/standards/wms , http://schemas.opengis.net/wms/1.1.1/capabilities_1_1_1.xml

/**
 * Type definitions OGC WMS GetCapabilities version 1.1.1
 */
declare module Wms1_1_1 {

  /**
   * properties: Format: string, OnlineResource: string, size: Array<number>
   */
  interface LegendURL {
    /**
     *
     */
    Format: string;

    /**
     *
     */
    OnlineResource: string;

    /**
     *
     */
    size: Array<number>;
  }

  /**
   * properties: Name?: string, Title?: string, LegendURL?: Array<LegendURL>, Abstract?: string
   */
  interface LayerStyle {
    /**
     *
     */
    Name?: string;

    /**
     *
     */
    Title?: string;

    /**
     *
     */
    LegendURL?: Array<LegendURL>

    /**
     *
     */
    Abstract?: string;
  }

  /**
   * properties: crs?: string, extent: Array<number>, res: Array<number>
   */
  interface BoundingBox {
    /**
     *
     */
    crs?: string;

    /**
     *
     */
    extent: Array<number>;

    /**
     *
     */
    res: Array<number>;
  }

  /**
   * properties: queryable?: any, cascaded?: any, opaque?: any, noSubsets?: any, fixedHeight?: any, fixedWidth?: any
   */
  interface LayerAttributes {
    /**
     *
     */
    queryable?: any;

    /**
     *
     */
    cascaded?: any;

    /**
     *
     */
    opaque?: any;

    /**
     *
     */
    noSubsets?: any;

    /**
     *
     */
    fixedHeight?: any;

    /**
     *
     */
    fixedWidth?: any;
  }


  /**
   * properties: Title: string, Name?: string, Abstract?: string, Style?: LayerStyle, SRS?: Array<any> | string, EX_GeographicBoundingBox?: Array<number>,
   * BoundingBox?: Array<BoundingBox>, ScaleHint?: any, Dimension?: any, Extent?: any, MetadataURL?: Array<any>, Attribution?: any, Identifier?: any,
   * AuthorityURL?: any, FeatureListURL?: any, DataURL?: any, MaxScaleDenominator?: any, MinScaleDenominator?: any, url?: string
   */
  interface BaseLayer extends LayerAttributes {
    /**
     *
     */
    Title: string;

    /**
     *
     */
    Name?: string;

    /**
     *
     */
    Abstract?: string;

    /**
     *
     */
    Style?: LayerStyle;

    /**
     *
     */
    SRS?: Array<any> | string;

    /**
     *
     */
    EX_GeographicBoundingBox?: Array<number>

    /**
     *
     */
    BoundingBox?: Array<BoundingBox>;

    /**
     *
     */
    ScaleHint?: any;

    /**
     *
     */
    Dimension?: any;

    /**
     *
     */
    Extent?: any;

    /**
     *
     */
    MetadataURL?: Array<any>;

    /**
     *
     */
    Attribution?: any;

    /**
     *
     */
    Identifier?: any;

    /**
     *
     */
    AuthorityURL?: any;

    /**
     *
     */
    FeatureListURL?: any;

    /**
     *
     */
    DataURL?: any;
    //LayerAttributes

    /**
     *
     */
    MaxScaleDenominator?: any;

    /**
     *
     */
    MinScaleDenominator?: any;

    /**
     * not in ogc spec
     */
    url?: string;
  }

  /**
   * properties: Title: string, Name?: string, Abstract?: string, Style?: LayerStyle, SRS?: Array<any> | string, EX_GeographicBoundingBox?: Array<number>,
   * BoundingBox?: Array<BoundingBox>, ScaleHint?: any, Dimension?: any, Extent?: any, MetadataURL?: Array<any>, Attribution?: any, Identifier?: any,
   * AuthorityURL?: any, FeatureListURL?: any, DataURL?: any, MaxScaleDenominator?: any, MinScaleDenominator?: any, url?: string, Layer?: Array<BaseLayer>
   */
  interface Layer extends BaseLayer {
    /**
     *
     */
    Layer?: Array<BaseLayer>;
  }


  /**
   * properties: Exception: Array<any>, Request: any, Layer: Layer
   */
  interface Capability {
    /**
     *
     */
    Exception: Array<any>;

    /**
     *
     */
    Request: any;

    /**
     *
     */
    Layer: Layer;
  }

  /**
   * properties:
   */
  interface Service {
    /**
     *
     */

  }



  /**
   * properties: Capability: Capability, Service: Service, version: string
   */
  interface GetCapabilities {
    /**
     * Capability: Capability
     */
    Capability: Capability;

    /**
     * Service: Service
     */
    Service: Service;

    /**
     * version: string
     */
    version: string;

    /**
     * not in ogc spec
     * url?: string
     */
    url?: string;

    /**
     * not in ogc spec
     * fullUrl?: string
     */
    fullUrl?: string;
  }
}


//------------------------------------------------------------------------------
/**
 * Type definitions OGC WMS GetCapabilities version 1.3.0
 */
declare module Wms1_3_0 {

}
