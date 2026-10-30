import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../service/fooditem.service';
import { FoodCataloguePage } from 'src/app/Shared/models/FoodCataloguePage';
import { FoodItem } from 'src/app/Shared/models/FoodItem';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-food-catalogue',
  templateUrl: './food-catalogue.component.html',
  styleUrls: ['./food-catalogue.component.css']
})
export class FoodCatalogueComponent implements OnInit {

  restaurantId: number;
  foodItemResponse: FoodCataloguePage;
  loading = true;
  error = '';

  search = '';
  vegOnly = false;

  cart$ = this.cart.cart$;
  count$ = this.cart.count$;
  total$ = this.cart.total$;

  constructor(private route: ActivatedRoute, private foodItemService: FoodItemService,
              private router: Router, public cart: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.restaurantId = +params.get('id');
      this.loading = true;
      this.foodItemService.getFoodItemsByRestaurant(this.restaurantId).subscribe({
        next: data => { this.foodItemResponse = data; this.loading = false; },
        error: () => { this.loading = false; this.error = 'Could not load this menu. Please try again.'; }
      });
    });
  }

  isVeg(f: FoodItem): boolean { return !!(f.veg ?? f.isVeg); }

  /** Menu after search + veg filter. */
  get visibleItems(): FoodItem[] {
    const items = this.foodItemResponse?.foodItemsList || [];
    const terms = this.search.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter(f =>
      (!this.vegOnly || this.isVeg(f)) &&
      terms.every(t => `${f.itemName} ${f.itemDescription}`.toLowerCase().includes(t)));
  }

  qty(f: FoodItem): number { return this.cart.qty(f.id); }

  increment(food: FoodItem): void {
    const restaurant = this.foodItemResponse.restaurant;
    if (!this.cart.add(restaurant, food)) {
      const ok = window.confirm('Your cart has items from another restaurant. Start a new cart with this item?');
      if (ok) { this.cart.add(restaurant, food, true); }
    }
  }

  decrement(food: FoodItem): void { this.cart.decrement(food); }

  /** Anonymous users are redirected to login/register by AuthGuard on /orderSummary. */
  onCheckOut(): void { this.router.navigate(['/orderSummary']); }

  trackById(_: number, f: FoodItem) { return f.id; }
}
