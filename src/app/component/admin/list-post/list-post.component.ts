import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  list: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  postToDelete: any = null;
  postToEdit: any = null;
  isEditing: boolean = false;
  private alertTimeout: any;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.clearAlerts();
    
    this.postService.getAllPosts().subscribe({
      next: (response) => {
        this.list = response;
        this.successMessage = '¡Posts cargados exitosamente!';
        this.setAlertTimeout('success');
      },
      error: (error) => {
        console.error('Error loading posts', error);
        this.errorMessage = 'Error al cargar los posts. Por favor, inténtelo de nuevo.';
        this.setAlertTimeout('error');
      }
    });
  }

  prepareDelete(post: any) {
    this.postToDelete = post;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      // @ts-ignore
      new bootstrap.Modal(modal).show();
    }
  }

  confirmDelete() {
    if (this.postToDelete) {
      this.clearAlerts();
      
      this.postService.deletePost(this.postToDelete.id).subscribe({
        next: (response) => {
          this.successMessage = '¡Post eliminado exitosamente!';
          this.setAlertTimeout('success');
          this.loadPosts();
          this.postToDelete = null;
          this.hideModal();
        },
        error: (error) => {
          console.error('Error deleting post', error);
          this.errorMessage = 'Error al eliminar el post. Por favor, inténtelo de nuevo.';
          this.setAlertTimeout('error');
          this.hideModal();
        }
      });
    }
  }

  hideModal() {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      // @ts-ignore
      bootstrap.Modal.getInstance(modal)?.hide();
    }
  }

  prepareEdit(post: any) {
    this.postToEdit = { ...post };
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.postToEdit = null;
  }

  updatePost() {
    if (this.postToEdit) {
      this.clearAlerts();
      
      this.postService.updatePost(this.postToEdit).subscribe({
        next: (response) => {
          this.successMessage = '¡Post actualizado exitosamente!';
          this.setAlertTimeout('success');
          this.loadPosts();
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating post', error);
          this.errorMessage = 'Error al actualizar el post. Por favor, inténtelo de nuevo.';
          this.setAlertTimeout('error');
        }
      });
    }
  }

  // Nuevos métodos para manejo de alertas
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
    }, 5000); // 5 segundos
  }

  private clearAlerts() {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }
}