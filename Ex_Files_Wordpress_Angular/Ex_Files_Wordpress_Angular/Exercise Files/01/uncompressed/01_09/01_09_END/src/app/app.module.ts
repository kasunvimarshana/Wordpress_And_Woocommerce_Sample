import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WindowService } from './services/window.service';
import { RestApiService } from './services/rest-api.service';
import { HttpClientModule } from "@angular/common/http";
import { PostListComponent } from './components/post-list/post-list.component';
import { PostListSingleComponent } from './components/post-list-single/post-list-single.component';



@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostListSingleComponent
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
