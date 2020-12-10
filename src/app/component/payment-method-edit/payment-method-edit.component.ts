import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { EnableService } from 'src/app/service/enable.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public payId: number;
  public paymentMethod: PaymentMethod;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(
    public router: Router,
    public activetedRoute: ActivatedRoute,
    public paymentMethodService: PaymentMethodService,
    public enableService: EnableService,
  ) { }

  ngOnInit(): void {
    let params = this.activetedRoute.params['_value'];
    this.payId = params.payId;
    this.findById();
    this.findAllEnable();
  }

  public findById(): void {
    this.paymentMethodService.findById(this.payId).subscribe(data => {
      this.paymentMethod = data;
    })
  }

  public update(): void {
    this.messages = [""];
    this.paymentMethodService.update(this.paymentMethod).subscribe(ok => {
      window.history.back();
    }, err => {
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

}
