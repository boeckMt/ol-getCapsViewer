import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { NgPipesModule } from 'ngx-pipes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { MapOlModule } from '@dlr-eoc/map-ol';
import { LayerControlModule } from '@dlr-eoc/layer-control';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { OgcWmsService } from './shared/ogc-wms.service';


import { HomeComponent } from './route-components/home/home.component';
import { MapComponent } from './route-components/map/map.component';

import { WmsCapServiceComponent } from './components/wms-cap-service/wms-cap-service.component';
import { WmsCapCapabilityComponent } from './components/wms-cap-capability/wms-cap-capability.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalAlertComponent,
    GlobalProgressComponent,
    HomeComponent,
    MapComponent,
    WmsCapCapabilityComponent,
    WmsCapServiceComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    NgPipesModule,
    MapOlModule,
    LayerControlModule,
    HttpClientModule
  ],
  providers: [AlertService, ProgressService, OgcWmsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
