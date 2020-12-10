import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = `${environment.apiUrl}/api/product/`;

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

  public findById(proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findById/' + proId, { headers: headers });
  }

  public findByQuery(query: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'search/' + query, { headers: headers });
  }

  public findByMaxPrice(maxPrice: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'maxPrice/' + maxPrice, { headers: headers });
  }

  public save(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(`${this.url}save`, product, { headers: headers });
  }

  public update(product: Product): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.put(`${this.url}update`, product, { headers: headers });
  }

  public delete(proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.delete(this.url + 'delete/' + proId, { headers: headers });
  }
}
