import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { User } from 'src/app/models/user';
import { CartService } from 'src/app/shared/services/cart.service';
import { Roles } from '../enums/role';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartProductCount: number = 0;
  isLoggedIn: boolean = false;
  isNormalUser: boolean = true;
  currentUser: User | undefined;


  constructor(
    private cartService: CartService,
    private accountService: AccountManagementService,
    private router : Router
  ) { }

  ngOnInit() {
    this.cartService.getProducts().subscribe(data => {
      this.cartProductCount = data.length;
    })


    this.accountService.currentUser$
    .pipe(take(1))
    .subscribe((user) => {
      this.currentUser = user
      if(user){
        this.isLoggedIn = true;
      }
      if(this.currentUser.role === Roles.Admin.toString()){
        this.isNormalUser = false;
      }
    });
    

  }

  logOut(): void{
    this.accountService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/home'])
  }



}
