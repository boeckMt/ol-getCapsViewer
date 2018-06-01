import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-route',
  templateUrl: './map-route.component.html',
  styleUrls: ['./map-route.component.scss'],
  host: {'class': 'content-container'} //to add class to the component for clarity container height
})
export class MapRouteComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
