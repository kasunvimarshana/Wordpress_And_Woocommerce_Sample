import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { RestApiService } from "../../services/rest-api.service";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  private search_form: FormGroup;
  private error: string;
  private categories: any;
  private init: boolean;

  @Output() newSearch: EventEmitter<any> = new EventEmitter<any>();

  @Input('searching')
  private searching: boolean;

  constructor( private fb: FormBuilder, private api: RestApiService ) { }

  ngOnInit() {
    this.init = false;
    this.getCategories();
  }

  getCategories() {
    this.api.getCategories().subscribe(data => {
      this.categories = data;

      let allCategories: FormArray = new FormArray([]);
      for(let i = 0; i < this.categories.length; i++) {
        let fg = new FormGroup({});
        fg.addControl(this.categories[i].id, new FormControl(false));
        allCategories.push(fg);
      }

      this.search_form = this.fb.group({
          'search_term': new FormControl( null, Validators.required ),
          'categories': allCategories
      });

      this.init = true;

    })
  }

  startSearch() {
    if ( this.search_form.valid ) {
      this.newSearch.emit( this.search_form.value );
    }
  }

}
