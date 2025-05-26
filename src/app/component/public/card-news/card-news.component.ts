import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/post.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [CommonModule],  // Aquí se importa CommonModule
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.css']
})
export class CardNewsComponent implements OnInit {
  posts: any[] = []; // Definimos la propiedad 'posts'
  isLoading = true;  // Definimos la propiedad 'isLoading'
  alertMessage = ''; // Definimos la propiedad 'alertMessage'

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postsService.getAllPosts().subscribe({
      next: (data: any) => {
        this.posts = data;      
        this.isLoading = false; 
        if (!this.posts.length) {
          this.alertMessage = 'No hay publicaciones disponibles.'; 
        }
      },
      error: (error) => {
        this.isLoading = false;  
        this.alertMessage = 'Error al cargar las publicaciones.';
      }
    });
  }
}
