import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { GlobalAlertComponent } from './components/global-alert/global-alert.component';
import { AlertService } from './components/global-alert/alert.service';
import { GlobalProgressComponent } from './components/global-progress/global-progress.component';
import { ProgressService } from './components/global-progress/progress.service';
import { AppRoutingModule } from './app-routing.module';
import { ExampleRouteComponent } from './route-components/example-route/example-route.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GlobalAlertComponent,
    GlobalProgressComponent,
    ExampleRouteComponent
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AlertService, ProgressService],
  bootstrap: [AppComponent]
})
export class AppModule { }
