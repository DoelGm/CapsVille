import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private apiUrl = 'http://127.0.0.1:8000/api/posts';

  constructor(private http: HttpClient) {}

  // ✅ Devuelve un Observable de arreglo de posts
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

getPostsImgs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getPost(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  updatePost(post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${post.id}`, post);
  }
  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
