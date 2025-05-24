import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-navbar-admin',
  imports: [],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {

  user: any = {};

  constructor(private userService: UserService) { }

  // En tu componente
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


}
