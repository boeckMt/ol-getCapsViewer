import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MapService } from './components/map/map.service';

import { AppHeaderComponent } from './components/app-header/app-header.component';
import { HomeComponent } from './route-components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { OgcWmsService } from './shared/ogc-wms.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    MapComponent,
    LayerListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MapService, OgcWmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
