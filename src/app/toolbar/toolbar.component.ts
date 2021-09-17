import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ContextService } from '../services/context.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  themeMode:any = { }

  constructor(private sidenavService: SidenavService, private context: ContextService) { 
    this.context.themeMode.subscribe(r => this.themeMode = r)

  }

  ngOnInit(): void {
  }

  setDarkTheme() {
    this.context.setTheme({
      light: false,
      dark: true
    })
    console.log(this.themeMode)
  }

  setLightTheme() {
    this.context.setTheme({
      light: true,
      dark: false
    })
    console.log(this.themeMode)
  }

  toggleSidenav(){
    this.sidenavService.toggle()
  }
}
