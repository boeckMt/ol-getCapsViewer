import { Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import * as ol from 'openlayers';
import { MapService } from './map.service';

@Component({
  selector: 'ol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  /*
  map: ol.Map;
  view: ol.View;
  baselayers: ol.layer.Group;
  overlays: ol.layer.Group;
  */

  constructor(private mapsvc: MapService, private el: ElementRef) {

  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    console.dir(this.el.nativeElement)
    //let parentele = this.el.nativeElement.parentElement
    //let mapele = this.el.nativeElement.children[0].children[0]
    this.mapsvc.setTarget('map');
    //this.mapsvc.map.setSize([parentele.clientHeight, parentele.clientWidth])

    this.mapsvc.addOverlay(
      new ol.layer.Tile(<any>{
        title: 'osm_roads_gen3',
        extent: ol.proj.transformExtent([-20, 35, 30, 55], 'EPSG:4326', 'EPSG:3857'),
        source: new ol.source.TileWMS({
          url: 'https://geoservice.dlr.de/eoc/basemap/wms',
          params: { 'LAYERS': 'osm_roads_gen3', 'TILED': true },
          serverType: 'geoserver',
          // Countries have transparency, so do not fade tiles:
          transition: 0
        })
      })
    );

  }

}
