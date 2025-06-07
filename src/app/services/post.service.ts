import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Post {
  id?: number;
  title: string;
  content: string;
  category_id?: number | null;
  image?: File; // Para subir imagen
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts'; // Cambia esto a tu URL de API

  constructor(private http: HttpClient) {}

  // Obtener todos los posts
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Obtener un solo post
  getPost(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Crear post (con imagen)
  createPost(post: Post): Observable<any> {
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    if (post.category_id !== undefined && post.category_id !== null) {
      formData.append('category_id', post.category_id.toString());
    }
    if (post.image) {
      formData.append('image', post.image);
    }

    return this.http.post(`${this.apiUrl}`, formData);
  }

  // Actualizar post (con opción de nueva imagen)
  updatePost(id: number, post: Post): Observable<any> {
    const formData = new FormData();
    if (post.title) formData.append('title', post.title);
    if (post.content) formData.append('content', post.content);
    if (post.category_id !== undefined && post.category_id !== null) {
      formData.append('category_id', post.category_id.toString());
    }
    if (post.image) {
      formData.append('image', post.image);
    }

    return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, formData); // Laravel necesita override para PUT con FormData
  }

  // Eliminar post
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtener imagen de un post
  getPostImageUrl(id: number): string {
    return `${this.apiUrl}/image/${id}`;
  }
}
