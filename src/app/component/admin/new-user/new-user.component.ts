import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {

  newUser: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;
  constructor(private userService: UserService) { }
  ngOnInit() {}

  addNewUser() {
    if(this.newUser.password === this.newUser.confirmPassword) {
      this.userService.createUser(this.newUser).subscribe(response => {
        console.log('Usuario agregado:', response);
        this.successMessage = 'Usuario agregado exitosamente';
        this.resetForm();
      });
    } else {
      this.errorMessage = 'Las contraseñas no coinciden';
    }
  }
  resetForm() {
    this.newUser = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: ''
    };
  }

}
