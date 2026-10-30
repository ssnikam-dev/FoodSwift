import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user$ = this.auth.user$;
  count$ = this.cart.count$;
  menuOpen = false;
  query = '';

  constructor(private auth: AuthService, private cart: CartService, private router: Router, private host: ElementRef) { }

  search(): void {
    this.router.navigate(['/restaurant-listing'], { queryParams: { q: this.query.trim() || null } });
  }

  initial(name?: string): string { return (name || '?').trim().charAt(0).toUpperCase(); }

  logout(): void { this.menuOpen = false; this.auth.logout(); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: Event): void {
    if (!this.host.nativeElement.contains(e.target)) { this.menuOpen = false; }
  }
}
