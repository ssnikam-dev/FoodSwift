import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  mode: 'login' | 'register' = 'login';
  name = '';
  email = '';
  password = '';
  loading = false;
  error = '';
  returnUrl = '/';
  fromCheckout = false;

  constructor(private auth: AuthService, private router: Router, route: ActivatedRoute) {
    const q = route.snapshot.queryParamMap;
    this.returnUrl = q.get('returnUrl') || '/';
    this.fromCheckout = this.returnUrl.startsWith('/orderSummary');
    if (q.get('mode') === 'register') { this.mode = 'register'; }
    if (this.auth.isLoggedIn()) { this.router.navigateByUrl(this.returnUrl); }
  }

  setMode(m: 'login' | 'register'): void { this.mode = m; this.error = ''; }

  submit(form: { valid: boolean | null }): void {
    if (!form.valid || this.loading) { return; }
    this.loading = true;
    this.error = '';

    const call = this.mode === 'login'
      ? this.auth.login({ email: this.email.trim(), password: this.password })
      : this.auth.register({ name: this.name.trim(), email: this.email.trim(), password: this.password });

    call.subscribe({
      next: () => { this.loading = false; this.router.navigateByUrl(this.returnUrl); },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this.error = e.status === 401 ? 'Email or password is incorrect.'
          : e.status === 409 ? 'An account with this email already exists. Log in instead.'
          : e.status === 0 ? 'Cannot reach the server. Check that the user service is running.'
          : (e.error?.message || 'Something went wrong. Please try again.');
      }
    });
  }
}
