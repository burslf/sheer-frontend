import { ContextService } from './../services/context.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@aws-amplify/auth';
import { SidenavService } from '../services/sidenav.service';

interface Menu {
  name: string;
  path: string;
  class? : string
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public menu: Menu[] = []
  user:any = null
  isMobile!: boolean;

  constructor(private sidenav: SidenavService, private context:ContextService,private router: Router, private cookie:CookieService) { 
    this.context.isMobile.subscribe(r => this.isMobile = r)
  }

  ngOnInit(): void {
    this.context.user.subscribe(r => {
      this.user = r
    })
    this.context.menu.subscribe(r => {
        this.menu = r
    })
  }

  toggleSidenav() {
    this.sidenav.toggle()
  }
  
  logout() {
      this.context.setSpotify(false)
      this.context.setUser(null)
      this.cookie.delete('user', '/')
      this.cookie.delete('access_token', '/')
      this.cookie.delete('code', '/')
      if(this.isMobile) {
        this.toggleSidenav()
      }
      this.router.navigate(['/login'])
    }

  handleSelect(name:string) {
    this.router.navigate(['/' + name])
  }
}
