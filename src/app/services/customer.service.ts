import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
  private apiUrl = 'http://localhost:8000/api/customers';

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }

  getCustomer(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  createCustomer(data: any) {
    return this.http.post(this.apiUrl, data, { headers: this.headers });
  }

  updateCustomer(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.headers });
  }

  deleteCustomer(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
