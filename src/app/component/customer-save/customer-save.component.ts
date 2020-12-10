import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { User } from 'src/app/domain/user';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { environment } from 'src/environments/environment';
import firebaseAuthErrorCode from 'src/util/firebaseAuthErrorCode';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public passwordIcon: IconDefinition = faEye;

  public user: User;
  public customer: Customer;
  customerRol: string;
  customerSub: Subscription;

  public enables: Enable[];

  public showMsg: boolean = false;
  public showEmailSent: boolean = false;
  public messages: string[] = [""];

  public isLoggedRegister: boolean = false;

  constructor(
    public router: Router,
    public customerService: CustomerService,
    public cartService: CartService,
    public enableService: EnableService,
    public authCartService: AuthCartService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.setCustomerRol();
    this.user = new User(
      environment.userCredentials.username,
      environment.userCredentials.password
    );
    this.customer = new Customer("", "", "Y", "", "", "", "C");
    this.isLoggedRegister = this.isSU();
    this.findAllEnable();
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

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  signUp() {
    if (localStorage.getItem('token') != null) {
      this.saveCustomer();
    } else {
      this.createTokenCustomer();
    }
  }

  createTokenCustomer() {
    this.authService.loginUser(this.user).subscribe(data => {
      // Borrar?
      localStorage.setItem("token", data.token);
      this.saveCustomer();
    }, err => {
      console.error(err);
      this.showMsg = true;
      this.messages = ["Ocurrio un error intentando guardar el usuario"];
    });
  }

  saveCustomer(): void {
    this.customerService.save(this.customer).subscribe(ok => {
      this.signUpFirebaseUser();
    }, err => {
      console.error(err);
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

  signUpFirebaseUser() {
    this.messages = [""];
    this.authCartService.createUser(this.customer.email, this.customer.token)
      .then((res) => {
        this.createCart();
        this.sendVerificationMail();
      }).catch((err) => {
        this.showMsg = true;
        this.messages.push(firebaseAuthErrorCode(err.code));
      });
  }

  async sendVerificationMail() {
    this.authCartService.sendEmailVerification()
      .then(() => {
        this.showEmailSent = true;
      });
  }

  createCart(): void {
    this.cartService.createCart(this.customer).subscribe(
      data => {

      }, err => {
        console.error(err);
      }
    );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToCustomerList() {
    this.router.navigate(['/customer-list']);
  }

  isSU(): boolean {
    let type = this.customerRol;
    if (type != null && type == 'A') {
      return true;
    }
    return false;
  }

  togglePassword(): void {
    let passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById('password');
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      this.passwordIcon = faEyeSlash;
    } else {
      passwordInput.type = "password";
      this.passwordIcon = faEye;
    }
  }

}
