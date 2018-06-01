import { Component, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AppStoreService } from './shared/app-store.service';
import { Subscription } from 'rxjs/Subscription';
 
//import '@clr/icons';
//import '@clr/icons/shapes/all-shapes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  alert:any = false;
  loading:boolean = false;
  private subscriber: Subscription;

  constructor(private store: AppStoreService) { 
    let _store = store.getStoreData();
    this.loading = _store.loading;
    this.alert = _store.alert;

    
    
  }


  ngAfterViewInit(){
    this.subscriber = this.store.store$.subscribe((store)=>{
      this.loading = store.loading;
      this.alert = store.alert;
    })
  }
}
