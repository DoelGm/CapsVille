import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductService } from '../../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  products: any[] = [];
  allProducts: any[] = [];
  alertMessage: string = '';
  isLoading: boolean = true;

  constructor(private productService: ProductService) {}

ngOnInit() {
  this.productService.getImagesProducts().subscribe({
    next: (data) => {
      this.isLoading = false;
      this.products = data;
      this.allProducts = data;
       this.products.forEach(product => {
        product.image_urls = product.images.map((img: any) => img.cloudinary_url);
        console.log(`Producto ID ${product.id} tiene imágenes:`, product.image_urls);
      });
      console.log('Imágenes cargadas:', this.products)
      if (data.length === 0) {
        this.alertMessage = 'No hay productos disponibles';
      }
    },
    error: (error) => {
      this.isLoading = false;
      this.alertMessage = 'Error al cargar productos';
      console.error('Error al cargar productos:', error);
    }
  });
}


  filterByCategory(categoryId: number) {
    if (categoryId === 0) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(product => product.category_id === categoryId );
    }

    // Mostrar mensaje si no hay resultados
    if (this.products.length === 0) {
      this.alertMessage = 'No hay productos para esta categoría';
    } else {
      this.alertMessage = '';
    }
  }
}
