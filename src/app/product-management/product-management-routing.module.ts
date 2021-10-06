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
    component: ProductDetailComponent
  },
  {
    path:'add-product',
    component: AddProductComponent,
    canActivate: [RoleGuard],
    data: {
      role: Roles.Admin
    }
  },
  {
    path:'edit-product/:id',
    component: AddProductComponent,
    canActivate: [RoleGuard],
    data: {
      role: Roles.Admin
    }
  },
  {
    path:'manage-product',
    component: ManageProductComponent,
    canActivate: [RoleGuard],
    data: {
      role: Roles.Admin
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }




