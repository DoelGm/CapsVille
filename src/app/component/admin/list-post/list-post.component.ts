import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PostsService, Post } from '../../../services/post.service';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [FormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 5;
  isLoading: boolean = true;
  list: Post[] = [];
  selectedEditFiles: File[] = [];
  post: Post = {
    title: '',
    content: '',
    images: []
  };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  postToDelete: any | null = null;
  postToEdit: any | null = null;
  deleteModalInstance: any;
  isEditing: boolean = false;
  private alertTimeout: any;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.clearAlerts();
    this.postService.getAllPosts().subscribe({
      next: (data: any) => {
        this.isLoading = false;
        this.list = data;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading post', error);
        this.errorMessage = 'Error al cargar los posts';
        this.setAlertTimeout('error');
      }
    });
  }

  prepareEdit(post: any) {
    this.postToEdit = { ...post };
    this.isEditing = true;
    console.log('Imagen previa:', this.postToEdit);
  }

  cancelEdit() {
    this.isEditing = false;
    this.postToEdit = null;
  }
onImageChange(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0 && this.postToEdit?.id !== undefined) {
    const imageFile = input.files[0];
    this.postToEdit.image = imageFile;
    console.log('Imagen seleccionada:', this.postToEdit.image);
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
      console.log('Vista previa cargada:', this.imagePreview);
    };

    reader.readAsDataURL(imageFile);
  }
}
  updatePost() {
    if (this.postToEdit && this.postToEdit.id !== undefined) {
      this.clearAlerts();
      this.postService.updatePost(this.postToEdit.id, this.postToEdit).subscribe({
        next: (response) => {
          this.successMessage = 'Producto actualizado exitosamente';
          this.setAlertTimeout('success');
          this.postService.updateImages(this.postToEdit.id, this.postToEdit.image).subscribe({
            next: (response) => {
              this.successMessage = 'Imagen subida exitosamente';
              this.setAlertTimeout('success');
              this.loadPosts();
            },
            error: (error) => {
              console.error('Error uploading image', error);
              this.errorMessage = 'Error al subir la imagen';
              this.setAlertTimeout('error');
            }
          });
          this.loadPosts();
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.errorMessage = 'Error al actualizar el producto';
          this.setAlertTimeout('error');
        }
      });
    }else {
      this.errorMessage = 'No se pudo actualizar el producto, ID no válido';
      this.setAlertTimeout('error');
    }
  }



  prepareDelete(post: Post) {
    this.postToDelete = post;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      // @ts-ignore
      this.deleteModalInstance = new bootstrap.Modal(modal);
      this.deleteModalInstance.show();
    }
  }

  confirmDelete() {
    if (this.postToDelete && this.postToDelete.id !== undefined) {
      this.clearAlerts();
      this.postService.deletePost(this.postToDelete.id).subscribe({
        next: (response) => {
          this.successMessage = 'Post eliminado exitosamente';
          this.setAlertTimeout('success');
          this.loadPosts();
          if (this.deleteModalInstance) {
            this.deleteModalInstance.hide();
          }
        },
        error: (error) => {
          console.error('Error deleting post', error);
          this.errorMessage = 'Error al eliminar el post';
          this.setAlertTimeout('error');
        }
      });
    }
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
    }, 5000);
  }

  private clearAlerts() {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }



  }

