import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User {

  constructor(private http: HttpClient, private auth: Auth) { }

  getUserProfile() {
    const reqHeader = new HttpHeaders({'Authorization': `Bearer ${this.auth.getToken()}`});
    return this.http.get(environment.apiBaseUrl + '/userprofile',{headers: reqHeader});
  }
}
