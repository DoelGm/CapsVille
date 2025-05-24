import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product-table',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  p: number = 1;
  itemsPerPage: number = 14;
  products: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
  editProduct(productId: number) {}
  deleteProduct(productId: number){}

}
