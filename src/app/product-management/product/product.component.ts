import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product: any;
  isAdded = false;
  productList: any[] = [];
  manageViewMessage!: string;
  isManageView: boolean = false;


  constructor(
    private router: Router,
    private cartService: CartService,
    private productMgtService: ProductManagementService
  ) { }

  ngOnInit(): void {
    this.cartService.products.subscribe(
      (data: any) =>{
        this.productList = data
        if (!this.productList.includes(this.product)){
          console.log('hhe')
          this.isAdded = false;
        }

      }
    );

    this.productMgtService.productManageMessage.subscribe(message => {this.manageViewMessage = message
        if (message === 'ManageView')
         this.isManageView = true;
    })
    
  }

  getImagePath(imageName: string): string {
    return 'assets/product_images/'+imageName;
  }

  getProductDetails(): void{
    this.router.navigate(['products/product-detail',this.product.id]);
  }

  addToCart(event: any, productId: number): any {
    
    // If Item is already added then display alert message
    if (event.target.classList.contains('btn-success')) {
      alert('This product is already added into cart.');
      return false;
    }
    this.isAdded = true;
    this.cartService.addProductToCart(this.product);

  }

  removeFromCart(event: any, productId: number): any {
    
    // If Item is already added then display alert message
    if (this.isAdded) {
      this.isAdded = false;
      this.cartService.removeProductFromCart(this.product.id);
    }
    

  }

  editProduct(event:any, productId: number): void{
    this.router.navigate(['/products/edit-product/'+this.product.id])
  }



}
