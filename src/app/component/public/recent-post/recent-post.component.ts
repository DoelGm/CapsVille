import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../../services/post.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-recent-post',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Aquí se importa CommonModule
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.css']
})
export class RecentPostComponent implements OnInit {
  posts: any[] = [];
  isLoading = true;
  alertMessage = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data: any) => {
        this.posts = data;
        this.isLoading = false;
        if (!this.posts.length) {
          this.alertMessage = 'No hay publicaciones recientes.';
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.alertMessage = 'Error al cargar publicaciones.';
      }
    });
  }
}
