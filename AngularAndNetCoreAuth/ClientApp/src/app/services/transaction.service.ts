import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  transactions: any=[]
  constructor(private  httpClient: HttpClient) { }

  fetchData(IndexNo:string): Observable<any> {
    //console.log("transactions are " + `https://localhost:5001/api/Transaction/Find?indexno=${IndexNo}`)
    return this.httpClient.get(`api/Transaction/Find?indexno=${IndexNo}`).pipe(
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

}
