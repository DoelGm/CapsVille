import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule], 
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  products: any[] = [];
  allProducts: any[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      this.allProducts = data; 
    });
  }
   filterByCategory(categoryId: number) {
     if (categoryId === 0) {
    // Mostrar todos los productos
    this.products = this.allProducts;
    } else {
    // Filtrar por categoría
    this.products = this.allProducts.filter(product => product.category_id === categoryId);
  }
  }
}
