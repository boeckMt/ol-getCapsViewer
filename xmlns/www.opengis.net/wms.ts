import * as Primitive from '../xml-primitives';
import * as xlink from '../www.w3.org/1999/xlink';

// Source files:
// http://schemas.opengis.net/wms/1.3.0/capabilities_1_3_0.xsd


export interface BaseType {
	_exists: boolean;
	_namespace: string;
}
interface _AttributionType extends BaseType {
	LogoURL?: LogoURLType;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource?: OnlineResourceType;
	/** The Title is for informative display to a human. */
	Title?: string;
}
export interface AttributionType extends _AttributionType { constructor: { new(): AttributionType }; }

interface _AuthorityURLType extends BaseType {
	name: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface AuthorityURLType extends _AuthorityURLType { constructor: { new(): AuthorityURLType }; }

interface _BoundingBoxType extends BaseType {
	CRS: string;
	maxx: number;
	maxy: number;
	minx: number;
	miny: number;
	resx: number;
	resy: number;
}
export interface BoundingBoxType extends _BoundingBoxType { constructor: { new(): BoundingBoxType }; }

interface _CapabilityType extends BaseType {
	/** Individual service providers may use this element to report extended
	  * capabilities. */
	ExtendedCapabilities?: ExtendedCapabilitiesProxyType[];
	/** An Exception element indicates which error-reporting formats are
	  * supported. */
	Exception: ExceptionType;
	/** Nested list of zero or more map Layers offered by this server. */
	Layer?: LayerType;
	/** Available WMS Operations are listed in a Request element. */
	Request: RequestType;
}
export interface CapabilityType extends _CapabilityType { constructor: { new(): CapabilityType }; }

interface _ContactAddressType extends BaseType {
	Address: string;
	AddressType: string;
	City: string;
	Country: string;
	PostCode: string;
	StateOrProvince: string;
}
export interface ContactAddressType extends _ContactAddressType { constructor: { new(): ContactAddressType }; }

interface _ContactInformationType extends BaseType {
	ContactAddress?: ContactAddressType;
	ContactElectronicMailAddress?: string;
	ContactFacsimileTelephone?: string;
	ContactPersonPrimary?: ContactPersonPrimaryType;
	ContactPosition?: string;
	ContactVoiceTelephone?: string;
}
export interface ContactInformationType extends _ContactInformationType { constructor: { new(): ContactInformationType }; }

interface _ContactPersonPrimaryType extends BaseType {
	ContactOrganization: string;
	ContactPerson: string;
}
export interface ContactPersonPrimaryType extends _ContactPersonPrimaryType { constructor: { new(): ContactPersonPrimaryType }; }

interface _DataURLType extends BaseType {
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface DataURLType extends _DataURLType { constructor: { new(): DataURLType }; }

interface _DCPTypeType extends BaseType {
	/** Available HTTP request methods.  At least "Get" shall be supported. */
	HTTP: HTTPType;
}
export interface DCPTypeType extends _DCPTypeType { constructor: { new(): DCPTypeType }; }

interface _DimensionType extends Primitive._string {
	current: boolean;
	default: string;
	multipleValues: boolean;
	name: string;
	nearestValue: boolean;
	units: string;
	unitSymbol: string;
}
export interface DimensionType extends _DimensionType { constructor: { new(): DimensionType }; }

interface _EX_GeographicBoundingBoxType extends BaseType {
	eastBoundLongitude: number;
	northBoundLatitude: number;
	southBoundLatitude: number;
	westBoundLongitude: number;
}
export interface EX_GeographicBoundingBoxType extends _EX_GeographicBoundingBoxType { constructor: { new(): EX_GeographicBoundingBoxType }; }

interface _ExceptionType extends BaseType {
	/** A container for listing an available format's MIME type. */
	Format: string[];
}
export interface ExceptionType extends _ExceptionType { constructor: { new(): ExceptionType }; }

interface _ExtendedCapabilitiesProxyType extends BaseType {}
export interface ExtendedCapabilitiesProxyType extends _ExtendedCapabilitiesProxyType { constructor: { new(): ExtendedCapabilitiesProxyType }; }

interface _ExtendedOperationProxyType extends BaseType {}
export interface ExtendedOperationProxyType extends _ExtendedOperationProxyType { constructor: { new(): ExtendedOperationProxyType }; }

interface _FeatureListURLType extends BaseType {
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface FeatureListURLType extends _FeatureListURLType { constructor: { new(): FeatureListURLType }; }

interface _GetType extends BaseType {
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface GetType extends _GetType { constructor: { new(): GetType }; }

interface _HTTPType extends BaseType {
	/** The URL prefix for the HTTP "Get" request method. */
	Get: GetType;
	/** The URL prefix for the HTTP "Post" request method. */
	Post?: PostType;
}
export interface HTTPType extends _HTTPType { constructor: { new(): HTTPType }; }

interface _IdentifierType extends Primitive._string {
	authority: string;
}
export interface IdentifierType extends _IdentifierType { constructor: { new(): IdentifierType }; }

interface _KeywordListType extends BaseType {
	/** A single keyword or phrase. */
	Keyword?: KeywordType[];
}
export interface KeywordListType extends _KeywordListType { constructor: { new(): KeywordListType }; }

interface _KeywordType extends Primitive._string {
	vocabulary: string;
}
interface KeywordType extends _KeywordType { constructor: { new(): KeywordType }; }

export type latitudeType = number;
type _latitudeType = Primitive._number;

interface _LayerType extends BaseType {
	cascaded: number;
	fixedHeight: number;
	fixedWidth: number;
	noSubsets: boolean;
	opaque: boolean;
	queryable: boolean;
	/** The abstract is a longer narrative description of an object. */
	Abstract?: string;
	/** Attribution indicates the provider of a Layer or collection of Layers.
	  * The provider's URL, descriptive title string, and/or logo image URL
	  * may be supplied.  Client applications may choose to display one or
	  * more of these items.  A format element indicates the MIME type of
	  * the logo image located at LogoURL.  The logo image's width and height
	  * assist client applications in laying out space to display the logo. */
	Attribution?: AttributionType;
	/** A Map Server may use zero or more Identifier elements to list ID
	  * numbers or labels defined by a particular Authority.  For example,
	  * the Global Change Master Directory (gcmd.gsfc.nasa.gov) defines a
	  * DIF_ID label for every dataset.  The authority name and explanatory
	  * URL are defined in a separate AuthorityURL element, which may be
	  * defined once and inherited by subsidiary layers.  Identifiers
	  * themselves are not inherited. */
	AuthorityURL?: AuthorityURLType[];
	/** The BoundingBox attributes indicate the limits of the bounding box
	  * in units of the specified coordinate reference system. */
	BoundingBox?: BoundingBoxType[];
	/** Identifier for a single Coordinate Reference System (CRS). */
	CRS?: string[];
	/** A Map Server may use DataURL offer a link to the underlying data represented
	  * by a particular layer. */
	DataURL?: DataURLType[];
	/** The Dimension element declares the existence of a dimension and indicates what
	  * values along a dimension are valid. */
	Dimension?: DimensionType[];
	/** The EX_GeographicBoundingBox attributes indicate the limits of the enclosing
	  * rectangle in longitude and latitude decimal degrees. */
	EX_GeographicBoundingBox?: EX_GeographicBoundingBoxType;
	/** A Map Server may use FeatureListURL to point to a list of the
	  * features represented in a Layer. */
	FeatureListURL?: FeatureListURLType[];
	Identifier?: IdentifierType[];
	/** List of keywords or keyword phrases to help catalog searching. */
	KeywordList?: KeywordListType;
	/** Nested list of zero or more map Layers offered by this server. */
	Layer?: LayerType[];
	/** Maximum scale denominator for which it is appropriate to
	  * display this layer. */
	MaxScaleDenominator?: number;
	/** A Map Server may use zero or more MetadataURL elements to offer
	  * detailed, standardized metadata about the data underneath a
	  * particular layer. The type attribute indicates the standard to which
	  * the metadata complies.  The format element indicates how the metadata is structured. */
	MetadataURL?: MetadataURLType[];
	/** Minimum scale denominator for which it is appropriate to
	  * display this layer. */
	MinScaleDenominator?: number;
	/** The Name is typically for machine-to-machine communication. */
	Name?: string;
	/** A Style element lists the name by which a style is requested and a
	  * human-readable title for pick lists, optionally (and ideally)
	  * provides a human-readable description, and optionally gives a style
	  * URL. */
	Style?: StyleType[];
	/** The Title is for informative display to a human. */
	Title: string;
}
export interface LayerType extends _LayerType { constructor: { new(): LayerType }; }

interface _LegendURLType extends BaseType {
	height: number;
	width: number;
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface LegendURLType extends _LegendURLType { constructor: { new(): LegendURLType }; }

interface _LogoURLType extends BaseType {
	height: number;
	width: number;
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface LogoURLType extends _LogoURLType { constructor: { new(): LogoURLType }; }

export type longitudeType = number;
type _longitudeType = Primitive._number;

interface _MetadataURLType extends BaseType {
	type: string;
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface MetadataURLType extends _MetadataURLType { constructor: { new(): MetadataURLType }; }

interface _OnlineResourceType extends BaseType {
	actuate: xlink.actuateType;
	arcrole: string;
	href: string;
	role: string;
	show: xlink.showType;
	title: string;
	type: xlink.typeType;
}
export interface OnlineResourceType extends _OnlineResourceType { constructor: { new(): OnlineResourceType }; }

/** For each operation offered by the server, list the available output
  * formats and the online resource. */
interface _OperationType extends BaseType {
	/** Available Distributed Computing Platforms (DCPs) are listed here.
	  * At present, only HTTP is defined. */
	DCPType: DCPTypeType[];
	/** A container for listing an available format's MIME type. */
	Format: string[];
}
export interface OperationType extends _OperationType { constructor: { new(): OperationType }; }
export var OperationType: { new(): OperationType };

interface _PostType extends BaseType {
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface PostType extends _PostType { constructor: { new(): PostType }; }

interface _RequestType extends BaseType {
	ExtendedOperation?: ExtendedOperationProxyType[];
	GetCapabilities: OperationType;
	GetFeatureInfo?: OperationType;
	GetMap: OperationType;
}
export interface RequestType extends _RequestType { constructor: { new(): RequestType }; }

interface _ServiceType extends BaseType {
	/** The abstract is a longer narrative description of an object. */
	Abstract?: string;
	AccessConstraints?: string;
	/** Information about a contact person for the service. */
	ContactInformation?: ContactInformationType;
	Fees?: string;
	/** List of keywords or keyword phrases to help catalog searching. */
	KeywordList?: KeywordListType;
	LayerLimit?: number;
	MaxHeight?: number;
	MaxWidth?: number;
	Name: ServiceTypeNameType;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
	/** The Title is for informative display to a human. */
	Title: string;
}
export interface ServiceType extends _ServiceType { constructor: { new(): ServiceType }; }

export type ServiceTypeNameType = "WMS";
interface _ServiceTypeNameType extends Primitive._string { content: ServiceTypeNameType; }

interface _StyleSheetURLType extends BaseType {
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface StyleSheetURLType extends _StyleSheetURLType { constructor: { new(): StyleSheetURLType }; }

interface _StyleType extends BaseType {
	/** The abstract is a longer narrative description of an object. */
	Abstract?: string;
	/** A Map Server may use zero or more LegendURL elements to provide an
	  * image(s) of a legend relevant to each Style of a Layer.  The Format
	  * element indicates the MIME type of the legend. Width and height
	  * attributes may be provided to assist client applications in laying out
	  * space to display the legend. */
	LegendURL?: LegendURLType[];
	/** The Name is typically for machine-to-machine communication. */
	Name: string;
	/** StyleSheeetURL provides symbology information for each Style of a Layer. */
	StyleSheetURL?: StyleSheetURLType;
	/** A Map Server may use StyleURL to offer more information about the
	  * data or symbology underlying a particular Style. While the semantics
	  * are not well-defined, as long as the results of an HTTP GET request
	  * against the StyleURL are properly MIME-typed, Viewer Clients and
	  * Cascading Map Servers can make use of this. A possible use could be
	  * to allow a Map Server to provide legend information. */
	StyleURL?: StyleURLType;
	/** The Title is for informative display to a human. */
	Title: string;
}
export interface StyleType extends _StyleType { constructor: { new(): StyleType }; }

interface _StyleURLType extends BaseType {
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
}
export interface StyleURLType extends _StyleURLType { constructor: { new(): StyleURLType }; }

interface _WMS_CapabilitiesType extends BaseType {
	updateSequence: string;
	version: string;
	/** A Capability lists available request types, how exceptions may be
	  * reported, and whether any extended capabilities are defined.
	  * It also includes an optional list of map layers available from this
	  * server. */
	Capability: CapabilityType;
	/** General service metadata. */
	Service: ServiceType;
	/** custom extension to store the url */
	wmsurl?: string;
}
export interface WMS_CapabilitiesType extends _WMS_CapabilitiesType { constructor: { new(): WMS_CapabilitiesType }; }

export interface document extends BaseType {
	/** The abstract is a longer narrative description of an object. */
	Abstract: string;
	AccessConstraints: string;
	Address: string;
	AddressType: string;
	/** Attribution indicates the provider of a Layer or collection of Layers.
	  * The provider's URL, descriptive title string, and/or logo image URL
	  * may be supplied.  Client applications may choose to display one or
	  * more of these items.  A format element indicates the MIME type of
	  * the logo image located at LogoURL.  The logo image's width and height
	  * assist client applications in laying out space to display the logo. */
	Attribution: AttributionType;
	/** A Map Server may use zero or more Identifier elements to list ID
	  * numbers or labels defined by a particular Authority.  For example,
	  * the Global Change Master Directory (gcmd.gsfc.nasa.gov) defines a
	  * DIF_ID label for every dataset.  The authority name and explanatory
	  * URL are defined in a separate AuthorityURL element, which may be
	  * defined once and inherited by subsidiary layers.  Identifiers
	  * themselves are not inherited. */
	AuthorityURL: AuthorityURLType;
	/** The BoundingBox attributes indicate the limits of the bounding box
	  * in units of the specified coordinate reference system. */
	BoundingBox: BoundingBoxType;
	/** A Capability lists available request types, how exceptions may be
	  * reported, and whether any extended capabilities are defined.
	  * It also includes an optional list of map layers available from this
	  * server. */
	Capability: CapabilityType;
	City: string;
	ContactAddress: ContactAddressType;
	ContactElectronicMailAddress: string;
	ContactFacsimileTelephone: string;
	/** Information about a contact person for the service. */
	ContactInformation: ContactInformationType;
	ContactOrganization: string;
	ContactPerson: string;
	ContactPersonPrimary: ContactPersonPrimaryType;
	ContactPosition: string;
	ContactVoiceTelephone: string;
	Country: string;
	/** Identifier for a single Coordinate Reference System (CRS). */
	CRS: string;
	/** A Map Server may use DataURL offer a link to the underlying data represented
	  * by a particular layer. */
	DataURL: DataURLType;
	/** Available Distributed Computing Platforms (DCPs) are listed here.
	  * At present, only HTTP is defined. */
	DCPType: DCPTypeType;
	/** The Dimension element declares the existence of a dimension and indicates what
	  * values along a dimension are valid. */
	Dimension: DimensionType;
	/** The EX_GeographicBoundingBox attributes indicate the limits of the enclosing
	  * rectangle in longitude and latitude decimal degrees. */
	EX_GeographicBoundingBox: EX_GeographicBoundingBoxType;
	/** An Exception element indicates which error-reporting formats are
	  * supported. */
	Exception: ExceptionType;
	/** A Map Server may use FeatureListURL to point to a list of the
	  * features represented in a Layer. */
	FeatureListURL: FeatureListURLType;
	Fees: string;
	/** A container for listing an available format's MIME type. */
	Format: string;
	/** The URL prefix for the HTTP "Get" request method. */
	Get: GetType;
	GetCapabilities: OperationType;
	GetFeatureInfo: OperationType;
	GetMap: OperationType;
	/** Available HTTP request methods.  At least "Get" shall be supported. */
	HTTP: HTTPType;
	Identifier: IdentifierType;
	/** A single keyword or phrase. */
	Keyword: KeywordType;
	/** List of keywords or keyword phrases to help catalog searching. */
	KeywordList: KeywordListType;
	/** Nested list of zero or more map Layers offered by this server. */
	Layer: LayerType;
	LayerLimit: number;
	/** A Map Server may use zero or more LegendURL elements to provide an
	  * image(s) of a legend relevant to each Style of a Layer.  The Format
	  * element indicates the MIME type of the legend. Width and height
	  * attributes may be provided to assist client applications in laying out
	  * space to display the legend. */
	LegendURL: LegendURLType;
	LogoURL: LogoURLType;
	MaxHeight: number;
	/** Maximum scale denominator for which it is appropriate to
	  * display this layer. */
	MaxScaleDenominator: number;
	MaxWidth: number;
	/** A Map Server may use zero or more MetadataURL elements to offer
	  * detailed, standardized metadata about the data underneath a
	  * particular layer. The type attribute indicates the standard to which
	  * the metadata complies.  The format element indicates how the metadata is structured. */
	MetadataURL: MetadataURLType;
	/** Minimum scale denominator for which it is appropriate to
	  * display this layer. */
	MinScaleDenominator: number;
	/** The Name is typically for machine-to-machine communication. */
	Name: string;
	/** An OnlineResource is typically an HTTP URL.  The URL is placed in
	  * the xlink:href attribute, and the value "simple" is placed in the
	  * xlink:type attribute. */
	OnlineResource: OnlineResourceType;
	/** The URL prefix for the HTTP "Post" request method. */
	Post: PostType;
	PostCode: string;
	/** Available WMS Operations are listed in a Request element. */
	Request: RequestType;
	/** General service metadata. */
	Service: ServiceType;
	StateOrProvince: string;
	/** A Style element lists the name by which a style is requested and a
	  * human-readable title for pick lists, optionally (and ideally)
	  * provides a human-readable description, and optionally gives a style
	  * URL. */
	Style: StyleType;
	/** StyleSheeetURL provides symbology information for each Style of a Layer. */
	StyleSheetURL: StyleSheetURLType;
	/** A Map Server may use StyleURL to offer more information about the
	  * data or symbology underlying a particular Style. While the semantics
	  * are not well-defined, as long as the results of an HTTP GET request
	  * against the StyleURL are properly MIME-typed, Viewer Clients and
	  * Cascading Map Servers can make use of this. A possible use could be
	  * to allow a Map Server to provide legend information. */
	StyleURL: StyleURLType;
	/** The Title is for informative display to a human. */
	Title: string;
	/** A WMS_Capabilities document is returned in response to a
	  * GetCapabilities request made on a WMS. */
	WMS_Capabilities: WMS_CapabilitiesType;
}
export var document: document;
