import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import constants from './constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/login', { email, password });
  }
  
  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
