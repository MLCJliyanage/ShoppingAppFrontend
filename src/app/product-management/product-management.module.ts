import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagementRoutingModule } from './product-management-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductComponent } from './product/product.component';
import { ProductManagementService } from './services/product-management.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageProductComponent } from './manage-product/manage-product.component';

@NgModule({
  declarations: [
    ProductListingComponent,
    ProductComponent,
    ProductDetailComponent,
    AddProductComponent,
    ManageProductComponent
  ],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class ProductManagementModule { }
