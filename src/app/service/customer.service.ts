import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';
// import { User } from '../domain/user';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = `${environment.apiUrl}/api/customer/`;
  private token: string;

  private customerRol = new ReplaySubject<string>();
  customerRol$ = this.customerRol.asObservable();

  constructor(
    public httpClient: HttpClient,
    // public authService: AuthService,
  ) { }

  createTokenHeader(): HttpHeaders {
    this.token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': this.token });
    return headers;
  }

  public findAll(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findAll', { headers: headers });
  }

  public findById(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + email, { headers: headers });
  }

  public findByQuery(query: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'search/' + query, { headers: headers });
  }

  public save(customer: Customer): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}save`, customer, { headers: headers });
  }

  public update(customer: Customer): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(`${this.url}update`, customer, { headers: headers });
  }

  public delete(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + email, { headers: headers });
  }

  setCustomerRol(rol: string) {
    this.customerRol.next(rol);
  }

}
