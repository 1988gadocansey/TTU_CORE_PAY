import {Component, OnInit} from '@angular/core';
import {AuthService} from 'angularx-social-login';
import {AccountService} from '../services/account.service';
import {FacebookLoginProvider, GoogleLoginProvider} from 'angularx-social-login';
import {StudentService} from "../services/student.service";
import {Observable, Subscription} from "rxjs";
import {TransactionService} from "../services/transaction.service";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html',
})

export class TransactionComponent implements   OnInit{
  //create array to store user data we need
  transactions: any[] = [];
  studentIndexNo: string
  //For the loader
  public loading = false;
  name: string
  constructor(private studentService: StudentService, private transactionService: TransactionService, private  productService: ProductService) {
  }

  ngOnInit() {


    this.fetchTransaction()

  }

  fetchTransaction(): any {
    this.loading = true;
    this.studentService.fetchData().subscribe(data => {
      let students = JSON.parse(data)
      let studentIndexno=students.INDEXNO
      console.log("indexno IS "+ students.INDEXNO)

      return this.transactionService.fetchData(studentIndexno).subscribe(data => {
        this.transactions = data

          this.loading=false




      })
    })
  }

    getProductName(product: string): Subscription{
     return this.productService.getProductName(product);

  }



}
