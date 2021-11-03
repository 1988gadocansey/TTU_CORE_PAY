import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription, throwError} from "rxjs";
import {StudentService} from "../services/student.service";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup
  subscription: Subscription
  productData: any
  submitted = false
  indexno: string
  studentName: string
  email: string
  phone: string
  level: string
  PaymentType: string
  productName: Subscription
  amount: number
  status: string
  paymentProductSelect: string
  //For the loader
  public loading = false;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private studentService: StudentService, private readonly activatedRoute: ActivatedRoute, private httpClient: HttpClient) {
    this.subscription = productService.subj$.subscribe(value => {
      //console.log(typeof(value.data))
      this.productData = value
    })
    this.checkoutForm = this.formBuilder.group({

      Amount: ['',],
      Name: [''],
      Email: [''],
      IndexNo: [''],
      FeeItemId: [''],
      Merchant: [''],
      Phone: ['', [Validators.required]],
      Level: [''],
      PaymentMethod: ['', [Validators.required]],


    })
  }

  getData(): any {
    return this.studentService.fetchData().subscribe(data => {
      let students = JSON.parse(data)

      this.indexno = students.INDEXNO
      this.email = students.EMAIL
      this.studentName = students.NAME
      this.phone = students.TELEPHONENO
      this.level = students.LEVEL
      //this.loading = false;
    })
  }
   getTransactionId(): string{
    return Math.random().toString(36).substring(1);
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((query) => {
      this.paymentProductSelect = query.FeeItemId
      this.productName = this.productService.findById(query.FeeItemId).subscribe(data => {
        this.productName = data
        //this.loading = true;
      });
      this.amount = query.Amount;
    });
    this.getData()
  }

  submit() {
    this.loading = true;
    const headers = {'content-type': 'application/json'}


    const body = {
      'WalletType': this.checkoutForm.get('PaymentMethod').value,
      'Amount': this.checkoutForm.get('Amount').value,
      'Phone': this.checkoutForm.get('Phone').value,
      'Indexno': this.checkoutForm.get('IndexNo').value,
      'Name': this.checkoutForm.get('Name').value,
      'Email': this.checkoutForm.get('Email').value,
      'Level': this.checkoutForm.get('Level').value,
      'ProductId': this.paymentProductSelect,
      'TransactionId':this.getTransactionId(),
      'Bank': '0271900010010',
      'AcademicYear': '2021/2022',

    }
    console.log("transaction ID is " +this.getTransactionId());

    this.httpClient.post('api/Transaction', body, {'headers': headers}).subscribe(
      (response) => this.status = response.toString(),
      (error) => this.status = error.toString(),

    )
    //window.location.reload()
    // window.location.href="/transactions";
    this.loading = false;
  }


}
