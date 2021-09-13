import { ContextService } from 'src/app/services/context.service';
import { APIService } from 'src/app/API.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment'

const redirectUri = environment.api

@Component({
  selector: 'app-auth-close-api',
  templateUrl: './auth-close-api.component.html',
  styleUrls: ['./auth-close-api.component.scss'],
  host: {'class' : 'auth-close-api'}
})
export class AuthCloseAPIComponent implements OnInit {
  isLoading = false;
  constructor(private cookie: CookieService, private api: APIService, private context: ContextService) { }

  ngOnInit(): void {
    this.isLoading = true
    const url = new URLSearchParams(window.location.search);
    const code = url.get('code');
    if (code) {
      this.cookie.set('code', code);
      this.api
      .GetSpotifyAccessToken(code, redirectUri)
      .then((r) => {
        if (r.status && r.status == 200) {
          console.log(r.data)
          this.isLoading = false
          const accessToken = r.data.access_token
          this.cookie.set('access_token', accessToken);
          window.close()
        }
      })
      .catch((err) => console.log(err));
    }
  }

}
