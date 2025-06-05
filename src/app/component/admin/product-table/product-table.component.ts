import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CategoriesService } from '../../../services/categories.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
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
  }
  
  cancelEdit() {
    this.isEditing = false;
    this.productToEdit = null;
  }

  updateProduct() {
    if (this.productToEdit) {
      this.clearAlerts();
      this.productService.updateProduct(this.productToEdit.id, this.productToEdit).subscribe({
        next: (response) => {
          this.successMessage = 'Producto actualizado exitosamente';
          this.setAlertTimeout('success');
          this.loadProducts();
          this.isEditing = false;
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.errorMessage = 'Error al actualizar el producto';
          this.setAlertTimeout('error');
        }
      });
    }
  }

onImageChange( event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Inicializar el array si es necesario
      if (!this.productToEdit.images) {
        this.productToEdit.images = [];
      }
      
      // Asegurarse de que el array tenga suficiente longitud
      while (this.productToEdit.images.length <= index) {
        this.productToEdit.images.push(null!);
      }
      
      // Asignar el archivo en la posición correspondiente
      this.productToEdit.images[index] = input.files[0];
    }
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