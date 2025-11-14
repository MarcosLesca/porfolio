import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthResponse, LoginCredentials, ProfileResponse, ProtectedResponse, RegisterCredentials } from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/api/auth'; 

  constructor(private http: HttpClient, private router: Router) {}

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    );
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profile`);
  }
  
  getProtectedData(): Observable<ProtectedResponse> {
    return this.http.get<ProtectedResponse>(`http://localhost:3000/api/protected`);
  }


  private saveToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
        console.log('Token almacenado en localStorage.');
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
    this.router.navigate(['/login']); 
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); 
  }
  
}
