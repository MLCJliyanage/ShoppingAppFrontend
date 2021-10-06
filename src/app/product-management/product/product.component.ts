import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { ProductManagementService } from '../services/product-management.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cartitem';
import { Order } from 'src/app/models/order';
import { ResponseDto } from 'src/app/models/response';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product!: Product;
  

  @Output() deleteEvent = new EventEmitter<string>();

  imagePath = environment.imageBasePath;
  defaultImagePath = environment.defaultImagePath;
  productDelete: string = 'default';

  isAdded = false;
  productList: any[] = [];
  manageViewMessage!: string;
  isManageView: boolean = false;

  cartQuentity: number = 1;
  cartItem!: CartItem;
  cartList: CartItem[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productMgtService: ProductManagementService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // set cart if exsists
    if (localStorage.getItem('order') !== null) {
      let currentCart = JSON.parse(localStorage.getItem('order') as string) as Order;
      this.cartList = currentCart.cartItems;
      if(this.cartList.length === 0) {
        this.isAdded = false
        this.cartQuentity = 1;
      } else if (this.cartList.find(x => x.productId == this.product.id)) {
        this.isAdded = true
        this.cartQuentity += this.cartList.find(x => x.productId == this.product.id)?.quentity as number
      }
    }

    // get cart items changes
    this.cartService.products.subscribe(
      (data) =>{
        this.cartList = data
        if(this.cartList.length === 0) {
          this.isAdded = false
          this.cartQuentity = 1;
        } else if (data.find(x => x.productId == this.product.id)) {
          this.isAdded = true
        } else {
          this.isAdded = false;
          this.cartQuentity = 1;
        }
      }
    );

    // check current view
    this.productMgtService.getManageView().subscribe(message => {this.manageViewMessage = message
        if (message === 'AdminView'){
            this.isManageView = true;
          } else {
            this.isManageView = false;
          }
    })
    
  }

  getImagePath(imageName: string): string {
    if(imageName === null){
      return this.defaultImagePath;
    } else{
    return this.imagePath+ imageName;
    }
  }

  getProductDetails(): void{
    this.router.navigate(['products/product-detail',this.product.id]);
  }

  addToCart(event: any, productId: number): any {
    
    let item: CartItem = {product: this.product, quentity: this.cartQuentity, productId: this.product.id}
    this.cartQuentity += 1;
    this.isAdded = true;
    this.cartService.addProductToCart(item);

  }

  removeFromCart(event: any, productId: number): any {
    // If Item is already added then display alert message
    if (this.isAdded) {
      this.isAdded = false;
      this.cartQuentity = 1;
      this.cartService.removeProductFromCart(this.product.id);
    }
    

  }

  editProduct(event:any, productId: number): void{
    this.router.navigate(['/products/edit-product/'+this.product.id])
  }

  deleteProduct(id: number) {
    this.productMgtService.deleteProduct(id).subscribe((data: ResponseDto)=> {
        if(data.isSuccess){
          this.toastr.success('Product Deleted')
        } else {
          this.toastr.error('Product Delete Failed')
        }
        this.sendDeleteMessage();
    }, (error)=>{
      this.toastr.error('Product Delete Failed')
    })
  }

  sendDeleteMessage():void {
    this.deleteEvent.emit('itemDelete');
  }

}
