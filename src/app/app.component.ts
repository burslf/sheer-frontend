import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { APIService } from './API.service';
import { ContextService } from './services/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'app-component' },
})
export class AppComponent implements OnInit {
  title = 'sheer';
  showFiller = true;
  constructor(
    private cookie: CookieService,
    private api: APIService,
    private context: ContextService
  ) {}

  ngOnInit() {

  }
}
