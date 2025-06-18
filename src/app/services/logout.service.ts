import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private apiUrl = 'http://localhost:8000/api/logout';  // URL de tu API de Laravel

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  logoutUser(): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate que se guarda así en login

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    });

    return this.http.post(this.apiUrl, {}, {
      headers: headers,
      withCredentials: false // true si usas cookies en vez de tokens
    });
  }

  redirectToLogin() {
    console.log('Redirigiendo al login...');
    this.router.navigate(['/login']);
  }
}
