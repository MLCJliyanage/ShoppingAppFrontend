import { Injectable } from '@angular/core';
import { HttpHeaders,HttpParams,HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {


  constructor(
    private http: HttpClient
  ) { }

  public get(url: string, params?: HttpParams): Observable<any> {
    return this.http.get<any>(`${url}`,{params});
  }

  public post(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(`${url}`, data, options);
  }

  public delete(url: string, params?: HttpParams): Observable<any> {
    return this.http.delete(`${url}`, {params})
  }
}
