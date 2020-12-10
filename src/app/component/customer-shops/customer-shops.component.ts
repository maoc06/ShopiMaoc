import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { ShoppingProduct } from 'src/app/domain/shopping-product';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-customer-shops',
  templateUrl: './customer-shops.component.html',
  styleUrls: ['./customer-shops.component.css']
})
export class CustomerShopsComponent implements OnInit {

  public titulo: string = "Compras realizadas por "
  public email: string;
  public customer: Customer;
  public shoppingCarts: ShoppingCart[];


  public paymentMethods: {} = {};
  public products: {} = {};

  constructor(
    public router: Router,
    public activetedRoute: ActivatedRoute,
    public customerService: CustomerService,
    public shoppingCartService: ShoppingCartService,
    public shoppingProductservice: ShoppingProductService,
    public paymentMethodService: PaymentMethodService,
    public cartService: CartService,
  ) { }

  ngOnInit(): void {
    let params = this.activetedRoute.params['_value'];
    this.email = params.email;
    this.findById();
    this.findByCustomerShops();
  }

  public findById(): void {
    this.customerService.findById(this.email).subscribe(data => {
      this.customer = data;
      this.titulo += this.customer.name;
    })
  }

  public async findByCustomerShops(): Promise<void> {
    this.shoppingCarts = await this.cartService.findByCustomerShops(this.email).toPromise();

    for (const cart of this.shoppingCarts) {
      this.setPaymentMethodName(cart.payId, cart.carId);
      this.findShoppingProduct(cart.carId);
    }
  }

  setPaymentMethodName(payId: number, carId: number): void {
    this.paymentMethodService.findById(payId).subscribe(
      data => {
        this.paymentMethods[carId] = data;
      }, err => {
        console.error(err);
      }
    );
  }

  public findShoppingProduct(carId: number): void {
    this.shoppingProductservice.findByCarId(carId).subscribe(
      data => {
        this.products[carId] = data;
      }, err => {
        console.error(err);
      }
    );
  }

}
