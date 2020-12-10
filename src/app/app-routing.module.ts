import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { CustomerShopsComponent } from './component/customer-shops/customer-shops.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { AuthGuard } from './guard/auth.guard';
import { SeeShopsGuard } from './guard/see-shops.guard';
import { TypeGuard } from './guard/type.guard';

const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent, canActivate: [AuthGuard, TypeGuard] },
  { path: 'customer-shops/:email', component: CustomerShopsComponent, canActivate: [AuthGuard, SeeShopsGuard] },
  { path: 'customer-save', component: CustomerSaveComponent },
  { path: 'customer-edit/:email', component: CustomerEditComponent, canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product-save', component: ProductSaveComponent, canActivate: [AuthGuard] },
  { path: 'product-edit/:proId', component: ProductEditComponent, canActivate: [AuthGuard] },
  { path: 'payment-method-list', component: PaymentMethodListComponent, canActivate: [AuthGuard] },
  { path: 'payment-method-save', component: PaymentMethodSaveComponent, canActivate: [AuthGuard, TypeGuard] },
  { path: 'payment-method-edit/:payId', component: PaymentMethodEditComponent, canActivate: [AuthGuard, TypeGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
