import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CategoryComponent } from './category/category/category.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {
  //   path: 'category',
  //   loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./product-management/product-management.module').then(m => m.ProductManagementModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }