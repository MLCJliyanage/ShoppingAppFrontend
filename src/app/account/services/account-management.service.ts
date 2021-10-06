import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataAccessService } from 'src/app/core/services/data-access.service';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  baseUrl = environment.apiUrl;
  currentUserSource = new Subject<User>();

  constructor(
    private dataAccessService: DataAccessService
  ) { }


  register(user: any) {
    let user1 = {data: user.toString()}
    return this.dataAccessService.post(this.baseUrl+'Auth/register',user);
}

 //to call the login service and get the respose
 login(model: any) {
  return this.dataAccessService.post(this.baseUrl + 'Auth/login', model).pipe(
    map((response: User) => {
      const user = response;
      if (user) {
        this.setCurrentUser(user);
      }
    })
  );
}


 //setting the username,token and userrole in localstorage
 setCurrentUser(user: User) {
   console.log(user)
   this.currentUserSource.next(user);
  user.role = this.getDecodedToken(user.token).role;
  user.user = this.getDecodedToken(user.token).username;
  localStorage.setItem('user', JSON.stringify(user));
  
}

  getCurrentUser(): Observable<User>{
    return this.currentUserSource.asObservable();
  }

logout() {
  localStorage.removeItem('user');
  this.currentUserSource.next();
}

//decode the JWT token in order to get the role and save in local storage
getDecodedToken(token: any) {
  return JSON.parse(atob(token.split('.')[1]));
}

isLoggedin(): boolean {
  return !!localStorage.getItem('user')
}

getUser(): any {
  if (localStorage.getItem('user') !== null) {
    return localStorage.getItem('user') as unknown as User
  } else {
    return null
  }
}

}
