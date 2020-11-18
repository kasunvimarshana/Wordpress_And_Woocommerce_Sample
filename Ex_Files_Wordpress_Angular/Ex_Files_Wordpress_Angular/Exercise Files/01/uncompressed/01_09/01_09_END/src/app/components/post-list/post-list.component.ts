import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../../services/rest-api.service';
import { PostListSingleComponent } from '../post-list-single/post-list-single.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  private posts: any;

  constructor(private api: RestApiService) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.api.getPosts().subscribe(data => {
      this.posts = data;
    });
  }

}
