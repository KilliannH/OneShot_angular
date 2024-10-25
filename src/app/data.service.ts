import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  getProfiles(): Observable<any> {
    return this.http.get('/api/profiles');
  }
  saveProfileById(updatedProfile: any): Observable<any> {
    return this.http.put('/api/profiles/' + updatedProfile.id, updatedProfile);
  }
  newProfile(newProfile: any): Observable<any> {
    return this.http.post('/api/profiles', newProfile);
  }
  removeProfile(profileId: string): Observable<any> {
    return this.http.delete('/api/profiles/' + profileId);
  }

  getUsers(): Observable<any> {
    return this.http.get('/api/users');
  }
  saveUserById(updatedUser: any): Observable<any> {
    return this.http.put('/api/users/' + updatedUser.id, updatedUser);
  }
  removeUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
