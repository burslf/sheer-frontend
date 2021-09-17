import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContextService {
  menu:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
    {name: 'Home', path: '/', class:''},
    {name: 'Playlists', path: '/playlists', class:''},
  ])
  user:BehaviorSubject<any|null> = new BehaviorSubject<any|null>(null);
  isMobile: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  spotifyConnect: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  themeMode: BehaviorSubject<{}> = new BehaviorSubject<{}>({
    light: false,
    dark: true
  })

  constructor(private cookie: CookieService, private router: Router) {
    const access_token = this.cookie.get('access_token')
    const user = this.cookie.get('user')
    if(access_token) {
      this.setSpotify(true)
    }
    if(user) {
      this.setUser(JSON.parse(user))
    }
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        const currentPath = e.url;
        const menu = this.menu.getValue()
        menu.forEach((m:any) => {
          m.class = ''
          if(m.path == currentPath) {
            m.class = 'selected'
          }
        })
        this.menu.next(menu)
      }
    })
  }

  setUser(user:any) {
    this.user.next(user)
  }
  
  setMobile(value: boolean) {
    this.isMobile.next(value);
  }

  setSpotify(value: boolean) {
    this.spotifyConnect.next(value);
  }
  
  setTheme(value:{}) {
    this.themeMode.next(value)
  }
}
