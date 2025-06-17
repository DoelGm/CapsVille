import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoriesService } from '../../../services/categories.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule, QuillModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  newImages: { [productId: number]: { [index: number]: File } } = {};
  imagePreviews: { [productId: number]: { [index: number]: string } } = {};

  p: number = 1;
  itemsPerPage: number = 10;
  products: any[] = [];
  categories: any[] = [];
  productToEdit: any = null;
  productToDelete: any = null;
  isEditing: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  private alertTimeout: any;

  constructor(
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.clearAlerts();
    this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.successMessage = 'Productos cargados exitosamente';
        this.setAlertTimeout('success');
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.errorMessage = 'Error al cargar los productos';
        this.setAlertTimeout('error');
      }
    });
  }

  loadCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (error) => {
        console.error('Error loading categories', error);
        this.errorMessage = 'Error al cargar las categorías';
        this.setAlertTimeout('error');
      }
    });
  }

 prepareEdit(product: any) {
  this.productToEdit = { ...product };
  this.isEditing = true;

  // Inicializar objetos para las imágenes
  if (!this.imagePreviews[this.productToEdit.id]) {
    this.imagePreviews[this.productToEdit.id] = {};
  }

  if (!this.newImages[this.productToEdit.id]) {
    this.newImages[this.productToEdit.id] = {};
  }
}

cancelEdit() {
  this.isEditing = false;
  this.productToEdit = null;
}


  onImageChange(event: any, index: number, productId: number) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      if (!this.imagePreviews[productId]) {
        this.imagePreviews[productId] = {};
      }
      this.imagePreviews[productId][index] = reader.result as string;

      if (!this.newImages[productId]) {
        this.newImages[productId] = {};
      }
      this.newImages[productId][index] = file;
    };
    reader.readAsDataURL(file);
  }
}

updateProduct() {
  const formData = new FormData();
  const id = this.productToEdit.id;

  formData.append('name', this.productToEdit.name);
  formData.append('description', this.productToEdit.description);
  formData.append('category_id', this.productToEdit.category_id);
  formData.append('stock', this.productToEdit.stock.toString());
  formData.append('price', this.productToEdit.price.toString());
  formData.append('discount', this.productToEdit.discount?.toString() || '');

  if (this.newImages[id]) {
    Object.keys(this.newImages[id]).forEach((index) => {
      formData.append(`images[${index}]`, this.newImages[id][+index]);
    });
  }

  this.productService.updateProduct(id, formData).subscribe({
    next: () => {
      this.successMessage = 'Producto actualizado exitosamente';
      this.setAlertTimeout('success');
      this.productService.updateProductImages(id, Object.entries(this.newImages[id] || {}).map(([index, file]) => ({ index: +index, file }))).subscribe({
        next: () => {
          console.log('Imágenes actualizadas exitosamente');
        },
        error: (error) => {
          console.error('Error al actualizar imágenes', error);
          this.errorMessage = 'Error al actualizar las imágenes del producto';
          this.setAlertTimeout('error');
        }
      });
      this.isEditing = false;
      this.loadProducts();
    },
    error: (error) => {
      console.error('Error al actualizar producto', error);
      this.errorMessage = 'Error al actualizar el producto';
      this.setAlertTimeout('error');
    }
  });
}


  calculateDiscount(price: number, discountPrice: number): number {
    if (!discountPrice || discountPrice <= price) return 0;
    return Math.round(((discountPrice - price) / price) * 100);
  }

  prepareDelete(product: any) {
    this.productToDelete = product;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      // @ts-ignore
      new bootstrap.Modal(modal).show();
    }
  }

  confirmDelete() {
    if (this.productToDelete) {
      this.clearAlerts();
      this.productService.deleteProductImage(this.productToDelete.id).subscribe({
        next: () => {
          console.log('Imagen del producto eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error al eliminar imagen del producto', error);
          this.errorMessage = 'Error al eliminar la imagen del producto';
          this.setAlertTimeout('error');
        }
      });
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: (response) => {
          this.successMessage = 'Producto eliminado exitosamente';
          this.setAlertTimeout('success');
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.errorMessage = 'Error al eliminar el producto';
          this.setAlertTimeout('error');
        }
      });
    }
  }

  dismissAlert(type: 'success' | 'error') {
    if (type === 'success') {
      this.successMessage = null;
    } else {
      this.errorMessage = null;
    }
    clearTimeout(this.alertTimeout);
  }

  private setAlertTimeout(type: 'success' | 'error') {
    this.alertTimeout = setTimeout(() => {
      this.dismissAlert(type);
    }, 5000);
  }

  private clearAlerts() {
    this.successMessage = null;
    this.errorMessage = null;
    clearTimeout(this.alertTimeout);
  }
}
