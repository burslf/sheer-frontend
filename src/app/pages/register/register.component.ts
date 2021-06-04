import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
// import { AuthService } from 'src/app/services/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {'class' : 'app-register'}
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public token: string | null = this.cookieService.get('token');
  public isLoading:boolean = false;
  public errors = {
    message: ''
  }

  constructor(public fb: FormBuilder, private cookieService: CookieService, public router: Router, private _snackBar: MatSnackBar ) {
    this.form = this.fb.group({
      'username' : [null, Validators.compose([Validators.required])],
      'firstName': [null, Validators.compose([Validators.required])],
      'lastName': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])],
      'confirmPassword': [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.form.value.email && this.form.value.password) {
      this.isLoading = true
      // this.auth.signup(this.form.value)
      // .subscribe(
      //   (data: any) => {
      //     console.log(data)
      //     this.cookieService.set('token', data['token'])
      //       this.isLoading = false
      //       this._snackBar.open('Successfully registered !', 'Close', {
      //         duration: 2000
      //       })
      //       this.router.navigate(['/'])
      //   },
      //   err =>{
      //     console.log(err)
      //     this.isLoading = false
      //     this.errors.message = err.error.message
      //   }
      // )
    }else {

    }
  }

  // logout() {
  //   this.cookieService.delete('token')
  //   this.token = null
  // }
}
