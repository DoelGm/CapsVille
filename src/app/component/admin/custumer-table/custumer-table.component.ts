import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-custumer-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './custumer-table.component.html',
  styleUrls: ['./custumer-table.component.css']
})
export class CustumerTableComponent {
  // Lista de clientes y configuración de paginación
  customers: any[] = [];
  p: number = 1;
  itemsPerPage: number = 10;

  // Variables para edición
  customerToEdit: any = null;
  isEditing: boolean = false;

  // Variables para eliminación
  customerToDelete: any = null;

  // Mensajes de alerta
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private alertTimeout: any;

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  /**
   * Carga la lista de clientes desde el servicio
   */
  loadCustomers(): void {
    this.clearAlerts();
    this.customerService.getCustomers().pipe(
      catchError(error => {
        console.error('Error loading customers:', error);
        this.showError('Error al cargar los clientes');
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe({
      next: (data: any) => {
        this.customers = Array.isArray(data) ? data : [data];
        this.showSuccess('Clientes cargados exitosamente');
      }
    });
  }

  /**
   * Prepara el formulario de edición con los datos del cliente seleccionado
   * @param customer El cliente a editar
   */
  prepareEdit(customer: any): void {
    this.customerToEdit = { ...customer }; // Copia los datos del cliente
    this.isEditing = true;
  }

  /**
   * Cancela la edición y vuelve a la vista de tabla
   */
  cancelEdit(): void {
    this.isEditing = false;
    this.customerToEdit = null;
  }

  /**
   * Actualiza los datos del cliente en el servidor
   */
  updateCustomer(): void {
    if (this.customerToEdit) {
      this.clearAlerts();
      this.customerService.updateCustomer(this.customerToEdit.id, this.customerToEdit)
        .pipe(
          catchError(error => {
            console.error('Error updating customer:', error);
            this.showError('Error al actualizar el cliente');
            return of(null);
          })
        )
        .subscribe({
          next: (response) => {
            if (response) {
              this.showSuccess('Cliente actualizado exitosamente');
              this.loadCustomers();
              this.isEditing = false;
            }
          }
        });
    }
  }

  /**
   * Prepara la eliminación de un cliente mostrando el modal de confirmación
   * @param customer El cliente a eliminar
   */
  prepareDelete(customer: any): void {
    this.customerToDelete = customer;
    // Mostrar modal de confirmación
    const modal = document.getElementById('deleteCustomerModal');
    if (modal) {
      // @ts-ignore
      new bootstrap.Modal(modal).show();
    }
  }

  /**
   * Confirma y ejecuta la eliminación del cliente
   */
  confirmDelete(): void {
    if (this.customerToDelete) {
      this.clearAlerts();
      this.customerService.deleteCustomer(this.customerToDelete.id)
        .pipe(
          catchError(error => {
            console.error('Error deleting customer:', error);
            this.showError(`Error al eliminar el cliente ${this.customerToDelete.name}`);
            return of(false);
          })
        )
        .subscribe({
          next: (success) => {
            if (success) {
              this.showSuccess(`Cliente "${this.customerToDelete.name}" eliminado exitosamente`);
              this.loadCustomers();
            }
          }
        });
    }
  }

  // Métodos auxiliares para manejo de alertas

  /**
   * Muestra un mensaje de éxito
   * @param message El mensaje a mostrar
   */
  private showSuccess(message: string): void {
    this.successMessage = message;
    this.setAlertTimeout('success');
  }

  /**
   * Muestra un mensaje de error
   * @param message El mensaje a mostrar
   */
  private showError(message: string): void {
    this.errorMessage = message;
    this.setAlertTimeout('error');
  }

  /**
   * Cierra una alerta manualmente
   * @param type El tipo de alerta ('success' o 'error')
   */
  dismissAlert(type: 'success' | 'error'): void {
    if (type === 'success') {
      this.successMessage = null;
    } else {
      this.errorMessage = null;
    }
    clearTimeout(this.alertTimeout);
  }

  /**
   * Configura el tiempo de duración de una alerta
   * @param type El tipo de alerta ('success' o 'error')
   */
  private setAlertTimeout(type: 'success' | 'error'): void {
    this.alertTimeout = setTimeout(() => {
      this.dismissAlert(type);
    }, 5000); // 5 segundos
  }

  /**
   * Limpia todas las alertas
   */
  private clearAlerts(): void {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }
}