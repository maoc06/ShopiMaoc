import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Customer } from 'src/app/domain/customer';
import { User } from 'src/app/domain/user';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import firebaseAuthErrorCode from 'src/util/firebaseAuthErrorCode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public passwordIcon: IconDefinition = faEye;

  public user: User;
  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    private customerService: CustomerService,
    public toastr: ToastrService,
    public authCartService: AuthCartService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user = new User("", "");
  }

  signIn() {
    this.messages = [""];
    this.authCartService.signIn(this.user.username, this.user.password)
      .then((res) => {
        if (res.user.emailVerified) {
          this.getUserRol();
        } else {
          this.showErrorToaster('Aún no has verificado el email');
        }
      }).catch((err) => {
        this.showMsg = true;
        this.messages.push(firebaseAuthErrorCode(err.code));
      });
  }

  getUserRol() {
    if (this.checkIfTokenExists()) {
      this.findCustomer();
    } else {
      this.getAuthToken();
    }
  }

  findCustomer(): void {
    let customer: Customer;
    this.customerService.findById(this.user.username).subscribe(data => {
      customer = data;
      if (customer.enable == 'N') {
        this.showErrorToaster('Tú cuenta esta inhabilitada');
      } else {
        this.customerService.setCustomerRol(customer.rol);
        this.router.navigate(['/product-list']);
      }
    }, err => {
      console.error(err);
    });
  }

  checkIfTokenExists(): boolean {
    if (localStorage.getItem('token') != null) {
      return true;
    }
    return false;
  }

  private getAuthToken(): void {
    this.authService.loginUser(
      new User(
        environment.userCredentials.username,
        environment.userCredentials.password
      )).subscribe(
        data => {
          localStorage.setItem("token", data.token);
          this.findCustomer();
        }, err => {
          console.error(err);
        });
  }

  showErrorToaster(msg: string) {
    this.toastr.error(msg);
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
