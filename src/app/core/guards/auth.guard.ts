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
    if (this.accountService.isLoggedin()) {
      if (localStorage.getItem('order') === null){
          this.toastr.warning('Please Add Items to Cart!');
        this.router.navigate(['/products'])
        return false;
      }
      return true;
    } else {
      this.toastr.error('Please Login!');
      this.router.navigate(['account/login'])
      return false;
    }


  }

}
