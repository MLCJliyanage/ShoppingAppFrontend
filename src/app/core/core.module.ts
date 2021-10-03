import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataAccessService } from './services/data-access.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    DataAccessService
  ]
})
export class CoreModule { }
