import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Enable } from 'src/app/domain/enable';
import { Product } from 'src/app/domain/product';
import { EnableService } from 'src/app/service/enable.service';
import { ProductService } from 'src/app/service/product.service';
import formatPrice from 'src/util/formatPrice';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  public proId: string;
  public product: Product;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(
    public router: Router,
    public activetedRoute: ActivatedRoute,
    public productService: ProductService,
    public enableService: EnableService,
  ) { }

  ngOnInit(): void {
    let params = this.activetedRoute.params['_value'];
    this.proId = params.proId;
    this.findById();
    this.findAllEnable();
  }

  public findById(): void {
    this.productService.findById(this.proId).subscribe(
      data => {
        this.product = data;
      });
  }

  public update(): void {
    this.productService.update(this.product).subscribe(
      ok => {
        window.history.back();
      }, err => {
        this.showMsg = true;
        this.messages = err.error.error;
      });
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }
}
