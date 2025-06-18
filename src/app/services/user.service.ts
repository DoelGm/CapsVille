import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }
  getUser(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
  createUser(data: any) {
    return this.http.post<any>(this.apiUrl, data, { headers: this.headers });
  }
  updateUser(id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data, { headers: this.headers });
  }
  deleteUser(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
