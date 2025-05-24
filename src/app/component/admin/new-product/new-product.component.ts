import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  constructor(private productService: ProductService, private categoriesService: CategoriesService) { }

  product: any = {};
  categories: any = [];

  ngOnInit() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  successMessage: string | null = null;

  addProduct() {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        this.successMessage = '¡Producto agregado exitosamente!';
        this.resetForm();
      },
      (error) => {
        console.log(this.product);
        console.error('Error al agregar el producto', error);
      }
    );
  }

  resetForm() {
    this.product = {
      name: '',
      description: '',
      price: 0,
      discount: 0,
      category_id: 0,
      imageUrl: '',
      stock: 0
    };
  }
}