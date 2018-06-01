import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../shared/app-store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {'class': 'content-container'} //to add class to the component for clarity container height
})
export class HomeComponent implements OnInit {

  constructor(private store: AppStoreService) { 

  }

  ngOnInit() {
  }

  getData(){
    console.log(this.store.getStoreData().caps);
  }

}
