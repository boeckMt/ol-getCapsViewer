import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';

// services
import { AppStoreService } from './shared/app-store.service';
import { OgcWmsService } from './shared/ogc-wms.service';
import { MapService } from './components/map/map.service';

// Components
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { LayerListComponent } from './components/layer-list/layer-list.component';
import { LayerTreeComponent } from './components/layer-tree/layer-tree.component';

// route Components
import { MapRouteComponent } from './route-components/map-route/map-route.component';
import { HomeComponent } from './route-components/home/home.component';
import { WmsCapServiceComponent } from './components/wms-cap-service/wms-cap-service.component';
import { WmsCapCapabilityComponent } from './components/wms-cap-capability/wms-cap-capability.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    LayerListComponent,
    LayerTreeComponent,
    MapRouteComponent,
    WmsCapServiceComponent,
    WmsCapCapabilityComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgPipesModule
  ],
  providers: [MapService, OgcWmsService, AppStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
