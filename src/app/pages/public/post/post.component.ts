import { Component } from '@angular/core';
import { CardNewsComponent } from "../../../component/public/card-news/card-news.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CardNewsComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
