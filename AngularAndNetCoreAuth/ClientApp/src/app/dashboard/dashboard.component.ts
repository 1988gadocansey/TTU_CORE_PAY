import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //create array to store product data from the backend service
  productData: any[] = [];
  Amount:any;
  productForm: FormGroup;

  submitted = false;
  constructor(private productService: ProductService , private formBuilder: FormBuilder,private router: Router) {
    this.productForm = this.formBuilder.group({

      Amount: [{ value: '', disabled: true },[Validators.required]],
      FeeItemId: ['',[Validators.required]],


    })
  }

  getData(): any {
    return this.productService.fetchData().subscribe(data => {
      this.productData = data


    })
  }
  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }
  onChange(){
    //console.log("hello");
  //this.amount.setElementAttribute("disabled",false);
    alert("hello");
    //this.productForm.controls.amount.enabled=false;

  }
  ngOnInit() {
    this.getData()
  }

  getFormData(){
    return JSON.stringify(this.productForm.value);
  }
  submit() {
    this.submitted = true;

    /*const formData: any = new FormData();
    formData.append("name", this.productForm.get('name').value);
    formData.append("avatar", this.productForm.get('avatar').value);

*/
    //this.productService.send(this.getFormData());
    //this.router.navigate(['/checkout']);
    const queryParams = this.productForm.value;
    this.router.navigate(['/checkout'], {
      queryParams
    });
  }
  changeProduct(e) {
    // this.productForm.get('Amount').setValue(e.target.value, {
    //   onlySelf: true
    // })
    this.productForm.controls['Amount'].enable();
  }

}
