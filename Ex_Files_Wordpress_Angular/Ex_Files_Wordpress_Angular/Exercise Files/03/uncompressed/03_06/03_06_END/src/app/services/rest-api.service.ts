import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestApiService {

  private api_url: any;
  constructor(private http: HttpClient) {
    this.api_url = 'http://angular.local/wp-json/';
  }

  getPosts() {
    return this.http.get( this.api_url + 'wp/v2/posts' );
  }

  getClick( post_id ) {
    return this.http.get( this.api_url + 'data/v1/clicks/' + post_id );
  }

}
