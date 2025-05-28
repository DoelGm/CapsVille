import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-list-post',
  standalone: true,
  imports: [FormsModule, CommonModule,NgxPaginationModule],
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent {
  p: number = 1;
  itemsPerPage: number = 5;
  list: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  postToDelete: any = null;
  postToEdit: any = null;
  isEditing: boolean = false;
  private alertTimeout: any;

  constructor(private postService: PostsService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe((posts) => {
      this.list = posts.map((post: any) => {
        // Guarda el JSON original para cuando necesites editarlo
        post.originalImgs = post.imgs;

        if (post.imgs) {
          try {
            const imgsArray = JSON.parse(post.imgs);
            const imgUrl = imgsArray[0];
            if (imgUrl) {
              post.imgs = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
            }
          } catch (e) {
            console.error('Error parseando las imágenes', e);
            post.imgs = null;
          }
        } else {
          post.imgs = null;
        }
        return post;
      });
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

    // Asegura que imgs sea el string JSON que espera el backend
    if (post.originalImgs) {
      this.postToEdit.imgs = post.originalImgs;
    }

    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.postToEdit = null;
  }

  updatePost() {
  if (this.postToEdit) {
    this.clearAlerts();

    // 👇 Si la imagen fue cargada como SafeUrl (del sanitizer), la limpiamos para enviar solo el string
    if (this.postToEdit.imgs && typeof this.postToEdit.imgs !== 'string') {
      // Si el campo imgs sigue siendo un SafeUrl (bypassSecurityTrustUrl), lo reemplazamos por el string real
      // Asumiendo que siempre guardas un solo enlace en el array:
      this.postToEdit.imgs = JSON.stringify([this.postToEdit.imgs.changingThisBreaksApplicationSecurity]);
    } else if (this.postToEdit.imgs && typeof this.postToEdit.imgs === 'string') {
      this.postToEdit.imgs = JSON.stringify([this.postToEdit.imgs]);
    } else {
      this.postToEdit.imgs = null;
    }

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


  // Métodos para alertas
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
