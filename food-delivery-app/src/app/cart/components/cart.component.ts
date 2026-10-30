import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FoodItem } from 'src/app/Shared/models/FoodItem';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart$ = this.cart.cart$;
  total$ = this.cart.total$;

  constructor(public cart: CartService, public auth: AuthService, private router: Router) { }

  inc(item: FoodItem, restaurant: any): void { this.cart.add(restaurant, item); }
  dec(item: FoodItem): void { this.cart.decrement(item); }
  remove(item: FoodItem): void { this.cart.remove(item); }
  trackById(_: number, i: FoodItem) { return i.id; }

  /** The auth guard on /orderSummary sends guests to login/register first. */
  checkout(): void { this.router.navigate(['/orderSummary']); }
}
