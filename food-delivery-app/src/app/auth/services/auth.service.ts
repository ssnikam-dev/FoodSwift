import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL_UD } from 'src/app/constants/url';
import { AuthResponse, LoginRequest, RegisterRequest, Role, User } from '../models/auth';

const TOKEN_KEY = 'fd_token';
const USER_KEY = 'fd_user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly base = API_URL_UD + '/auth';
  private userSubject = new BehaviorSubject<User | null>(this.readStoredUser());

  /** Emits the current user (or null when logged out). */
  user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  get user(): User | null { return this.userSubject.value; }
  get token(): string | null { return localStorage.getItem(TOKEN_KEY); }

  isLoggedIn(): boolean {
    const t = this.token;
    if (!t || this.isExpired(t)) {
      if (t) { this.clearSession(); }
      return false;
    }
    return !!this.userSubject.value;
  }

  hasRole(role: Role): boolean { return this.user?.role === role; }

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/login`, body)
      .pipe(tap(res => this.startSession(res)));
  }

  register(body: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.base}/register`, body)
      .pipe(tap(res => this.startSession(res)));
  }

  logout(redirect = true): void {
    this.clearSession();
    if (redirect) { this.router.navigate(['/']); }
  }

  // ---- internals ----
  private startSession(res: AuthResponse): void {
    localStorage.setItem(TOKEN_KEY, res.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this.userSubject.next(res.user);
  }

  private clearSession(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }

  private readStoredUser(): User | null {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      const raw = localStorage.getItem(USER_KEY);
      if (!token || !raw || this.isExpired(token)) { return null; }
      return JSON.parse(raw) as User;
    } catch { return null; }
  }

  /** Reads the `exp` claim of the JWT (seconds since epoch). */
  private isExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      return !!payload.exp && payload.exp * 1000 < Date.now();
    } catch { return true; }
  }
}
