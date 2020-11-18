import { Injectable } from '@angular/core';

import { WindowService } from './window.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RestApiService {

    private api_url: any;
    constructor( private win: WindowService, private http: HttpClient ) {
        // Set API URL
        this.api_url = ( this.win.nativeWindow.api_settings ) ? this.win.nativeWindow.api_settings.root + 'wp/v2/' : 'http://angular.local/wp-json/wp/v2/';
    }

    getPosts() {
        return this.http.get( this.api_url + 'posts' );
    }

    getPost( post_id ) {
        return this.http.get( this.api_url + 'posts/' + post_id );
    }

    getPage( page_id ) {
        return this.http.get( this.api_url + 'pages/' + page_id );
    }

    getPostBySlug( post_slug ) {
        return this.http.get( this.api_url + 'posts/?slug=' + post_slug );
    }

    getCategories() {
        return this.http.get( this.api_url + 'categories' );
    }

    searchPosts( search ) {
        return this.http.get( this.api_url + 'posts/?search=' + search.search + '&category=' + search.categories );
    }

}
