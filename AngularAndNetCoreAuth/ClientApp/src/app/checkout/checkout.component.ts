import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
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
  productData:any
  submitted = false
  indexno: string
  studentName: string
  email: string
  phone: string
  level: string
  PaymentType: string
  productName: Subscription
  amount: number
  status:string
  //For the loader
  public loading = false;

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private studentService: StudentService,private readonly activatedRoute: ActivatedRoute,private httpClient: HttpClient) {
    this.subscription =  productService.subj$.subscribe(value=>{
      //console.log(typeof(value.data))
      this.productData=value
    })
    this.checkoutForm = this.formBuilder.group({

      Amount: [''],
      Name: [''],
      Email: [''],
      IndexNo: [''],
      FeeItemId: [''],
      Merchant: [''],
      Phone: [''],
      Level: [''],
      PaymentMethod: [''],


    })
  }

  getData(): any {
    return this.studentService.fetchData().subscribe(data => {
      this.indexno=data.data.INDEXNO
      this.email=data.data.EMAIL
      this.studentName=data.data.NAME
      this.phone=data.data.TELEPHONENO
      this.level=data.data.LEVEL

    })
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((query) => {
      this.PaymentType=query.FeeItemId
      this.productName = this.productService.findById(query.FeeItemId).subscribe(data=>{
        this.productName=data
      });
      this.amount = query.Amount;
    });
    this.getData()
  }
  submit() {
    this.loading = true;
    const headers =  { 'content-type': 'application/json'}


  const body = { 'WalletType': this.checkoutForm.get('PaymentMethod').value,'Amount': this.checkoutForm.get('Amount').value,'Phone': this.checkoutForm.get('Phone').value,
    'Indexno': this.checkoutForm.get('IndexNo').value,'Name':this.checkoutForm.get('Name').value,
    'Email': this.checkoutForm.get('Email').value,
    'Level': this.checkoutForm.get('Level').value,
    'Bank': '1233',
    'AcademicYear':'2021/2022'
    }
    console.log(this.checkoutForm.value.Name);
    console.log('https://localhost:5001/api/Transaction', body,{'headers':headers})
    this.httpClient.post('https://localhost:5001/api/Transaction', body,{'headers':headers}).subscribe(
      (response) => this.status=response.toString(),
      (error) => this.status=error.toString(),

    )
    window.location.reload()
    window.location.href="/transactions";
  }


}
