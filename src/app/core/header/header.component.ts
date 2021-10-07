import { ValueConverter } from '@angular/compiler/src/render3/view/template';
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
    this.getCurrentUser();
    this.buildSearchForm();
    this.getCartFromSession()
    this.getCategories();
    this.getCurrentCart();
    this.searchProduct(); 
  }


  getCurrentUser(){
    this.accountService.getCurrentUser()
    .subscribe((user: User) => {
      if(user){
        this.currentUser = user
        console.log(this.currentUser.role);
        this.isLoggedIn = true;
        this.userName = user.username
        if(this.getDecodedToken(user.token).role === Roles.Admin){
          this.isNormalUser = false;
        }
      } else{
        this.isLoggedIn = false;
        this.isNormalUser = true;
      }   
    });
  }

  getCurrentCart() {
    this.cartService.getProducts().subscribe(data => {
      this.cartProductCount = data.length;
    })
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
      this.productMgtService.setCategoryMsg(id)
  }

  searchProduct(): void{
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(400),
      switchMap(async (value) => value.length >= 3 ? this.productMgtService.setSearchSubject(value) : value.length == 0 ?
      this.productMgtService.setSearchSubject('a') : []     
      )
    ).subscribe((res) => {
    })
  }

  goToMainProductView(): void {
    // this.productMgtService.setSearchSubject('a');
    this.router.navigate(['/products'])
  }

  getUserFromSession() {
      if (localStorage.getItem('user')) {
        let user: User = JSON.parse(localStorage.getItem('user') as string) as User
        if(user){
          this.isLoggedIn = true;
          this.userName = user.username
          if(user.role === Roles.Admin){
            this.isNormalUser = false;
          }
      }
    }
  }

  getCartFromSession() {
    if (localStorage.getItem('order') !== null) {
      let currentCart = JSON.parse(localStorage.getItem('order') as string) as Order;
      this.cartProductCount = currentCart.cartItems.length
    }
  }

  getDecodedToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  searchClose(): void{
    this.productMgtService.setSearchSubject('a');
  }
  
}
