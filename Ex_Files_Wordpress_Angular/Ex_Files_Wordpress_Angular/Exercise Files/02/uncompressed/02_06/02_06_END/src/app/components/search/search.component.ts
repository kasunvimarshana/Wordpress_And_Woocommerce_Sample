import { Component, OnInit } from '@angular/core';

import { SearchFormComponent } from '../search-form/search-form.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import {RestApiService} from "../../services/rest-api.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private searching: boolean;
  private results: any;
  constructor(private api: RestApiService) { }

  ngOnInit() {
    this.searching = false;
  }

  searchInit( $event ) {
    this.searching = true;
    let search = {
      search: $event.search_term,
      categories: ''
    };

    for(let cat of $event.categories) {
      let cat_id = Object.keys(cat)[0];
      if ( cat[cat_id] ) {
        search.categories += cat_id + ',';
      }
    }

    search.categories = search.categories.substring( 0, search.categories.length -1 );

    this.api.searchPosts( search ).subscribe(data => {
      console.log( data );
      this.searching = false;
      this.results = data;
    });
  }

}
