import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';
import { ProductCart } from '../domain/product-cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = `${environment.apiUrl}/api/cart/`;

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public createCart(customer: Customer): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}createCart`, customer, { headers: headers });
  }

  public addProduct(productCart: ProductCart): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}addProduct`, productCart, { headers: headers });
  }

  public removeProduct(carId: number, proId: string, quantity: number = 1): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(`${this.url}removeProduct/${carId}/${proId}/${quantity}`, { headers: headers });
  }

  public clearCart(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(`${this.url}clearCart/${carId}`, { headers: headers });
  }

  public findShoppingProducts(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(`${this.url}findShoppingProducts/${carId}`, { headers: headers });
  }

  public findByCustomerEnable(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findByCustomerEnable/' + email, { headers: headers });
  }


  public findByCustomerShops(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(`${this.url}findByCustomerShops/${email}`, { headers: headers });
  }

}
