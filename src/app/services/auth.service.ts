import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIService, User } from '../API.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: APIService, private http: HttpClient) {}

  login(clientId: string) {
    return this.api.Login(clientId);
  }

  getUserById(clientId: string) {
    return this.api.GetUserById(clientId);
  }

  signup(clientId: string, email: string) {
    return this.api.Signup(clientId, email);
  }

}
