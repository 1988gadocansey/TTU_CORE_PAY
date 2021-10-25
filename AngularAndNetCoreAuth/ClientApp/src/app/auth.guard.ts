import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "angularx-social-login";
import {AccountService} from "./services/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {
  }
  canActivate(): boolean {
    if(this.accountService.loggedIn()){
      return true
    }else{
      //this.router.navigate(["/logout"])
      this.accountService.Logout()
      return false
    }
  }
}
