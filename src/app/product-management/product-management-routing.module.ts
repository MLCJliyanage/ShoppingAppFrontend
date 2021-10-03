import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Roles } from '../core/enums/role';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListingComponent
  },
  {
    path:'product-detail/:id',
    component: ProductDetailComponent,
    canActivate: [RoleGuard],
    data: {
      role: Roles.Admin
    }
  },
  {
    path:'add-product',
    component: AddProductComponent
  },
  {
    path:'edit-product/:id',
    component: AddProductComponent
  },
  {
    path:'manage-product',
    component: ManageProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }




