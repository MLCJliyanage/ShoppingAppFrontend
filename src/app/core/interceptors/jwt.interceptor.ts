import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountManagementService } from 'src/app/account/services/account-management.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountManagementService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.accountService.getUser() !== null) {
    let user: User = JSON.parse(this.accountService.getUser().toString()) as User
    if(user?.token) {
      if (!this.tokenExpired(user.token)) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${user.token}`
        ),
      })
    } else {
      this.accountService.logout();
    }
    }
  }
    return next.handle(request);
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  } 
}
