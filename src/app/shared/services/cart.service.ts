import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from 'src/app/models/cartitem';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { 

    if (localStorage.getItem('order') !== null) {
      let currentCart = JSON.parse(localStorage.getItem('order') as string) as Order;
      this.cartItems =  currentCart.cartItems;
      this.cartTotal = currentCart.total;
    }
  }

  public cartItems: CartItem[] = [];
  public products = new Subject<CartItem[]>();
  public order = new Subject<Order>();
  public cartTotal = 0;


  getProducts(): Observable<any> {
    return this.products.asObservable();
  }

  setOrder(order: Order) {
    this.order.next(order);
  }

  getOrder(): Observable<Order> {
    return this.order.asObservable();
  }

  // Add single product to the cart
  addProductToCart(product: CartItem) {
    if (this.cartItems.length === 0)
      this.cartTotal = 0;

    const productIndex = this.cartItems.findIndex(item => item.product.id === product.product.id);

    if(productIndex >= 0){
      this.cartTotal += product.product.price;

      const updatedOrderItem = this.cartItems[productIndex];
      updatedOrderItem.quentity +=1;
      const newOrderItems = this.cartItems.slice(0);
      newOrderItems[productIndex] = {
        ...this.cartItems[productIndex],
        ...updatedOrderItem
      }
    } else {
      this.cartItems.push(product);
      this.cartTotal += product.product.price;
    }

    //this.cartItems.push(product);
    this.products.next(this.cartItems);
  }

  // Remove single product from the cart
  removeProductFromCart(productId: number) {
    const productIndex = this.cartItems.findIndex(item => item.product.id === productId);

    if(productIndex >= 0){
      let cartItem = this.cartItems.find(x => x.productId === productId) as CartItem
      let reduceAmount = cartItem?.quentity * cartItem?.product?.price;
      this.cartTotal -= reduceAmount;
      this.cartItems.splice(productIndex, 1);
    }

    this.products.next(this.cartItems);
  }

  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.cartTotal = 0;
    this.products.next(this.cartItems);
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    // this.cartItems.map((item: CartItem) => {
    //   this.cartTotal += item.product.price
    // });

    return this.cartTotal
  }
}
