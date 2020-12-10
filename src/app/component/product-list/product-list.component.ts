import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/domain/product';
import { ProductCart } from 'src/app/domain/product-cart';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { CartService } from 'src/app/service/cart.service';
import { CountCartService } from 'src/app/service/count-cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public title: string = 'Productos';
  public query: string = "";
  public maxPrice: number = 5000000;
  public products: Product[];
  public productsLength: number = 0;
  public currMaxPrice: number = 5000000;
  public currentActiveCart: ShoppingCart;

  customerRol: string;
  customerSub: Subscription;

  constructor(
    private productService: ProductService,
    private countCartService: CountCartService,
    private cartService: CartService,
    private customerService: CustomerService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.setCustomerRol();
    this.findAll();
    this.getCurrentActiveShoppingCart();
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
    this.productService.findAll(this.isSU()).subscribe(data => {
      this.products = data;
      this.productsLength = this.products.length;
    }, error => {
      console.error(error);
    });
  }

  searchByQuery(query: string): void {
    if (query.length === 0) {
      this.findAll();
    } else {
      this.productService.findByQuery(query).subscribe(data => {
        this.products = data;
        if (!this.isSU()) {
          this.products = this.products.filter(function (product, index, arr) {
            return product.enable === 'Y';
          });
        }
        this.productsLength = this.products.length;
      }, error => {
        console.error(error);
      });
    }
  }

  searchByMaxPrice(maxPrice: number): void {
    this.currMaxPrice = maxPrice;
    this.productService.findByMaxPrice(maxPrice).subscribe(data => {
      this.products = data;
      if (!this.isSU()) {
        this.products = this.products.filter(function (product, index, arr) {
          return product.enable === 'Y';
        });
      }
      this.productsLength = this.products.length;
    }, error => {
      console.error(error);
    });

  }

  public addShoppingProduct(product: Product): void {
    let carId = this.currentActiveCart.carId;
    let productCart: ProductCart = new ProductCart(carId, product.proId, 1);
    this.cartService.addProduct(productCart).subscribe(
      data => {
        this.currentActiveCart.items += 1;
        this.countCartService.setCartCount(this.currentActiveCart.items);
        this.showSuccessToaster(product.name);
      },
      err => {
        console.error(err);
        this.showErrorToaster(product.name);
      });
  }

  getCurrentActiveShoppingCart(): void {
    this.cartService.findByCustomerEnable(this.getEmail()).subscribe(
      data => {
        this.currentActiveCart = data;
      }, err => {
        console.error(err);
      }
    );
  }

  showSuccessToaster(name: string) {
    const options = { positionClass: 'toast-bottom-right' }
    this.toastr.success(`Se agrego ${name}`, '😃', options);
  }
  showErrorToaster(name: string) {
    this.toastr.error(`Se produjo un error. No se pudo agregar el producto ${name} a la canasta`);
  }

  public isSU(): boolean {
    if (this.customerRol == 'A') {
      return true;
    }
    return false;
  }

  public getEmail(): string {
    return JSON.parse(localStorage.getItem('user')).email;
  }

}
