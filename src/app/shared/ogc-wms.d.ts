// Type definitions for OGC WMS 1.3.0
// Project: http://openlayers.org/
// Definitions by: Mathias Boeck <https://github.com/boeckmt>
// 
// source: 
// - http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xml
// - http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd            
// Definitions partially generated http://convertjson.com and http://json2ts.com/

    export interface KeywordList {
        Keyword: string[];
    }

    export interface OnlineResource {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface ContactPersonPrimary {
        ContactPerson: string;
        ContactOrganization: string;
    }

    export interface ContactAddress {
        AddressType: string;
        Address: string;
        City: string;
        StateOrProvince: string;
        PostCode: string;
        Country: string;
    }

    export interface ContactInformation {
        ContactPersonPrimary: ContactPersonPrimary;
        ContactPosition: string;
        ContactAddress: ContactAddress;
        ContactVoiceTelephone: string;
        ContactElectronicMailAddress: string;
    }
    

    export interface Service {
        Name: string;
        Title: string;
        Abstract: string;
        KeywordList: KeywordList;
        OnlineResource: OnlineResource;
        ContactInformation: ContactInformation;
        Fees: string;
        AccessConstraints: string;
        LayerLimit: string;
        MaxWidth: string;
        MaxHeight: string;
    }

    export interface OnlineResource2 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface Get {
        OnlineResource: OnlineResource2;
    }

    export interface OnlineResource3 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface Post {
        OnlineResource: OnlineResource3;
    }

    export interface HTTP {
        Get: Get;
        Post: Post;
    }

    export interface DCPType {
        HTTP: HTTP;
    }

    export interface GetCapabilities {
        Format: string[];
        DCPType: DCPType;
    }

    export interface OnlineResource4 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface Get2 {
        OnlineResource: OnlineResource4;
    }

    export interface HTTP2 {
        Get: Get2;
    }

    export interface DCPType2 {
        HTTP: HTTP2;
    }

    export interface GetMap {
        Format: string[];
        DCPType: DCPType2;
    }

    export interface OnlineResource5 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface Get3 {
        OnlineResource: OnlineResource5;
    }

    export interface HTTP3 {
        Get: Get3;
    }

    export interface DCPType3 {
        HTTP: HTTP3;
    }

    export interface GetFeatureInfo {
        Format: string[];
        DCPType: DCPType3;
    }

    export interface Request {
        GetCapabilities: GetCapabilities;
        GetMap: GetMap;
        GetFeatureInfo: GetFeatureInfo;
    }

    export interface Exception {
        Format: string[];
    }

    export interface OnlineResource6 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface AuthorityURL {
        OnlineResource: OnlineResource6;
        _name: string;
    }

    export interface EXGeographicBoundingBox {
        westBoundLongitude: string;
        eastBoundLongitude: string;
        southBoundLatitude: string;
        northBoundLatitude: string;
    }

    export interface BoundingBox {
        _CRS: string;
        _minx: string;
        _miny: string;
        _maxx: string;
        _maxy: string;
        _resx: string;
        _resy: string;
    }

    export interface OnlineResource7 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface OnlineResource8 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface LogoURL {
        Format: string[];
        OnlineResource: OnlineResource8;
        _width: string;
        _height: string;
    }

    export interface Attribution {
        Title: string;
        OnlineResource: OnlineResource7;
        LogoURL: LogoURL;
    }

    export interface Identifier {
        _authority: string;
        __text: string;
    }

    export interface OnlineResource9 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface FeatureListURL {
        Format: string[];
        OnlineResource: OnlineResource9;
    }

    export interface OnlineResource10 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface LegendURL {
        Format: string[];
        OnlineResource: OnlineResource10;
        _width: string;
        _height: string;
    }

    export interface OnlineResource11 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface StyleSheetURL {
        Format: string[];
        OnlineResource: OnlineResource11;
    }

    export interface Style {
        Name: string;
        Title: string;
        Abstract: string;
        LegendURL: LegendURL;
        StyleSheetURL: StyleSheetURL;
    }

    export interface KeywordList2 {
        Keyword: string[];
    }

    export interface Identifier2 {
        _authority: string;
        __text: string;
    }

    export interface OnlineResource12 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface MetadataURL {
        Format: string[];
        OnlineResource: OnlineResource12;
        _type: string;
    }

    export interface OnlineResource13 {
        '_xmlns:xlink': string;
        '_xlink:type': string;
        '_xlink:href': string;
    }

    export interface LegendURL2 {
        Format: string[];
        OnlineResource: OnlineResource13;
        _width: string;
        _height: string;
    }

    export interface Style2 {
        Name: string;
        Title: string;
        Abstract: string;
        LegendURL: LegendURL2;
    }

    export interface Dimension {
        _name: string;
        _units: string;
        _default: string;
        __text: string;
        _nearestValue: string;
    }

    export interface Layer3 {
        Name: string;
        Title: string;
        Abstract: string;
        KeywordList: KeywordList2;
        Identifier: Identifier2;
        MetadataURL: MetadataURL[];
        Style: Style2;
        _queryable: string;
        Dimension: Dimension[];
    }

    export interface Dimension2 {
        _name: string;
        _units: string;
        _default: string;
        __text: string;
    }

    export interface Layer2 {
        Name: string;
        Title: string;
        CRS: string;
        EX_GeographicBoundingBox: EXGeographicBoundingBox;
        BoundingBox: BoundingBox[];
        Attribution: Attribution;
        Identifier: Identifier;
        FeatureListURL: FeatureListURL;
        Style: Style;
        Layer: Layer3[];
        Dimension: Dimension2[];
        _queryable: string;
        _opaque: string;
        _noSubsets: string;
        _fixedWidth: string;
        _fixedHeight: string;
        _cascaded: string;
    }

    export interface Layer {
        Title: string;
        CRS: string;
        AuthorityURL: AuthorityURL;
        Layer: Layer2[];
    }

    export interface Capability {
        Request: Request;
        Exception: Exception;
        Layer: Layer[];
    }

    export interface WMSCapabilities {
        Service: Service;
        Capability: Capability;
        version: string;
        /*
        _xmlns: string;
        '_xmlns:xlink': string;
        '_xmlns:xsi': string;
        '_xsi:schemaLocation': string;
        */
    }


