import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./auth.guard"
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import {CheckoutComponent} from "./checkout/checkout.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {TokenInterceptorService} from "./services/token-interceptor.service";
import {ErrorInterceptor} from "./errorInterceptor";
import {AccountService} from "./services/account.service";
import {JwtModule} from "@auth0/angular-jwt";
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutComponent } from './layouts/app-layout.component';
import {HomeComponent} from "./home/home.component";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    //Use your Google App Id here

    provider: new GoogleLoginProvider("47245809803-ve5n9kc64qc4l48uoj7bn592rptg6cdc.apps.googleusercontent.com")
  },
  /*{
    id: FacebookLoginProvider.PROVIDER_ID,
        //Use your FaceBook App Id here
    provider: new FacebookLoginProvider(FaceBookAppId);
  },*/
]);
export function tokenGetter() {
  return localStorage.getItem("token");
}
export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
HomeComponent,

    DashboardComponent,
    CheckoutComponent,
    TransactionComponent,
    AppLayoutComponent

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ///Import SocialLoginModule
    SocialLoginModule.initialize(config),
    ///This isn't necessary. It's a just loader that I like :).
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(192,192,192,0.4)',
      backdropBorderRadius: '4px',
      primaryColour: '#64b2cd',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),

    AppRoutingModule

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
