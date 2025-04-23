import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-history',
  standalone:true,
  imports: [FormsModule,CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  loadOrderHistory(): void {
    const orderHistory = this.orderService.getOrderHistory();
    this.orderHistory = this.removeDuplicates(orderHistory);
  }

  clearHistory(): void {
    this.orderService.clearOrderHistory();
    this.orderHistory = [];
  }

  removeDuplicates(orderHistory: any[]): any[] {
    const uniqueOrders = [];
    const orderIds = new Set();

    for (const order of orderHistory) {
      if (!orderIds.has(order.orderId)) {
        uniqueOrders.push(order);
        orderIds.add(order.orderId);
      }
    }
    return uniqueOrders;
  }
}
