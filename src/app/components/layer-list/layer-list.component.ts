import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { layer } from 'openlayers';
import { OgcWmsService } from '../../shared/ogc-wms.service';

@Component({
  selector: 'ol-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.scss']
})
export class LayerListComponent implements AfterViewInit {
  layersarray: layer.Base[];
  wmsurl: string = ''
  constructor(private mapsvc: MapService, private wmssvc: OgcWmsService) { 
    this.layersarray = [];
  }

  ngOnInit() {
    this.wmssvc.getWmsCaps('https://geoservice.dlr.de/eoc/basemap/wms','1.3.0', (result)=>{
      result.Capability.Layer.Layer.forEach((layer)=>{
        console.log(layer.Title)
        this.layersarray.push(this.mapsvc.createWmsLayer(layer));
      })
    });
    
    //this.mapsvc.createWmsLayer
    
    //this.layersarray = this.mapsvc.overlays.getLayers().getArray()
    
  
    console.log(this.layersarray);
  }


  ngAfterViewInit() {
    
  }


}
