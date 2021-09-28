import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //create array to store product data from the backend service
  productData: any[] = [];
  form: FormGroup;

  constructor(private productService: ProductService) {
  }

  getData(): any {
    return this.productService.fetchData().subscribe(data => {
      this.productData = data
    })
  }

  ngOnInit() {
    this.getData()
  }


}
