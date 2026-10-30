import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Protects routes that need a logged-in user (e.g. /orderSummary).
 * Anonymous users are sent to /auth and returned to the page afterwards.
 * Optional role check: data: { role: 'ADMIN' }
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (!this.auth.isLoggedIn()) {
      return this.router.createUrlTree(['/auth'], { queryParams: { returnUrl: state.url } });
    }
    const role = route.data['role'];
    if (role && !this.auth.hasRole(role)) {
      return this.router.createUrlTree(['/']);
    }
    return true;
  }
}
