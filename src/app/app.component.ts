import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from './account/services/account-management.service';
import { User } from './models/user';
import { ProductManagementService } from './product-management/services/product-management.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ShoppingAppFrontEnd';
  categoryDetails = []

  constructor(
    private accountService: AccountManagementService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }


  setCurrentUser() {
    let user: User;
    if (localStorage.getItem('user')) {
      console.log('current')
    user = JSON.parse(localStorage.getItem('user') as string);
    this.accountService.setCurrentUser(user);
    }
  }
  
}
