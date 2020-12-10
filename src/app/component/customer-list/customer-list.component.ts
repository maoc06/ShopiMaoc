import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  public titulo: string = 'Lista de Clientes';
  public customers: Customer[];
  public query: string = "";

  public showMsg: boolean = false;
  public messages: string[];

  constructor(
    public router: Router,
    public customerService: CustomerService,
    public afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.customerService.findAll().subscribe(data => {
      this.customers = data;
    }, error => {
      console.error(error);
    });
  }

  searchByQuery(query: string): void {
    if (query.length === 0) {
      this.findAll();
    } else {
      this.customerService.findByQuery(query).subscribe(data => {
        this.customers = data;
      }, error => {
        console.error(error);
      });
    }
  }

  public delete(email: string): void {
    this.messages = [""];
    this.customerService.delete(email).subscribe(ok => {
      this.findAll();
    }, err => {
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

  public deleteUserFireAuth(): void {
    // TODO -> Borrar el user_auth de firebase
  }


  public goToCustomerSave(): void {
    this.router.navigate(['/customer-save']);
  }
}
