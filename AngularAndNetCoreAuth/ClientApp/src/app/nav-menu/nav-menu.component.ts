import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import {AuthService} from "angularx-social-login";


@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }
  // create a field to hold error messages so we can bind it to our template
  resultMessage: string;

  //For the loader
  public loading = false;

  constructor(private authService: AuthService, private accountService: AccountService) {
  }

  userName = "";


  ngOnInit() {
    this.userName = this.accountService.CurrentUsername.value;


  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  signOut(): void {
    this.loading = true;
    this.authService.signOut();
    this.accountService.Logout();
    console.log('User has signed our');
    this.resultMessage = 'User has signed out';
    window.location.reload();
    window.location.href="/";
  }
}
