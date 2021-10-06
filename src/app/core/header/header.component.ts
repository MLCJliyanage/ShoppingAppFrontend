import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounce, debounceTime, map, switchMap, take, tap } from 'rxjs/operators';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { ProductManagementService } from 'src/app/product-management/services/product-management.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { Roles } from '../enums/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  form!: FormGroup;
  cartProductCount: number = 0;
  isLoggedIn: boolean = false;
  isNormalUser: boolean = true;
  currentUser: User | undefined;
  categoryList: any[] = [];
  searchTerm: string = 'hello'
  subscription!: Subscription
  userName!: string;


  constructor(
    private cartService: CartService,
    private productMgtService: ProductManagementService,
    private accountService: AccountManagementService,
    private router : Router,
    private formBuilder: FormBuilder
  ) { 

  }

  ngOnInit() {
    this.getUserFromSession();
    this.buildSearchForm();

    if (localStorage.getItem('order') !== null) {
      let currentCart = JSON.parse(localStorage.getItem('order') as string) as Order;
      this.cartProductCount = currentCart.cartItems.length
    }

    this.getCurrentUser();
    
    this.getCategories();

    this.cartService.getProducts().subscribe(data => {
      this.cartProductCount = data.length;
    })

    this.searchProduct();
     
  }


  getCurrentUser(){

    this.accountService.getCurrentUser()
    .subscribe((user) => {
      console.log(user)
      this.currentUser = user
      if(user){
        console.log(user)
        this.isLoggedIn = true;
        this.userName = user.username
        if(user.role === Roles.Admin){
          this.isNormalUser = false;
        }
      } else{
        console.log('no user')
        // this.isLoggedIn = false;
        // this.isNormalUser = true;
      }   
    });
  }

  buildSearchForm(): void {
    this.form = this.formBuilder.group({
      search: ['']
    });
  }


  getCategories() {
    this.productMgtService.getAllCategories().subscribe(
      (data: any) => {
        this.categoryList = data      
      });
  }

  logOut(): void{
    this.accountService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home'])
  }

  getProductByCategory(id: number){
      this.productMgtService.setSearchSubject(id.toString())
  }

  searchProduct(): void{
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(400),
      switchMap(async (value) => value.length >= 3 ? this.productMgtService.setSearchSubject(value) : 
      this.productMgtService.setSearchSubject('a'))
    ).subscribe((res) => {
    })
  }

  goToMainProductView(): void {
    this.productMgtService.setSearchSubject('a');
    this.router.navigate(['/products'])
  }

  getUserFromSession() {
    if (localStorage.getItem('user')) {
      let user: User = JSON.parse(localStorage.getItem('user') as string) as User
      if(user){
        console.log(user)
        this.isLoggedIn = true;
        this.userName = user.username
        if(user.role === Roles.Admin){
          this.isNormalUser = false;
        }
    }
  }

  }
}
