import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SearchFormComponent } from './components/search-form/search-form.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultsComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
