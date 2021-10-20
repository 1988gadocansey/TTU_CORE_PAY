import {Component} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {AccountService} from '../services/account.service';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {StudentService} from "../services/student.service";
import {Observable, Subscription} from "rxjs";
import {TransactionService} from "../services/transaction.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {
  //create array to store user data we need
  transactions: any[] = [];
  studentIndexNo: string
  //For the loader
  public loading = false;

  constructor(private studentService: StudentService, private transactionService: TransactionService) {
  }

  ngOnInit() {
    return this.fetchTransaction()
  }

  fetchTransaction(): Subscription {

    this.studentService.fetchData().subscribe(data => {
      this.studentIndexNo = data.data.Indexno
    })

    return this.transactionService.fetchData(this.studentIndexNo).subscribe(data => {
      this.transactions = data


    })
  }


}
