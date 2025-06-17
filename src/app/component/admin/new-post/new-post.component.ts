import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service'; // Asegúrate de importar tu servicio
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-new-post',
  imports: [CommonModule,FormsModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  @ViewChild('imageInput') imageInput!: ElementRef;
  post: any = {
    title: null,
    content: null,
    image: null 
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private postsService: PostsService, private http: HttpClient) {}

  // Función para manejar la selección del archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.post.image = file; // Asignamos la imagen al objeto post
    }
  }

  createPost(): void {
    // Validación básica
    if (!this.post.title || !this.post.content) {
      this.errorMessage = 'El título y el contenido son obligatorios.';
      return;
    }

    // Llamada al servicio para crear el post
    this.postsService.createPost(this.post).subscribe({
      next: (response) => {
        this.successMessage = 'Post creado exitosamente.';
        console.log('Post creado exitosamente:', response);
        this.resetForm(); // Reseteamos el formulario después de crear el post
        // Aquí podrías redirigir o mostrar un mensaje de éxito
      },
      error: (error) => {
        console.error('Error al crear el post:', error);
        console.log('Error details:', this.post);
        this.errorMessage = 'Hubo un error al crear el post. Por favor, inténtalo de nuevo.';
      }
    });
  }

  // Función para cerrar las alertas de error
  dismissAlert(type: string): void {
    if (type === 'error') {
      this.errorMessage = null;
    }
  }
  resetForm(): void {
    this.post = {
      title: '',
      content: '',
    };
    this.errorMessage = null; // Limpiamos el mensaje de error
    this.imageInput.nativeElement.value = ''; // Limpiamos el input de archivo
  }
}

