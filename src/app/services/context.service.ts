import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spotifyConnect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private cookie: CookieService) {
    const access_token = this.cookie.get('access_token')
    if(access_token) {
      this.setSpotify(true)
    }
  }
  
  setMobile(value: boolean) {
    this.isMobile.next(value);
  }

  setSpotify(value: boolean) {
    this.spotifyConnect.next(value);
  }
}
