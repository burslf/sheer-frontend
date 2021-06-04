import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {'class' : 'app-component'}
})
export class AppComponent implements OnInit {
  title = 'sheer';
  showFiller = true;
  constructor(private cookie: CookieService) {}
  ngOnInit() {

  }
}
