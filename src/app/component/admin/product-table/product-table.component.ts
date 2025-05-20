import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
 products: any[] = [];
  constructor() {}

  editProduct(productId: number) {}
  deleteProduct(productId: number){}

}
