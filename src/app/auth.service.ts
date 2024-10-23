import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password }).pipe(
        (response: any) => {
          // Handle successful login here (e.g., save token, redirect)
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
          return response;
      });
  }

  logout() {
    this.loggedIn.next(false);
    // Clear token
    localStorage.removeItem('token');
  }
  
  isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }
}
