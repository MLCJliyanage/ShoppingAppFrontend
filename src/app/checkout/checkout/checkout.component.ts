import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  
  orderDetails!: Order;
  orderItems!: CartItem[];
  pid!: number;

  constructor(
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.orderDetails = JSON.parse(localStorage.getItem('order') as string) as Order;
    this.pid = this.orderDetails.total
    console.log(this.orderDetails.cartItems[0].product.id)

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
      return '/assets/product_images/bat.png'
    } else{
    return this.imagePath+ imageName;
    }
  }

}

