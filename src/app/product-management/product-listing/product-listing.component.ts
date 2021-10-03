import { Component, Input, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  @Input() manageInput: any
  productList : any[] = [];
  currentUser!: User;
  isManageView: boolean = false;

  constructor(
    private productMgtService: ProductManagementService,
    private cartService: CartService,  
    private accountService: AccountManagementService
  ) { }

  ngOnInit(): void {
    if (this.manageInput == 'productManage'){
      this.isManageView = true;
      this.getCurrentUser();
      this.currentUser = this.getCurrentUser();
      this.getAllProductsByAdmin(this.currentUser.id);
    } else {
      this.getAllProducts();
    }
    

  this.cartService.products.subscribe(
      data => console.log(data)
    )
  }


  private getAllProducts(){
    this.productMgtService.getAllProducts().subscribe( data => {
      console.log(data)
      this.productList = data;
    })
  }

  private getAllProductsByAdmin(id: number){
    this.productMgtService.getProductByAdmin(id).subscribe( data => {
      console.log(data)
      this.productList = data;
    })
  }

  getCurrentUser(): User {
    return JSON.parse(this.accountService.getUser().toString()) as User
  }

}
