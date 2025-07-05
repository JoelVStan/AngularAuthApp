import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private http:HttpClient) { }
  baseURL = 'https://localhost:7214/api';

  createUser(formData:any){
    return this.http.post(`${this.baseURL}/signup`, formData)
  }
}
