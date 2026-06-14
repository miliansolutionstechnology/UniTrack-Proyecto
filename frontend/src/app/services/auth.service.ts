import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginCredentials {
  carne: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: 'Estudiante' | 'Catedratico' | string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'authToken';
  private readonly roleKey = 'userRole';
  private readonly authUrl = 'http://localhost:3000/api/auth/login';
  private readonly authState = new BehaviorSubject<boolean>(!!this.getToken());

  isAuthenticated$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.authUrl, credentials)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRole(response.role);
          this.authState.next(true);
        })
      );
  }

  logout(): void {
    this.clearToken();
    this.clearRole();
    this.authState.next(false);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.authState.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  clearRole(): void {
    localStorage.removeItem(this.roleKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
