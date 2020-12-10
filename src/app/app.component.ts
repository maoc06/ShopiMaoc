import { Component } from '@angular/core';
import { Customer } from './domain/customer';
import { CustomerService } from './service/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cart-front';

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.setCustomerRol();
  }

  public isAuth(): boolean {
    if (localStorage.getItem('user') != null) {
      if (JSON.parse(localStorage.getItem('user')).emailVerified) {
        return true;
      }
    }
    return false;
  }

  public setCustomerRol(): void {
    let customer: Customer;
    let email: string = this.getEmail();
    if (email != null) {
      this.customerService.findById(email).subscribe(
        data => {
          customer = data;
          if (customer.enable != 'N') {
            this.customerService.setCustomerRol(customer.rol);
          }
        }, err => {
          console.error(err);
        });
    }

  }

  public getEmail(): string {
    if (JSON.parse(localStorage.getItem('user')) != null) {
      return JSON.parse(localStorage.getItem('user')).email;
    }
  }

}
