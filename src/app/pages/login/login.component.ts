import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from 'src/app/services/auth.service';
import { Auth } from '@aws-amplify/auth'

import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {'class' : 'app-login'}
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public token: string | null = this.cookie.get('token');
  public isLoading:boolean = false;
  public errors = {
    message: ''
  }

  constructor(public fb: FormBuilder, private cookie: CookieService, public router: Router, private _snackBar: MatSnackBar) {
    this.form = this.fb.group({
      'email': [null],
      'password': [null]
    });
  }

  ngOnInit(): void {

  }
  
  onSubmit() {
    this.isLoading = true

  }
  
  loginWithGoogle() {
    Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google})
  }

  logout() {
    this.token = null
    this.cookie.delete('token')
    Auth.signOut()
  }
  // resendConfirmationCode(username) {
  //   return async (username) => {
  //     try {
  //       await Auth.resendSignUp();
  //       console.log('code resent successfully');
  //   } catch (err) {
  //       console.log('error resending code: ', err);
  //   }
  //   }
  // }
}
