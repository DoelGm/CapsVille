import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = "http://localhost:8000/api/tickets";

  constructor(private http: HttpClient) {}

  createTicket(products: { id: number, quantity: number }[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, { products }, { headers });
  }
}
