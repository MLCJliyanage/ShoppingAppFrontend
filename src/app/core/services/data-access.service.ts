import { Injectable } from '@angular/core';
import { HttpHeaders,HttpParams,HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'
// import {AppConfigService}
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {


  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get(`${url}`)
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(`${url}`, data, options);
  }
}
