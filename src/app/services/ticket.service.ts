import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl = `${environment.apiUrl}/tickets`;

  constructor(private http: HttpClient) {}

  createTicket(products: { id: number, quantity: number }[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, { products }, { headers });
  }
}
