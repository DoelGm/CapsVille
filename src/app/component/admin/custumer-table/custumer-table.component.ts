import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custumer-table',
  imports: [CommonModule],
  templateUrl: './custumer-table.component.html',
  styleUrl: './custumer-table.component.css'
})
export class CustumerTableComponent {
  // Sample data for the table
  customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-8765' }
  ];
  editCustomer(id: number) {}
  deleteCustomer(id: number) {}
}
