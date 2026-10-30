import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../service/order.service';
import { OrderDTO } from '../models/OrderDTO';
import { CartService } from 'src/app/cart/services/cart.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  obj: OrderDTO = { foodItemsList: [] };
  total = 0;
  showDialog = false;
  placing = false;
  error = '';

  constructor(private router: Router, private orderService: OrderService,
              private cart: CartService, private auth: AuthService) { }

  ngOnInit(): void {
    const c = this.cart.snapshot;
    if (!c.items.length) { this.router.navigate(['/cart']); return; }
    this.obj = { foodItemsList: c.items, restaurant: c.restaurant, userId: this.auth.user?.id };
    this.total = this.cart.totalOf(c);
  }

  get auth_name(): string { return this.auth.user?.name || ''; }

  saveOrder(): void {
    this.placing = true;
    this.error = '';
    // userId comes from the logged-in account (the backend should also read it from the JWT)
    this.orderService.saveOrder({ ...this.obj, userId: this.auth.user?.id }).subscribe({
      next: () => { this.placing = false; this.cart.clear(); this.showDialog = true; },
      error: () => { this.placing = false; this.error = 'We could not place your order. Please try again.'; }
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    this.router.navigate(['/']);
  }
}
