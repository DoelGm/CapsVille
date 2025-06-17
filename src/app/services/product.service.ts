import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  stock?: number;
  category_id: number;
  images?: File[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/products';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/images`);
  }

  createProduct(product: Product): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category_id', product.category_id.toString());

    if (product.description) formData.append('description', product.description);
    if (product.discount !== undefined) formData.append('discount', product.discount.toString());
    if (product.stock !== undefined) formData.append('stock', product.stock.toString());

    return this.http.post(this.apiUrl, formData, { headers: this.getAuthHeaders() });
  }
    uploadImages(images: File[], productId: number) {
      const formData = new FormData();
      images.forEach((file, index) => {
        formData.append(`images[]`, file);
        formData.append(`positions[]`, index.toString());
      });
      return this.http.post(`${this.apiUrl}/${productId}/images`, formData);
    }
    getImagesProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/images`);
  }



updateProduct(id: number, data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/${id}?_method=PUT`, data);
}
updateProductImages(productId: number, images: { index: number, file: File }[]) {
  const formData = new FormData();
  images.forEach(image => {
    formData.append(`images[${image.index}]`, image.file);
  });
  return this.http.post(`${this.apiUrl}/${productId}/updateImages`, formData);
}

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  deleteProductImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/images/${id}`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
  return this.http.get(`${this.apiUrl}/category/${categoryId}`);
  }

}
