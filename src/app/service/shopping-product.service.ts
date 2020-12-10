import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingProduct } from '../domain/shopping-product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingProductService {

  private url = `${environment.apiUrl}/api/shopping-product/`;

  constructor(public httpClient: HttpClient) { }

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  public findById(shprId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + shprId, { headers: headers });
  }

  public findByCarId(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(`${this.url}findByCarId/${carId}`, { headers: headers });
  }

  public findByProId(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(`${this.url}findByProId/${carId}/${proId}`, { headers: headers });
  }


  public save(shoppingProduct: ShoppingProduct): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}save`, shoppingProduct, { headers: headers });
  }

  public update(shoppingProduct: ShoppingProduct): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(`${this.url}update`, shoppingProduct, { headers: headers });
  }

  public delete(shprId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(
      this.url + 'delete/' + shprId,
      { headers: headers, responseType: 'text' }
    );
  }

}
