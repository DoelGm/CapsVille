import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/post.service'; // Asegúrate de que la ruta sea correcta;

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [CommonModule],  // Aquí se importa CommonModule
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.css']
})
export class CardNewsComponent implements OnInit {
  posts: any[] = [];
  alertMessage: string = '';
  isLoading: boolean = true;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
this.postsService.getAllPosts().subscribe({
    next: (data) => {
      this.isLoading = false;
      this.posts = data;
      console.log('Posts cargados:', this.posts);
      if (data.length === 0) {
        this.alertMessage = 'No hay posts disponibles';
      }
    },
    error: (error) => {
      this.isLoading = false;
      this.alertMessage = 'Error al cargar posts';
      console.error('Error al cargar posts:', error);
    }
  });

  }
}
