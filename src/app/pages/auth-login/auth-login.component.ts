import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '@aws-amplify/auth'
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/services/auth.service';
import { ContextService } from 'src/app/services/context.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  host: { 'class': 'auth-login' }
})
export class AuthLoginComponent implements OnInit {
  isLoading = false;

  constructor(private auth: AuthService, private context: ContextService, private router: Router, private cookie: CookieService) { }

  ngOnInit(): void {
    this.isLoading = true
    Auth.currentUserInfo()
      .then(r => {
        if (r) {
          const userEmail = r.attributes.email
          this.auth.getUserByEmail(userEmail)
            .then(user => {
              if (user) {
                this.auth.login(user.client_id)
                  .then(u => {
                    this.context.setUser(u.user)
                    this.isLoading = false
                    this.cookie.set('user', JSON.stringify(u.user), { path: '/' })
                    this.router.navigate(['/'])
                  })
                  .catch(e => console.log(e))
              } else {
                this.auth.signup(userEmail)
                  .then(signedUp => {
                    this.context.setUser(signedUp.user)
                    this.isLoading = false
                    this.cookie.set('user', JSON.stringify(signedUp.user), { path: '/' })
                    this.router.navigate(['/'])
                  })
                  .catch(e => console.log(e))
              }

            })
        }

      })
      .catch(e => console.log(e))
  }

}
