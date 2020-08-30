import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-example-route',
  templateUrl: './example-route.component.html',
  styleUrls: ['./example-route.component.scss']
})
export class ExampleRouteComponent implements OnInit {
  @HostBinding('class') class = 'content-container';
  constructor() { }

  ngOnInit() {
  }

}
