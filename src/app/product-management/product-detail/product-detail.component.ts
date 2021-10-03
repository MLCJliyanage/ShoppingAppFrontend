import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit,OnDestroy {

  productId!: number; 
  product: any
  $routeParams!: Subscription
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productMgtService: ProductManagementService) { }


  ngOnDestroy(): void {
    this.$routeParams.unsubscribe();
  }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.$routeParams = this.route.params.subscribe(params => {
      this.productId = params.id;
        if(this.productId){
            this.getProduct(this.productId)
        }
    })
  }

  getProduct(id: number){
    this.productMgtService.getProductById(id).subscribe(data => {
      this.product = data;
      console.log(this.product)
    })
  }

  getImagePath(imageName: string): string {
    return 'assets/product_images/'+imageName;
  }


}
