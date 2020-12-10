import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/domain/shopping-cart';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { CartService } from 'src/app/service/cart.service';
import { CountCartService } from 'src/app/service/count-cart.service';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mobileMenuIcon = faBars;
  shoppingCartIcon = faShoppingCart;
  shoppingCart: ShoppingCart;

  countCart: number;
  countSub: Subscription;

  customerRol: string;
  customerSub: Subscription;


  constructor(
    private router: Router,
    private cartService: CartService,
    private countCartService: CountCartService,
    private customerService: CustomerService,
    private authCartService: AuthCartService,
  ) { }

  ngOnInit(): void {
    this.setCustomerRol();
    this.getShoppingCart();
    this.setCountCart();
  }

  ngOnDestroy() {
    this.countSub.unsubscribe();
    this.customerSub.unsubscribe();
  }

  public setCountCart(): void {
    this.countSub = this.countCartService.cartCount$.subscribe(
      count => {
        this.countCart = count;
      }
    );
  }

  public setCustomerRol(): void {
    this.customerSub = this.customerService.customerRol$.subscribe(
      rol => {
        this.customerRol = rol;
      }
    );
  }

  public menuToggle(): void {
    var mobileMenu = document.getElementById("mobile-menu");
    (mobileMenu.style.display === "none") ?
      mobileMenu.style.display = "block" :
      mobileMenu.style.display = "none";
  }

  getShoppingCart() {
    this.cartService.findByCustomerEnable(this.getEmail()).subscribe(data => {
      this.shoppingCart = data;
      this.countCartService.setCartCount(this.shoppingCart.items);
    }, err => {
      console.error(err);
    });
  }

  logOut(): void {
    this.authCartService.singnOut();
    this.router.navigate(['/login']);
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
