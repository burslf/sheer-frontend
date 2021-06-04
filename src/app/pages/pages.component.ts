import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav.service'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  host: {'class' : 'app-pages'}
})
export class PagesComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  isMobile = false
  constructor(private sidenavService: SidenavService, private context:ContextService, public breakpointObserver:BreakpointObserver) {
    this.context.isMobile.subscribe(r => this.isMobile = r)
  }

  ngOnInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
      this.breakpointObserver.observe([
        '(max-width: 500px)'
      ]).subscribe(result => {
        if(result.matches) {
          this.sidenav.mode = 'over'
          this.context.setMobile(true)
          this.sidenavService.close()          
        } else {
          this.sidenav.mode = 'side'
          this.context.setMobile(false)
          this.sidenavService.open()          
        }
      })
    }

}
