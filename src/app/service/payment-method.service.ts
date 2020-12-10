import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentMethod } from '../domain/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {

  private url = `${environment.apiUrl}/api/paymentMethod/`;

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findAll(isSu: boolean): Observable<any> {
    let headers = this.createTokenHeader();
    let ext = 'findAll';
    if (!isSu) {
      ext = 'findByEnableTrue';
    }
    return this.httpClient.get(this.url + ext, { headers: headers });
  }

  public findById(payId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + payId, { headers: headers });
  }

  public save(paymentMethod: PaymentMethod): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}save`, paymentMethod, { headers: headers });
  }

  public update(paymentMethod: PaymentMethod): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(`${this.url}update`, paymentMethod, { headers: headers });
  }

  public delete(payId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + payId, { headers: headers });
  }
}
