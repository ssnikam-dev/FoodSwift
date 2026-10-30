import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { API_URL_UD } from 'src/app/constants/url';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FoodItem } from 'src/app/Shared/models/FoodItem';
import { Restaurant } from 'src/app/Shared/models/Restaurant';

export interface CartState {
  restaurant: Restaurant | null;
  items: FoodItem[];
}

const EMPTY: CartState = { restaurant: null, items: [] };
const GUEST_KEY = 'fd_cart_guest';
const userKey = (id: number) => `fd_cart_user_${id}`;

/**
 * One cart for the whole app.
 *  - Anonymous visitors: cart lives in localStorage (key fd_cart_guest).
 *  - Logged-in users: cart is saved on the server (GET/PUT /cart) and mirrored locally.
 *  - On login, a guest cart is moved to the account; otherwise the saved server cart is loaded.
 */
@Injectable({ providedIn: 'root' })
export class CartService {

  private state$ = new BehaviorSubject<CartState>(this.read(GUEST_KEY));
  cart$ = this.state$.asObservable();
  count$ = this.cart$.pipe(map(c => c.items.reduce((n, i) => n + i.quantity, 0)));
  total$ = this.cart$.pipe(map(c => this.totalOf(c)));

  private currentUserId: number | null = null;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.auth.user$.pipe(map(u => u?.id ?? null), distinctUntilChanged())
      .subscribe(id => this.onUserChanged(id));
  }

  get snapshot(): CartState { return this.state$.value; }
  totalOf(c: CartState): number { return c.items.reduce((s, i) => s + i.quantity * (i.price ?? 0), 0); }
  qty(foodId?: number): number { return this.snapshot.items.find(i => i.id === foodId)?.quantity ?? 0; }

  /** Returns false when the cart holds another restaurant's items (caller decides whether to replace). */
  add(restaurant: Restaurant, food: FoodItem, replace = false): boolean {
    let cart = this.snapshot;
    if (cart.restaurant?.id !== restaurant.id && cart.items.length > 0) {
      if (!replace) { return false; }
      cart = { ...EMPTY };
    }
    const items = cart.items.map(i => ({ ...i }));
    const line = items.find(i => i.id === food.id);
    if (line) { line.quantity++; } else { items.push({ ...food, quantity: 1 }); }
    this.commit({ restaurant, items });
    return true;
  }

  decrement(food: FoodItem): void {
    const items = this.snapshot.items
      .map(i => i.id === food.id ? { ...i, quantity: i.quantity - 1 } : i)
      .filter(i => i.quantity > 0);
    this.commit({ restaurant: items.length ? this.snapshot.restaurant : null, items });
  }

  remove(food: FoodItem): void {
    const items = this.snapshot.items.filter(i => i.id !== food.id);
    this.commit({ restaurant: items.length ? this.snapshot.restaurant : null, items });
  }

  clear(): void { this.commit({ ...EMPTY }); }

  // ---------- internals ----------
  private commit(next: CartState): void {
    this.state$.next(next);
    this.write(this.currentUserId ? userKey(this.currentUserId) : GUEST_KEY, next);
    if (this.currentUserId) { this.pushToServer(next); }
  }

  private onUserChanged(id: number | null): void {
    this.currentUserId = id;

    if (id === null) {                       // logged out -> empty guest cart
      this.state$.next(this.read(GUEST_KEY));
      return;
    }

    const guest = this.read(GUEST_KEY);
    if (guest.items.length > 0) {            // keep what they picked before logging in
      localStorage.removeItem(GUEST_KEY);
      this.commit(guest);
      return;
    }

    this.state$.next(this.read(userKey(id)));  // instant paint from local mirror
    this.fetchFromServer().subscribe({
      next: server => {
        if (this.currentUserId === id && server) {
          this.state$.next(server);
          this.write(userKey(id), server);
        }
      },
      error: () => { /* offline / endpoint missing: keep the local mirror */ }
    });
  }

  private fetchFromServer(): Observable<CartState | null> {
    return this.http.get<CartState | null>(`${API_URL_UD}/cart`).pipe(
      map(c => c && Array.isArray(c.items) ? { restaurant: c.restaurant ?? null, items: c.items } : null)
    );
  }

  private pushToServer(c: CartState): void {
    this.http.put(`${API_URL_UD}/cart`, c).subscribe({ error: e => console.warn('Cart sync failed', e) });
  }

  private read(key: string): CartState {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as CartState : { ...EMPTY };
    } catch { return { ...EMPTY }; }
  }

  private write(key: string, c: CartState): void {
    try { localStorage.setItem(key, JSON.stringify(c)); } catch { /* storage full/blocked */ }
  }
}
