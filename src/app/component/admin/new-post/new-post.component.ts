import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service'; // Asegúrate de importar tu servicio
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent {
  post: any = {
    title: '',
    content: '',
    imgs: [],
    category_id: null
  };

  selectedFiles: File[] = [];  // Para almacenar los archivos seleccionados
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private alertTimeout: any;

  constructor(
    private postService: PostsService, // Inyectar el servicio de imágenes
    private http: HttpClient
  ) {}

  // Maneja la selección de archivos (imágenes)
  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);  // Almacena los archivos seleccionados
  }

  // Función para crear el post
  createPost() {
  this.clearAlerts();

  const formData = new FormData();
  formData.append('title', this.post.title);
  formData.append('content', this.post.content);

  // Añadir las imágenes (si existen)
  this.selectedFiles.forEach(file => {
    formData.append('link[]', file, file.name);
  });

  this.http.post('http://localhost:8000/api/posts', formData).subscribe({
    next: (response) => {
      this.successMessage = '¡Noticia creada exitosamente!';
      this.resetForm();
      this.setAlertTimeout('success');
    },
    error: (error) => {
      console.error('Error al crear noticia', error);
      this.errorMessage = 'Error al crear la noticia. Por favor, inténtelo de nuevo.';
      this.setAlertTimeout('error');
    }
  });
}


  resetForm() {
    this.post = {
      title: '',
      content: '',
      imgs: [],
      category_id: null
    };
    this.selectedFiles = [];
  }

  dismissAlert(type: 'success' | 'error') {
    if (type === 'success') {
      this.successMessage = null;
    } else {
      this.errorMessage = null;
    }
    clearTimeout(this.alertTimeout);
  }

  private setAlertTimeout(type: 'success' | 'error') {
    this.alertTimeout = setTimeout(() => {
      this.dismissAlert(type);
    }, 5000); // Se cierra automáticamente después de 5 segundos
  }

  private clearAlerts() {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }
}
