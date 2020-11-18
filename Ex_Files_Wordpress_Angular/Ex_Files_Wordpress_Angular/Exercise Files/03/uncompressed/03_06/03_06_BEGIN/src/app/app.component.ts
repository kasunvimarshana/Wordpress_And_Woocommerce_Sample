import { Component, OnInit } from '@angular/core';
import {RestApiService} from './services/rest-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private posts: any;
  private data: any;
  constructor( private api: RestApiService ) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.api.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

  showData( $event, post_id ) {
    this.data = [];
    $event.preventDefault();
    this.api.getClick( post_id ).subscribe(data => {
      if ( data['results'] ) {
        this.data = data['results'];
      }
    });
  }

}
