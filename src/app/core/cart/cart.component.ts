import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartitem';
import { Order } from 'src/app/models/order';
import { ProductManagementService } from 'src/app/product-management/services/product-management.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  
  cartItem!: CartItem;
   cartItems: CartItem[] = [];
   totalAmmount: any;
   imagePath = environment.imageBasePath;
   defaultImagePath = environment.defaultImagePath;

  constructor(
    private productMgtService: ProductManagementService,
    private cartService: CartService,
    private router : Router 
  ) { }

  ngOnInit() {

    if (localStorage.getItem('order') !== null) {
      let currentCart = JSON.parse(localStorage.getItem('order') as string) as Order;
      this.cartItems = currentCart.cartItems;
      this.totalAmmount = currentCart.total;
    }

    this.productMgtService.getSearchSubject().subscribe(
      (search) => {
      }
    )

    this.cartService.getProducts().subscribe(data => {
      this.cartItems = data;
      this.totalAmmount = this.cartService.getTotalPrice();
    });

  }

  // Remove item from cart list
  removeItemFromCart(productId: any) {
    this.cartService.removeProductFromCart(productId);
  }

  emptyCart() {
    this.cartService.emptryCart();
    localStorage.removeItem('order')
  }

  getImagePath(imageName: string): string {
    if(imageName === null){
      return this.defaultImagePath;
    } else{
    return this.imagePath+ imageName;
    }
  }

  goToCheckout(): void {
    let order: Order = {cartItems: this.cartItems, total: this.totalAmmount}
    localStorage.setItem('order', JSON.stringify(order))
    this.cartService.setOrder(order);
    
    setTimeout(() => {  this.router.navigate(['/checkout']) }, 300);
    
  }

}
