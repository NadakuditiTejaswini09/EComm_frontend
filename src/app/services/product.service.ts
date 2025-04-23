import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Product } from '../pages/product/product.model';
import { CartItem } from '../pages/cart-page/cartitem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:5134/api/Products'; // Assume you have a REST API here
  private cartApiUrl = 'http://localhost:5134/api/CartItem'; // Assume you have a REST API here

  constructor(private http: HttpClient, 
    private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl, { headers: this.getAuthHeaders()});
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, { headers: this.getAuthHeaders() });
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product, { headers: this.getAuthHeaders() });
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
 addToCart(productId: number, quantity: number): Observable<any> {
    const payload = { productId, quantity };
    //return this.http.post<any>(`${this.cartApiUrl}/add`, { productId, quantity }, { headers: this.getAuthHeaders() });
    return this.http.post<any>(`${this.cartApiUrl}/add`, payload, { headers: this.getAuthHeaders() });
  }
  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.cartApiUrl, { headers: this.getAuthHeaders() });
  }
}
