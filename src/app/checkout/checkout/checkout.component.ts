import {  Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cartitem';
import { Order } from 'src/app/models/order';
import { CartService } from 'src/app/shared/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  imagePath = environment.imageBasePath;
  defaultImagePath = environment.defaultImagePath;
  
  orderDetails!: Order;
  orderItems!: CartItem[];

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.orderDetails = JSON.parse(localStorage.getItem('order') as string) as Order;

    // this.cartService.getOrder().subscribe(
    //   (data: Order) => {
    //     this.orderDetails = data;
    //     this.orderItems = data.cartItems
    //     this.pid = data.total
    //     console.log(this.pid)
    //   });
  }

  getImagePath(imageName: string): string {
    if(imageName === null){
      return this.defaultImagePath;
    } else{
    return this.imagePath+ imageName;
    }
  }

}

