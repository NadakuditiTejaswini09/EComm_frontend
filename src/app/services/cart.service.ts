import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { CartItem } from '../pages/cart-page/cartitem.model';
import { AuthService } from './auth.service';
import { Product } from '../pages/product/product.model';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl='http://localhost:5134/api/CartItem';
  private cart:CartItem[]=[];
 
  constructor(private http:HttpClient ,private authService :AuthService) {
    this.loadCart();
  }
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  private getUserKey(): string{
    const userEmail=this.authService.getEmail();
    return `cart_${userEmail}`;
  }
  addToCart(product: Product) {
    const cartItem: CartItem = {
      cartItemId: this.cart.length + 1, // Example ID generation
      productId: product.id,
      quantity: 1,
      totalPrice: product.price,
      product: product
    };
    this.cart.push(cartItem);
    this.saveCart();
  }
  getCartItems():CartItem[] {
    return this.cart;
  }
  getTotalCost(): number{
    return this.cart.reduce((sum,item)=>sum+item.totalPrice,0);
  }
  updateQuantity(productId: number, quantity: number) {
    const cartItem = this.cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity = quantity;
      if (cartItem.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        cartItem.totalPrice = cartItem.product.price * cartItem.quantity;
      }
      this.saveCart();
    }
  }
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.saveCart();
  }
  clearCart() {
    this.cart = [];
    this.saveCart();
  }
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  private loadCart() {
    const userKey=this.getUserKey();
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }
}
 
 