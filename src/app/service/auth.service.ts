import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';
import { User } from '../domain/user';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/login`;

  constructor(
    public httpClient: HttpClient,
    public customerService: CustomerService,
  ) { }

  public loginUser(user: User): Observable<any> {
    return this.httpClient.post(this.url, user);
  }

  public loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  public checkType(): Promise<boolean> {
    let customer: Customer;
    let isSU: boolean;

    return this.customerService.findById(this.getEmail()).toPromise()
      .then(data => {
        customer = data;
        isSU = (customer.rol == 'A');

        if (isSU) {
          return true;
        } else {
          return false;
        }
      });
  }

  public checkSeeShops(emailParam: string): Promise<boolean> {

    let customer: Customer;
    let isSU: boolean;
    let isMyAccount: boolean;

    return this.customerService.findById(this.getEmail()).toPromise()
      .then(data => {
        customer = data;
        isSU = (customer.rol == 'A');
        isMyAccount = JSON.parse(localStorage.getItem('user')).email === emailParam;

        if (isSU) {
          return true;
        } else {
          if (isMyAccount) {
            return true;
          }
          return false;
        }
      });
  }

  public getEmail(): string {
    return JSON.parse(localStorage.getItem('user')).email;
  }
}
