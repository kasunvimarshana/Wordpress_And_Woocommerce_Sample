import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WindowService } from './services/window.service';
import { RestApiService } from './services/rest-api.service';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    WindowService,
    RestApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
