import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    imgs: '',
    category_id: null
  };
  
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private alertTimeout: any;

  constructor(private postService: PostsService) { }

  addPost() {
  this.clearAlerts();

  // Si hay una URL, conviértela en un arreglo
  if (this.post.imgs) {
    this.post.imgs = [this.post.imgs];
  } else {
    this.post.imgs = null; // o [], según tu backend
  }

  this.postService.createPost(this.post).subscribe({
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
      imgs: null,
      category_id: null
    };
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