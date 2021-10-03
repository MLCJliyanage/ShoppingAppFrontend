import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountManagementService } from 'src/app/account/services/account-management.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    private accountService: AccountManagementService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  canActivate(): boolean {
    console.log('inside')
    if (this.accountService.isLoggedin()) {
      return true;
    } else {
      this.toastr.error('Please Login!');
      this.router.navigate(['account/login'])
      return false;
    }


  }

}
