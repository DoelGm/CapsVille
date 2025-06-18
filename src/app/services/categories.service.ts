import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 private apiUrl = `${environment.apiUrl}/api/categories`;

 constructor( private http: HttpClient) {}
  getAllCategories() {
    return this.http.get(this.apiUrl);
  }
  getCategory(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
