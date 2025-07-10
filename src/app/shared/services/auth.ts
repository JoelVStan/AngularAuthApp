import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http:HttpClient) { }
  baseURL = 'https://localhost:7214/api';

  createUser(formData:any){
    return this.http.post(`${this.baseURL}/signup`, formData)
  }
  signIn(formData:any){
    return this.http.post(`${this.baseURL}/signin`, formData)
  }
  isLoggedIn() {
    return this.getToken() != null ? true : false;
  }
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  getClaims(){
   return JSON.parse(window.atob(this.getToken()!.split('.')[1]))
  }
}
