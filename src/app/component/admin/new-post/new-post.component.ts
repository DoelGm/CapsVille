import { Component } from '@angular/core';
import { PostsService } from '../../../services/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-post',
  imports: [FormsModule,CommonModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  post: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private PostService: PostsService) { }

  addPost() {
    this.PostService.createPost(this.post).subscribe(
      (response) => {
        this.successMessage = '¡Post agregado exitosamente!';
        this.resetForm();
      },
      (error) => {
        console.error('Error adding post', error);
        this.errorMessage = 'Error al agregar el post. Por favor, inténtelo de nuevo.';
      }
    );
  }
 
  resetForm() {
    this.post = {
      title: '',
      content: '',
      imageUrl: '',
      category_id: 0
    };
  }
}
