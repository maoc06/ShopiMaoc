import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCart } from '../domain/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private url = `${environment.apiUrl}/api/shopping-cart/`;

  private cartPay = new ReplaySubject<ShoppingCart>();
  cartPay$ = this.cartPay.asObservable();

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findById(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + carId, { headers: headers });
  }

  public update(shoppingCart: ShoppingCart): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(`${this.url}update`, shoppingCart, { headers: headers });
  }

  setCart(cart: ShoppingCart) {
    this.cartPay.next(cart);
    console.groupEnd();
  }
}
