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
  public menu: Menu[] = [
    {name: 'Home', path: '', class:'selected'},
    {name: 'Earners', path: 'earners', class:''},
    {name: 'Login', path: 'login', class:''},
  ]
  isMobile!: boolean;

  constructor(private sidenav: SidenavService, private context:ContextService,private router: Router, private cookie:CookieService) { 
    this.context.isMobile.subscribe(r => this.isMobile = r)
  }

  ngOnInit(): void {
  }

  toggleSidenav() {
    this.sidenav.toggle()
  }
  
  logout() {
    Auth.signOut()
    .then(r => {
      this.cookie.delete('token')
      this.router.navigate(['/login'])
      this.toggleSidenav()
    })
    .catch(e => console.log(e))
  }

  handleSelect(name:any) {
    if(this.isMobile) {
      this.sidenav.toggle()
    }
    this.menu.forEach(m => m.class = '')
    this.menu.forEach(m => {
      if(m.name == name.name) {
        m.class = 'selected'
      }
    })
    this.router.navigate(['/'+name.path])
  }
}
