import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_URL_FC, API_URL_Order, API_URL_RL, API_URL_UD } from 'src/app/constants/url';
import { AuthService } from './auth.service';

const API_BASES = [API_URL_FC, API_URL_Order, API_URL_RL, API_URL_UD];

/** Adds `Authorization: Bearer <jwt>` to calls to our own APIs and handles 401s. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    const isApi = API_BASES.some(b => req.url.startsWith(b));
    const isAuthCall = req.url.includes('/auth/');

    if (token && isApi && !isAuthCall) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && !isAuthCall && token) {
          // token expired / revoked -> force a fresh login, come back afterwards
          const returnUrl = this.router.url;
          this.auth.logout(false);
          this.router.navigate(['/auth'], { queryParams: { returnUrl } });
        }
        return throwError(() => err);
      })
    );
  }
}
