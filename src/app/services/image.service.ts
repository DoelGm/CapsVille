import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  private apiUrl = 'http://127.0.0.1:8000/api/upload'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las imágenes
  getImages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener una imagen por ID
  getImageById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // Subir una nueva imagen
  uploadImage(imageData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, imageData, { headers: this.headers });
  }
  // Actualizar una imagen existente
  updateImage(id: number, imageData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, imageData);
  }
  // Eliminar una imagen
  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
