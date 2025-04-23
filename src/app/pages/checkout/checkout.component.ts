import { CommonModule } from '@angular/common';
import { Component ,OnInit } from '@angular/core';
import { FormsModule , NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,FormsModule],
  standalone:true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems:any[]=[];
  totalPrice:number=0;

  constructor(private http: HttpClient, 
    private cartService: CartService, 
    private router: Router , 
    private orderService : OrderService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalPrice = this.cartService.getTotalCost(); 
  }
  onSubmit(checkoutForm: NgForm) {
    const order = {
      userId: 1, // Replace with actual user ID
      totalPrice: this.totalPrice,
      shippingAddress: checkoutForm.value.address,
      paymentMethod: checkoutForm.value.paymentMethod,
      cartItems: this.cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }))
    };
  
    this.orderService.placeOrder(order).subscribe({
      next: response => {
        console.log('Order placed successfully', response);
        alert('Order placed successfully');
        this.cartService.clearCart();
        this.router.navigate(['/products']); // Redirect to products page
        this.storeOrderData(response);
      },
      error: error => {
        console.error('There was an error!', error);
        alert('Failed to place order. Please try again later.');
      }
    });
  }

  storeOrderData(order: any) {
    // Retrieve existing order history from local storage
    const existingOrderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    // Add the new order to the existing order history
    existingOrderHistory.push(order);
    // Store the updated order history back to local storage
    localStorage.setItem('orderHistory', JSON.stringify(existingOrderHistory));
  }
}
