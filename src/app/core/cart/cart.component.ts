import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

   cartItems: any;
   totalAmmount: any;

  constructor(
    private cartService: CartService 
  ) { }

  ngOnInit() {

    this.cartService.getProducts().subscribe(data => {
      this.cartItems = data;

      this.totalAmmount = this.cartService.getTotalPrice();
    });

  }

  // Remove item from cart list
  removeItemFromCart(productId: any) {
    /* this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });

    this.mySharedService.setProducts(this.cartItems); */

    this.cartService.removeProductFromCart(productId);

  }

  emptyCart() {
    this.cartService.emptryCart();
  }

  getImagePath(imageName: string): string {
    console.log(imageName)
    return 'assets/product_images/'+imageName;
  }

  goToCheckout(): void {
    
  }

}
