import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantService } from '../service/restaurant.service';
import { Restaurant } from '../models/Restaurant';

@Component({
  selector: 'app-restaurant-listing',
  templateUrl: './restaurant-listing.component.html',
  styleUrls: ['./restaurant-listing.component.css']
})
export class RestaurantListingComponent implements OnInit, OnDestroy {

  restaurantList: Restaurant[] = [];
  filtered: Restaurant[] = [];
  query = '';
  loading = true;
  error = '';
  private sub?: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().subscribe({
      next: data => { this.restaurantList = data || []; this.loading = false; this.applyFilter(); },
      error: () => { this.loading = false; this.error = 'Could not load restaurants. Check that the services are running and try again.'; }
    });

    // the header search box and this page's box both drive ?q=
    this.sub = this.route.queryParamMap.subscribe(p => {
      this.query = p.get('q') || '';
      this.applyFilter();
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  onSearch(value: string): void {
    this.router.navigate([], { relativeTo: this.route, queryParams: { q: value.trim() || null }, replaceUrl: true });
  }

  clear(): void { this.onSearch(''); }

  private applyFilter(): void {
    const terms = this.query.toLowerCase().split(/\s+/).filter(Boolean);
    this.filtered = !terms.length ? this.restaurantList : this.restaurantList.filter(r => {
      const hay = `${r.name} ${r.city} ${r.address} ${r.restaurantDescription}`.toLowerCase();
      return terms.every(t => hay.includes(t));
    });
  }

  /** Stable image per restaurant (was random on every change detection). */
  imageFor(r: Restaurant): string {
    return `assets/restaurant-pics/${((r.id - 1) % 8 + 8) % 8 + 1}.jpg`;
  }

  openMenu(id: number): void { this.router.navigate(['/food-catalogue', id]); }
  trackById(_: number, r: Restaurant) { return r.id; }
}
