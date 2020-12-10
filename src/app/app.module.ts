import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData, CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { CartComponent } from './component/cart/cart.component';
import { SuccessPaymentComponent } from './component/pasarela-pagos/success-payment/success-payment.component';
import { FailurePaymentComponent } from './component/pasarela-pagos/failure-payment/failure-payment.component';
import { CustomerShopsComponent } from './component/customer-shops/customer-shops.component';

import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCo, 'es-Co');

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductSaveComponent,
    ProductEditComponent,
    PaymentMethodSaveComponent,
    PaymentMethodEditComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    CartComponent,
    SuccessPaymentComponent,
    FailurePaymentComponent,
    CustomerShopsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es-Co' }],
  bootstrap: [AppComponent],
})
export class AppModule { }
