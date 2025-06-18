import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('${environment.apiUrl}/api/login', credentials).subscribe({
      next: (response) => {
        localStorage.setItem('userId', response.user.id);
        // Guardar el token (opcional: en localStorage o service)
        localStorage.setItem('token', response.token);

        // Redirigir al panel admin
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
