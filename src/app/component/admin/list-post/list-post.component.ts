import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './list-post.component.html',  
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  p: number = 1;
  itemsPerPage: number = 5;
  list: any[] = [];
  selectedEditFiles: File[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  postToDelete: any = null;
  postToEdit: any = null;
  isEditing: boolean = false;
  private alertTimeout: any;

  constructor(private postService: PostsService, private http: HttpClient) {}

  ngOnInit() {
    this.loadPosts();
  }

  // Cargar los posts desde el servicio
  loadPosts() {
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.list = data; // Asignamos la respuesta al listado de posts
        // Si no hay posts, mostramos un mensaje de éxito
        if (this.list.length === 0) {
          this.successMessage = 'No hay posts disponibles para mostrar.';
        } else {
          this.successMessage = null; // Limpiamos el mensaje si hay posts
        }
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los posts';
        console.error('Error:', error);
      }
    });
  }

  // Preparar para editar un post
  prepareEdit(post: any) {
    this.isEditing = true;
    this.postToEdit = { ...post }; // Hacemos una copia del post
    this.selectedEditFiles = []; // Limpiamos los archivos seleccionados para edición
  }

  // Cancelar la edición
  cancelEdit() {
    this.isEditing = false;
    this.postToEdit = null;
    this.selectedEditFiles = [];
  }

  // Función para actualizar el post
  updatePost() {
  if (!this.postToEdit.title || !this.postToEdit.content) {
    this.errorMessage = 'El título y el contenido son obligatorios.';
    return;
  }


  this.postService.updatePost(this.postToEdit.id, this.postToEdit).subscribe({
    next: (response) => {
      this.successMessage = 'Post actualizado con éxito';
      console.log('Post actualizado:', this.postToEdit);
      this.loadPosts(); // Recargar lista
      this.cancelEdit(); // Salir del modo edición
    },
    error: (error) => {
      this.errorMessage = 'Hubo un error al actualizar el post.';
      console.error('Error:', error);
    }
  });
}

  // Función para manejar la selección de archivos
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.postToEdit.image = file; // Asignamos la imagen al objeto post
    }
  }

  // Función para preparar el borrado de un post
  prepareDelete(post: any) {
    this.postToDelete = post;
  }

  // Confirmar el borrado de un post
  confirmDelete() {
    this.postService.deletePost(this.postToDelete.id).subscribe({
      next: (response) => {
        this.successMessage = 'Post eliminado con éxito';
        this.loadPosts(); // Recargamos los posts después de eliminar
        this.postToDelete = null;
      },
      error: (error) => {
        this.errorMessage = 'Hubo un error al eliminar el post.';
        console.error('Error:', error);
      }
    });
  }

  // Función para cerrar las alertas de error o éxito
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
    }, 5000);
  }

  private clearAlerts() {
    this.errorMessage = null;
    this.successMessage = null;
    clearTimeout(this.alertTimeout);
  }
}
