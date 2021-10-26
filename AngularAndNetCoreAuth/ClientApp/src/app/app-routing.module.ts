import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "./layouts/app-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard";
import {TransactionComponent} from "./transaction/transaction.component";
import {CheckoutComponent} from "./checkout/checkout.component";
const routes: Routes = [
  { path: 'login', component: HomeComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: '',
    component: AppLayoutComponent,
    children: [

      { path: 'dashboard', component: DashboardComponent, pathMatch: 'full',canActivate:[AuthGuard] },
      { path: 'transactions', component: TransactionComponent, pathMatch: 'full',canActivate:[AuthGuard] },
      { path: 'Sign Out', component: HomeComponent, pathMatch: 'full' ,canActivate:[AuthGuard]},
      { path: 'checkout', component: CheckoutComponent, pathMatch: 'full',canActivate:[AuthGuard] }

    ],
  },
  // login route

  // redirect to home

];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
