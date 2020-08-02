import { Component, AfterViewInit, OnInit, ElementRef, Inject, AfterContentChecked } from '@angular/core';

import { MapService } from './map.service';

@Component({
  selector: 'ol-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, AfterContentChecked {
  constructor(@Inject(MapService) private mapsvc: MapService, private el: ElementRef) {

  }

  ngOnInit() {
    // console.dir(this.el.nativeElement);
    // let parentele = this.el.nativeElement.parentElement
    // let mapele = this.el.nativeElement.children[0].children[0]
    this.mapsvc.setTarget('map');
    // this.mapsvc.setTarget(this.el.nativeElement);
  }

  ngAfterViewInit() {
    // this.mapsvc.setTarget(this.el.nativeElement);
  }

  /** update map size on re scaling */
  ngAfterContentChecked() {
    this.mapsvc.map.updateSize();
  }

}
