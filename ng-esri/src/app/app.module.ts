import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EsriMapComponent } from './esri-map/esri-map.component';
import { TestMapComponent } from './test-map/test-map/test-map.component';

@NgModule({
  declarations: [
    AppComponent,
    EsriMapComponent,
    TestMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
