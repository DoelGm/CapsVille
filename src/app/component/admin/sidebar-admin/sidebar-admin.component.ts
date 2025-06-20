import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { LogoutService } from '../../../services/logout.service';

@Component({
  selector: 'app-sidebar-admin',
  imports: [],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css'
})
export class SidebarAdminComponent {
  user: any = {};

  constructor (private userService: UserService, private logoutService: LogoutService){}

  ngOnInit() {
  let userId = localStorage.getItem('userId');
  console.log(userId);
  let userIdNumber = userId ? parseInt(userId) : null;
  if (userIdNumber) {

    this.userService.getUser(userIdNumber).subscribe({
      next: (user) => {
        this.user = user;
        sessionStorage.setItem('userData', JSON.stringify(user));
      },
      error: (err) => {/* manejo de errores */}
    });
  }
}

logout() {
  this.logoutService.logoutUser().subscribe({
    next: (res) => {
      console.log('Sesión cerrada', res);
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      sessionStorage.clear();
      this.logoutService.redirectToLogin();
    },
    error: (err) => {
      console.error('Error al cerrar sesión:', err);
      // Aun si hay error, limpiar y redirigir por si el token ya expiró
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      sessionStorage.clear();
      this.logoutService.redirectToLogin();
    }
  });
}

}
