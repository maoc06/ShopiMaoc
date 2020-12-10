import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountCartService {

  private cartCount = new ReplaySubject<number>();
  cartCount$ = this.cartCount.asObservable();

  constructor() { }

  setCartCount(count: number) {
    this.cartCount.next(count);
  }

}
