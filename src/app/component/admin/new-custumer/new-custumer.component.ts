import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';

@Component({
  selector: 'app-new-custumer',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-custumer.component.html',
  styleUrl: './new-custumer.component.css'
})
export class NewCustumerComponent {

  customer: any = {};
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private customerService: CustomerService) {}
  addCustomer() {
    this.customerService.createCustomer(this.customer).subscribe(
      (response) => {
        this.successMessage = 'Cliente agregado exitosamente';
        this.resetForm();
      },
      (error) => {
        this.errorMessage = 'Error al agregar el cliente';
      }
    );
  }

  resetForm() {
    this.customer = {
      name: '',
      phone: '',
      email: '',
    };
  }
}
