import { Component, OnInit } from '@angular/core';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { EnableService } from 'src/app/service/enable.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.css']
})
export class PaymentMethodSaveComponent implements OnInit {

  public paymentMethod: PaymentMethod;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(
    public paymentMethodService: PaymentMethodService,
    public enableService: EnableService,
  ) { }

  ngOnInit(): void {
    this.paymentMethod = new PaymentMethod(null, "Y", "", "");
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    this.messages = [""];
    this.paymentMethodService.save(this.paymentMethod).subscribe(ok => {
      window.history.back();
    }, err => {
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

}
