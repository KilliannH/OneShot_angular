import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password }).pipe(
        (response: any) => {
          // Handle successful login here (e.g., save token, redirect)
          localStorage.setItem('token', response.token);
          this._isAuthenticated = true
          return response;
      });
  }
  
  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
