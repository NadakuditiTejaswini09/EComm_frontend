import { Component , OnInit} from '@angular/core';
import { CartItem } from './cartitem.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule,FormsModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;
 
  constructor(private cartService: CartService,private router : Router) {}
  ngOnInit(): void {
    this.cartItems=this.cartService.getCartItems();
    this.totalAmount=this.cartService.getTotalCost();
    //this.updateCart();
  }
  /*updateCart(): void {
    this.cartItems=this.cartService.getCartItems();
    this.totalAmount=this.cartService.getTotalCost();
  }*/
  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId , quantity );
    this.cartItems=this.cartService.getCartItems();
    this.totalAmount=this.cartService.getTotalCost();
    //this.updateCart();
  }
  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount=this.cartService.getTotalCost();
    //this.updateCart();
  }
  placeOrder() : void {
    this.router.navigate(['/checkout']);
  }
}
 