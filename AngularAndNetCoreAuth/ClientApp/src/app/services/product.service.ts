import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: any=[]
  constructor(private  httpClient: HttpClient) { }

  fetchData(): Observable<any> {
    return this.httpClient.get("https://localhost:5001/api/product").pipe(
      catchError(this.handleError)
    )
  }
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  private sub = new BehaviorSubject("v");
  subj$ = this.sub.asObservable();

  send(value: any) {
    this.sub.next(value);
    console.log(value);
  }

  findById(Id: string): Observable<any> {
    console.log(`https://localhost:5001/api/product/${Id}`)
    return this.httpClient.get(`https://localhost:5001/api/Product/${Id}`).pipe(
      catchError(this.handleError)
    )
  }
}
