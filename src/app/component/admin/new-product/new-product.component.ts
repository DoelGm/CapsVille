import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../services/categories.service';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-new-product',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  @ViewChild('mainImageInput') mainImageInput!: ElementRef;
  @ViewChild('secondaryImage1Input') secondaryImage1Input!: ElementRef;
  @ViewChild('secondaryImage2Input') secondaryImage2Input!: ElementRef;

  constructor(private productService: ProductService, private categoriesService: CategoriesService) { }

  product: any = [];
  categories: any = [];

  ngOnInit() {
    this.product.images = [];
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  successMessage: string | null = null;

  imagePreviews: string[] = [];

onImageChange(event: Event, index: number): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    const file = input.files[0];

    this.product.images[index] = file;

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviews[index] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}


  addProduct() {
  this.productService.createProduct(this.product).subscribe(
    (response) => {
      this.successMessage = '¡Producto agregado exitosamente!';
      console.log('Producto agregado:', response.product.id);

      const productId = response.product.id;

     if (this.product.images && this.product.images.length > 0) {
      const validImages = this.product.images.filter((img: File) => img != null);
      if (validImages.length > 0) {
        this.productService.uploadImages(validImages, productId).subscribe(
          (res) => console.log('Imágenes subidas exitosamente:', res),
          (err) => console.error('Error al subir imágenes:', err)
        );
      }
    }

      this.resetForm();
    },
    (error) => {
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
    stock: null,
    images: []
  };

  this.imagePreviews = [];

  // Limpia los inputs de archivo manualmente
  this.mainImageInput.nativeElement.value = '';
  this.secondaryImage1Input.nativeElement.value = '';
  this.secondaryImage2Input.nativeElement.value = '';
}

}
