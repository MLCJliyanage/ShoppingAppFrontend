import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, switchMap } from 'rxjs/operators';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ProductManagementService } from '../services/product-management.service';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  @Input() manageInput: any
  productList: Product[] = [];
  currentUser!: User;
  isManageView: boolean = false;
  searchTerm: string = '';
  subscription!: Subscription
  form!: FormGroup;

  constructor(
    private productMgtService: ProductManagementService,
    private accountService: AccountManagementService
  ) {}

  ngOnInit(): void {

    this.loadProducts();
    this.getProductByCategory();

  }

  private loadProducts() {

    if (this.manageInput == 'AdminView') {
      this.isManageView = true;
      this.currentUser = this.getCurrentUser();
      this.getAllProductsByAdmin(this.currentUser.id);
    }

    this.productMgtService.getSearchSubject().subscribe(
      (search) => {
        if (this.manageInput !== 'AdminView'){
          if (search.length > 1) { 
            this.getSearchResults(search); 
          }else { 
            this.getAllProducts();
          }
        } else {
          this.getAllProductsByAdmin(this.currentUser?.id);
        }
      });

  }

  private getProductByCategory(){
    if(this.manageInput !== 'AdminView'){
      this.productMgtService.getCategoryMsg().subscribe((id: number)=>{
        this.productMgtService.getProductsByCategory(id).subscribe((data) =>{
          this.productList = data;
        },(error)=>{}
        )
      })
    }
  }


  private getAllProducts() {
    this.productMgtService.getAllProducts().subscribe(data => {
      this.productList = data;
    });
  }


  private getAllProductsByAdmin(id: number) {
    this.productMgtService.getProductByAdmin(id).subscribe(data => {
      this.productList = data;
    })
  }

  getCurrentUser(): User {
    return JSON.parse(this.accountService.getUser().toString()) as User
  }

  searchProduct(): void {
    this.form.get('search')?.valueChanges.pipe(
      debounceTime(400),
      switchMap(async (value) => value.length >= 3 ? this.getSearchResults(value) : [])
    ).subscribe((res) => {
    })
  }

  getSearchResults(searchTerm: string) {
    if (searchTerm !== null) {
      this.productMgtService.getSearchedProducts(searchTerm).subscribe(
        (data) => this.productList = data
      )
    }
  }

  receiveEvent(event: any) {
    if(event === 'itemDelete'){
      this.getAllProductsByAdmin(this.currentUser.id);
    }
  }

}
