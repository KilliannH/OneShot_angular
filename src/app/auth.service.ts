import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.checkToken());
  public isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): any {
    return this.http.post('/api/login', { email, password }).pipe(map((result: any) => {
        console.log(result);
        localStorage.setItem('token', result.token);
          this.loggedIn.next(true)
          return result;
      }));
  }

  logout() {
    this.loggedIn.next(false);
    // Clear token
    localStorage.removeItem('token');
  }
  
  isAuthenticated(): boolean {
    return this.loggedIn.getValue();
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }
}
