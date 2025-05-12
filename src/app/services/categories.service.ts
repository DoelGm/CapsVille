import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 private apiUrl = 'http://127.0.0.1:8000/api/categories';

 constructor( private http: HttpClient) {}
  getAllCategories() {
    return this.http.get(this.apiUrl);
  }
  getCategory(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
