import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Roles } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private accountService: AccountManagementService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  canActivate(): boolean {
    console.log('inside')
    // console.log(this.route.url)
    let user: User = this.accountService.getUser();
    if (user.role) {
      return user.role === Roles.Admin.toString()
    } else {
      this.toastr.warning('Unauthorized!');
      return false;
    }
     
  }


}
