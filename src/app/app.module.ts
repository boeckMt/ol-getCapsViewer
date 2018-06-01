import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';


//services
import { AppStoreService } from './shared/app-store.service';
import { OgcWmsService } from './shared/ogc-wms.service';
import { MapService } from './components/map/map.service';

//Components
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { MapComponent } from './components/map/map.component';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { LayerTreeComponent } from './components/layer-tree/layer-tree.component';

//route Components
import { MapRouteComponent } from './route-components/map-route/map-route.component';
import { HomeComponent } from './route-components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    HomeComponent,
    MapComponent,
    LayerListComponent,
    LayerTreeComponent,
    MapRouteComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [MapService, OgcWmsService, AppStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
