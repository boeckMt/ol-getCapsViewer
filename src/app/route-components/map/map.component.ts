import { Component, OnInit, HostBinding } from '@angular/core';
import { LayersService, RasterLayer, VectorLayer, LayerGroup, Layer, WmtsLayer, WmsLayer } from '@dlr-eoc/services-layers';
import { MapStateService } from '@dlr-eoc/services-map-state';
import { OsmTileLayer, EocLitemapTile } from '@dlr-eoc/base-layers-raster';
import { MapOlService, IMapControls } from '@dlr-eoc/map-ol';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  controls: IMapControls;

  constructor(
    public layersSvc: LayersService,
    public mapStateSvc: MapStateService,
    public mapSvc: MapOlService) {

    this.controls = {
      attribution: true,
      scaleLine: true
    };
  }

  ngOnInit(): void {
    this.addBaseLayers();
    this.setExtent();
  }

  addBaseLayers() {
    const eocLitemapLayer = new EocLitemapTile({
      visible: true
    });

    const OsmLayer = new OsmTileLayer({
      id: 'OSM_Base'
    });

    const layers = [eocLitemapLayer, OsmLayer];

    /** add layers with the LayersService */
    layers.map(layer => this.layersSvc.addLayer(layer, 'Baselayers'));
  }

  setExtent(): void {
    /** set map extent or IMapState (zoom, center...) with the MapStateService */
    // this.mapStateSvc.setExtent([-14, 33, 40, 57]);
  }

}
