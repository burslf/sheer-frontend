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
  getUserByEmail(email: string) {
    return this.api.GetUserByEmail(email);
  }

  signup(email: string) {
    return this.api.Signup(email);
  }
  getLyrics(artist:string, title:string) {
    return this.api.GetLyrics(artist, title)
  }

}
