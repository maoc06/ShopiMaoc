import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public email: string;
  public customer: Customer;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[];

  constructor(
    public router: Router,
    public activetedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activetedRoute.params['_value'];
    this.email = params.email;
    this.findById();
    this.findAllEnable();
  }

  public findById(): void {
    this.customerService.findById(this.email).subscribe(data => {
      this.customer = data;
    })
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public update(): void {
    this.messages = [""];
    this.customerService.update(this.customer).subscribe(ok => {
      // this.showMsg = true;
      // this.messages[0] = "El customer se modifico con exito";
      window.history.back();
    }, err => {
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

  public delete(): void {
    this.messages = [""];
    this.customerService.delete(this.customer.email).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se borro con exito";
    }, err => {
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

}
