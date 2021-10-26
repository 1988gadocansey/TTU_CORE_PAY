import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AccountService} from "./account.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }
  intercept(req,next) {
    let authService=this.injector.get(AccountService)
    let tokenizeRequest=req.clone({
      setHeaders:{
        authorization:`Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizeRequest)
  }
/*  intercept(request: HttpRequest<any>, newRequest: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header to request

    //Get Token data from local storage
    let tokenInfo = JSON.parse(localStorage.getItem('token'));

    if (tokenInfo && tokenInfo.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenInfo.token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      });
    }

    return newRequest.handle(request);
  }*/
}
