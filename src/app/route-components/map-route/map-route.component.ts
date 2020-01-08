import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.scss']
})
export class MapRouteComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
