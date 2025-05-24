import { Component } from '@angular/core';
import { RecentPostComponent } from "../../../component/public/recent-post/recent-post.component";
import { CardNewsComponent } from "../../../component/public/card-news/card-news.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RecentPostComponent, CardNewsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
