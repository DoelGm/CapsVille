import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../../services/post.service'; // Asegúrate de que la ruta sea correcta
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-card-news',
  standalone: true,
  imports: [CommonModule],  // Aquí se importa CommonModule
  templateUrl: './card-news.component.html',
  styleUrls: ['./card-news.component.css']
})
export class CardNewsComponent implements OnInit {
  posts: any[] = []; // Definimos la propiedad 'posts'
  img_url: any = [];   // Definimos la propiedad 'imgs'
  isLoading = true;  // Definimos la propiedad 'isLoading'
  alertMessage = ''; // Definimos la propiedad 'alertMessage'

  constructor(private postsService: PostsService, private imgsService: ImageService) {}

  ngOnInit() {
    this.postsService.getPosts().subscribe({
      next: (data: any) => {
        this.posts = data; 
        console.log('Publicaciones cargadas:', this.posts);     
        if (!this.posts.length) {
          this.alertMessage = 'No hay publicaciones disponibles.'; 
        }
      },
      error: (error) => {
        this.alertMessage = 'Error al cargar las publicaciones.';
      }
    });
    this.imgsService.getImages().subscribe({
      next: (data: any) => {
        this.img_url = data;
      },
      error: (error) => {
        console.error('Error al cargar las imágenes de publicaciones:', error);
      }
    });


  }
  getImageForPost(post: any) {
    return this.img_url.find((link: any) => link.id === post.img_id)?.link || 'imgs/default.jpg';
  }
}
