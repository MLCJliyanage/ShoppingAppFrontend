import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductManagementService } from '../services/product-management.service';
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

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
    private cartService: CartService,
    private accountService: AccountManagementService
  ) {

    
  }

  ngOnInit(): void {

    this.loadProducts();

    //this.cartService.products.subscribe(data => {});

  }

  private loadProducts() {

    if (this.manageInput == 'AdminView') {
      this.isManageView = true;
      this.getCurrentUser();
      this.currentUser = this.getCurrentUser();
      this.getAllProductsByAdmin(this.currentUser.id);
    }

    this.productMgtService.getSearchSubject().subscribe(
      (search) => {
        console.log(search)
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
      switchMap(async (value) => value.length >= 3 ? this.getSearchResults(value) : this.getAllProducts())
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
