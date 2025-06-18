import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Post {
  id?: number;
  title: string;
  content?: string;
  category_id?: number;
  images?: File[];
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = `${environment.apiUrl}posts`;


  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // 🔍 Obtener todos los posts
  getAllPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 🔍 Obtener un post con imágenes
  getPostWithImages(postId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${postId}/with-images`);
  }

  // ➕ Crear post (sin imágenes aún)
  createPost(post: Post): Observable<any> {
    const formData = new FormData();
    formData.append('title', post.title);
    if (post.content) formData.append('content', post.content);
    if (post.category_id !== undefined) formData.append('category_id', post.category_id.toString());

    return this.http.post(this.apiUrl, formData);
  }

  // 📸 Subir imágenes a un post
  uploadImages(postId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    images.forEach((file) => {
      formData.append('image', file);
    });

    return this.http.post(`${this.apiUrl}/${postId}/images`, formData);
  }

updatePost(id: number, post: Post): Observable<any> {
  const formData = new FormData();

  if (post.title) formData.append('title', post.title);
  if (post.content) formData.append('content', post.content);
  if (post.category_id != null) formData.append('category_id', post.category_id.toString());

  formData.append('_method', 'PUT'); // Para Laravel

  return this.http.post(`${this.apiUrl}/${id}`, formData);
}

  // Reemplazar todas las imágenes de un post
updateImages(postId: number, image: File) {
  const formData = new FormData();
  formData.append('image', image);

  return this.http.post(`${this.apiUrl}/${postId}/updateImages`, formData);
}


  // 🗑️ Eliminar un post
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🗑️ Eliminar una imagen por ID
  deleteImage(imageId: number): Observable<any> {
    return this.http.delete(`http://localhost:8000/api/images/${imageId}`);
  }

}
