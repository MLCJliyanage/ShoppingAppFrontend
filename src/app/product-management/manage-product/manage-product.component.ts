import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { User } from 'src/app/models/user';
import { ProductManagementService } from '../services/product-management.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  toPtoductList: string = 'productManage'
  manageViewMessage!: string;

  constructor(
    private productMgtService: ProductManagementService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sendManageViewMessage()
  }

  sendManageViewMessage(): void {
    this.productMgtService.changeToManageView("ManageView");
  }

  addProduct(): void{
    this.router.navigate(['/products/add-product'])
  }

}
