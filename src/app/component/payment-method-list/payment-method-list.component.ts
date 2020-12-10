import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { CustomerService } from 'src/app/service/customer.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {

  public title: string = "Listado de PaymentMethods";
  public paymentMethods: PaymentMethod[];

  customerRol: string;
  customerSub: Subscription;

  constructor(
    public router: Router,
    public paymentMethodService: PaymentMethodService,
    public customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.setCustomerRol();
    this.findAll();
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }

  public setCustomerRol(): void {
    this.customerSub = this.customerService.customerRol$.subscribe(
      rol => {
        this.customerRol = rol;
      }
    );
  }

  findAll(): void {
    this.paymentMethodService.findAll(this.isSU()).subscribe(data => {
      this.paymentMethods = data;
    }, error => {
      console.error(error);
    });
  }

  public delete(payId: number): void {
    this.paymentMethodService.delete(payId).subscribe(ok => {
      this.findAll();
    }, err => {
      console.error(err);
    });
  }

  public isSU(): boolean {
    if (this.customerRol == 'A') {
      return true;
    }
    return false;
  }

  goToPaymentMethodSave() {
    this.router.navigate(['/payment-method-save']);
  }

}
