import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private router:Router, private cookie: CookieService ) {

    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
 
        //check some condition  
        if (!this.cookie.get('user'))  {
            this.router.navigate(['/login'])
            //redirect to login/home page etc
            //return false to cancel the navigation
            return false;
        } 
        return true;
    }
 
}
 