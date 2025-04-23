import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'http://localhost:5134/api/Order/checkout';

  constructor(private http: HttpClient) { }
  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order);
  }
}
