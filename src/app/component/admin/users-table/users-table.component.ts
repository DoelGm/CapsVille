import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent {
  // Propiedades del componente
  users: any[] = [];
  userToEdit: any = null;
  userToDelete: any = null;
  newPassword: string = '';
  confirmPassword: string = ''; // Variable faltante añadida
  isEditing: boolean = false;
  p: number = 1;
  itemsPerPage: number = 14;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private alertTimeout: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.clearAlerts();
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.successMessage = 'Usuarios cargados exitosamente';
        this.setAlertTimeout('success');
      },
      error: (error) => {
        console.error('Error loading users', error);
        this.errorMessage = 'Error al cargar los usuarios';
        this.setAlertTimeout('error');
      }
    });
  }

  prepareEdit(user: any) {
    this.userToEdit = { ...user };
    this.newPassword = '';
    this.confirmPassword = '';
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.userToEdit = null;
    this.newPassword = '';
    this.confirmPassword = '';
  }

  updateUser() {
    if (this.userToEdit) {
      this.clearAlerts();
      
      // Validación de contraseñas
      if (this.newPassword && this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Las contraseñas no coinciden';
        this.setAlertTimeout('error');
        return;
      }

      // Preparar datos para actualización
      const userData: any = {
        name: this.userToEdit.name,
        email: this.userToEdit.email
      };

      // Solo incluir password si se proporcionó uno nuevo
      if (this.newPassword) {
        userData.password = this.newPassword;
      }

      this.userService.updateUser(this.userToEdit.id, userData).subscribe({
        next: (response) => {
          this.successMessage = 'Usuario actualizado exitosamente';
          this.setAlertTimeout('success');
          this.loadUsers();
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating user', error);
          this.errorMessage = 'Error al actualizar el usuario: ' + (error.error?.message || error.message);
          this.setAlertTimeout('error');
        }
      });
    }
  }

  prepareDelete(user: any) {
    this.userToDelete = user;
    const modal = document.getElementById('deleteUserModal');
    if (modal) {
      // @ts-ignore
      new bootstrap.Modal(modal).show();
    }
  }

  confirmDelete() {
    if (this.userToDelete) {
      this.clearAlerts();
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: (response) => {
          this.successMessage = `Usuario "${this.userToDelete.name}" eliminado exitosamente`;
          this.setAlertTimeout('success');
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user', error);
          this.errorMessage = `Error al eliminar el usuario "${this.userToDelete.name}"`;
          this.setAlertTimeout('error');
        }
      });
    }
  }

  // Métodos auxiliares para manejo de alertas
  dismissAlert(type: 'success' | 'error') {
    if (type === 'success') {
      this.successMessage = null;
    } else {
      this.errorMessage = null;
    }
    clearTimeout(this.alertTimeout);
  }

  private setAlertTimeout(type: 'success' | 'error') {
    this.alertTimeout = setTimeout(() => {
      this.dismissAlert(type);
    }, 5000);
  }

  private clearAlerts() {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }
}