import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  data: any=[]
  private loginStatus = new BehaviorSubject<boolean>(this.getLoginStatus());
  constructor(private  httpClient: HttpClient) { }

  fetchData(): Observable<any> {
   // const email =localStorage.getItem("email");
    const email ="BTPMT20133@ttu.edu.gh";

    return this.httpClient.get(`https://srms.ttuportal.com/api/student/email/${email}`).pipe(
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
  getLoginStatus(): boolean {
    return false;
  }

}
