import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-custumer-table',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './custumer-table.component.html',
  styleUrl: './custumer-table.component.css'
})
export class CustumerTableComponent {
  customers: any = [];
  p: number = 1;
  itemsPerPage: number = 14;

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  editCustomer(id: number) {}
  deleteCustomer(id: number) {}
}
