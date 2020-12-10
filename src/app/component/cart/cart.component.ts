import { QueryList, ElementRef, ViewChildren } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreditCard } from 'src/app/domain/credit-card';
import { Customer } from 'src/app/domain/customer';
import { PaymentMethod } from 'src/app/domain/payment-method';
import { ProductCart } from 'src/app/domain/product-cart';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { ShoppingProduct } from 'src/app/domain/shopping-product';
import { CartService } from 'src/app/service/cart.service';
import { CountCartService } from 'src/app/service/count-cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';
import { cc_format, cc_expiry } from 'src/util/formarCreditCard';
// import { ShoppingProductService } from 'src/app/service/shopping-product.service';
import formatDate from 'src/util/formatDate';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @ViewChildren("paymentMethodElement") private paymentMethodElements: QueryList<ElementRef>;

  // public currentActiveCart: ShoppingCart;
  cartPay: ShoppingCart;
  cartPaySub: Subscription;


  customer: Customer;
  customerRol: string;
  customerSub: Subscription;

  shoppingCart: ShoppingCart;
  items: ShoppingProduct[];
  paymentMethods: PaymentMethod[];
  paymentMethodSelected: string;
  precioItems: number;
  total: number;
  gastosEnvio: number = 10000;

  creditCard: CreditCard;

  paymentSuccessful: boolean = false;
  paymentFailure: boolean = false;



  constructor(
    private shoppingCartService: ShoppingCartService,
    // private shoppingProductService: ShoppingProductService,
    private customerService: CustomerService,
    private paymentMethodService: PaymentMethodService,
    private countCartService: CountCartService,
    private cartService: CartService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.creditCard = new CreditCard('', '', null);

    this.setCustomerRol();
    this.setCartPay();
    this.findPaymentMethods();
    // this.findShoppingCart();
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.findShoppingCart();
  }

  public setCustomerRol(): void {
    this.customerSub = this.customerService.customerRol$.subscribe(
      rol => {
        this.customerRol = rol;
      }
    );
  }

  public setCartPay(): void {
    this.cartPaySub = this.shoppingCartService.cartPay$.subscribe(
      cart => {
        this.cartPay = cart;
      }
    );
  }

  // getCurrentActiveShoppingCart(): void {
  //   this.shoppingCartService.findByCustomerEnable(this.getEmail()).subscribe(
  //     data => {
  //       this.currentActiveCart = data;
  //     }, err => {
  //       console.error(err);
  //     }
  //   );
  // }

  realizarPago(): void {
    if (this.items.length > 0) {
      if (this.shoppingCart.payId != null) {
        if (this.creditCard.cardNumber !== '' && this.creditCard.cardNumber != null) {
          let success: boolean = (Math.random() <= 0.5);
          if (success) {
            this.paymentSuccessful = true;
            this.paymentFailure = false;
            this.successfulPaymentAction();
          } else {
            this.paymentSuccessful = false;
            this.paymentFailure = true;
          }
        } else {
          this.showWarningToaster('La información de la tarjeta esta vacía');
        }
      } else {
        this.showWarningToaster('Seleccione un metodo de pago');
      }
    } else {
      this.showWarningToaster('No hay elementos en el carrito');
    }
  }

  updatePaymentMethod(payId: number): void {
    this.shoppingCart.payId = payId;
    this.shoppingCartService.update(this.shoppingCart).subscribe(
      data => {
        this.shoppingCart = data;
        this.shoppingCartService.setCart(this.shoppingCart);
        // this.ngAfterViewInit();
        // window.location.reload();
        // this.findPaymentMethods();
        // this.findShoppingCart();
      }, err => {
        console.error(err);
      });
  }

  public addProduct(proId: string): void {
    let productCart: ProductCart = new ProductCart(this.shoppingCart.carId, proId, 1);
    this.cartService.addProduct(productCart).subscribe(
      ok => {
        this.countCartService.setCartCount(this.shoppingCart.items + 1);
        this.findShoppingCart();
      },
      err => {
        console.error(err);
      });
  }

  public removeProduct(proId: string): void {
    this.cartService.removeProduct(this.shoppingCart.carId, proId).subscribe(
      ok => {
        this.countCartService.setCartCount(this.shoppingCart.items - 1);
        this.findShoppingCart();
      },
      err => {
        console.error(err);
      });
  }

  public removeAllProduct(proId: string, quantity: number): void {
    this.cartService.removeProduct(this.shoppingCart.carId, proId, quantity).subscribe(
      ok => {
        this.countCartService.setCartCount(this.shoppingCart.items - quantity);
        this.findShoppingCart();
      },
      err => {
        console.error(err);
      });
  }

  public cleanCart(): void {
    this.cartService.clearCart(this.shoppingCart.carId).subscribe(
      ok => {
        this.countCartService.setCartCount(0);
        this.findShoppingCart();
      }, err => {
        this.showWarningToaster(err.error.error[0]);
      }
    );
  }

  findShoppingCart(): void {
    this.cartService.findByCustomerEnable(this.getEmail()).subscribe(data => {
      this.shoppingCart = data;
      this.cartPay = data;
      this.findCustomerOwnShoppingCart();
      this.findShoppingProducts(this.cartPay.carId);
      this.setPaymentMethod(this.cartPay.payId);
    }, err => {
      console.error(err);
    });
  }

  findCustomerOwnShoppingCart(): void {
    this.customerService.findById(this.getEmail()).subscribe(data => {
      this.customer = data;
    }, err => {
      console.error(err);
    });
  }

  findShoppingProducts(carId: number): void {
    this.cartService.findShoppingProducts(carId).subscribe(
      data => {
        this.items = data;
        this.precioItems = this.shoppingCart.total;
        this.total = this.precioItems + this.gastosEnvio;
      }, err => {
        console.error(err);
      }
    );
  }

  findPaymentMethods(): void {
    // traer los payment methods habilitados
    this.paymentMethodService.findAll(this.isSU()).subscribe(data => {
      // console.log(data);
      this.paymentMethods = data;
    }, err => {
      console.error(err);
    });
  }

  setPaymentMethod(payId: number): void {
    this.paymentMethodElements.changes.subscribe(() => {
      if (payId === 1) {
        document.getElementById('VISA').setAttribute("style", "filter: grayscale(0%);");
        this.paymentMethodSelected = "Visa";
      } else if (payId === 2) {
        document.getElementById('MASTER CARD').setAttribute("style", "filter: grayscale(0%);");
        this.paymentMethodSelected = "Master Card";
      } else if (payId === 3) {
        document.getElementById('AMERICAN EXPRESS').setAttribute("style", "filter: grayscale(0%);");
        this.paymentMethodSelected = "American Express";
      } else if (payId === 4) {
        document.getElementById('PAYPAL').setAttribute("style", "filter: grayscale(0%);");
        this.paymentMethodSelected = "PayPal";
      }
      // this.ngAfterViewInit();
    });
  }

  successfulPaymentAction(): void {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    this.shoppingCart.enable = 'N';
    this.shoppingCart.address = this.customer.address;
    this.shoppingCart.date = formatDate(today);
    this.shoppingCart.cardNumber = this.creditCard.cardNumber;

    this.shoppingCartService.update(this.shoppingCart).subscribe(
      ok => {
        this.createCart();
      }, err => {
        console.error(err);
      }
    );
  }

  createCart(): void {
    this.cartService.createCart(this.customer).subscribe(
      data => {
      }, err => {
        console.error(err);
      }
    );
  }

  closeSuccessPayment(): void {
    this.paymentSuccessful = false;
    window.location.reload();
  }

  closeFailurePayment(): void {
    this.paymentFailure = false;
  }

  showWarningToaster(msg: string) {
    this.toastr.warning(msg);
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

  public formatCardNumber(event: string): void {
    this.creditCard.cardNumber = cc_format(event);
  }

  public formatCardExpiry(event: string): void {
    // console.log('event', event);
    // console.log('format', cc_expiry(event));
    // this.creditCard.expiry = cc_expiry(event);
  }
}
