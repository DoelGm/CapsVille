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

  onImageChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Inicializar el array si es necesario
      if (!this.product.images) {
        this.product.images = [];
      }
      
      // Asegurarse de que el array tenga suficiente longitud
      while (this.product.images.length <= index) {
        this.product.images.push(null!);
      }
      
      // Asignar el archivo en la posición correspondiente
      this.product.images[index] = input.files[0];
    }
  }


  addProduct() {
    this.productService.createProduct(this.product).subscribe(
      (response) => {
        this.successMessage = '¡Producto agregado exitosamente!';
        console.log('Producto agregado:', this.product);
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
      price: null,
      discount: null,
      category_id: null,
      imageUrl: '',
      stock: null
    };
  }
}