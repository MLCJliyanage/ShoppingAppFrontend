import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataAccessService } from 'src/app/core/services/data-access.service';
import { Product } from 'src/app/models/product';
import { ResponseDto } from 'src/app/models/response';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  baseUrl = environment.apiUrl;

  private searchSubject = new BehaviorSubject<string>('a');
  private manageView = new BehaviorSubject<string>('DefaultView')
  private categoryMsg = new Subject<number>();

  constructor(
    private dataAccessService: DataAccessService
  ) { }

  setCategoryMsg(id: number) {
    this.categoryMsg.next(id)
  }

  getCategoryMsg(): Observable<number>{
    return this.categoryMsg.asObservable();
  }

  setManageView(view: string){
    this.manageView.next(view);
  }

  getManageView(): Observable<string> {
    return this.manageView.asObservable();
  }
  
  setSearchSubject(search: string){
    this.searchSubject.next(search);
  }

  getSearchSubject(): Observable<string> {
    return this.searchSubject.asObservable();
  }

  getAllProducts(): Observable<Product[]>{
    return this.dataAccessService.get(this.baseUrl + 'Product/getallproducts');
  }

  getProductById(id: number): Observable<Product>{
    return this.dataAccessService.get(this.baseUrl+ 'Product/getproduct/'+id);
  }

  getAllCategories(){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getallcategories');
  }

  getAllManufacturers(){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getallmanufactureres');
  }

  getProductByAdmin(id: number): Observable<Product[]>{
    return this.dataAccessService.get(this.baseUrl+ 'Product/getproductbyadmin/'+id);
  }

  addProduct(product: any) {
    return this.dataAccessService.post(this.baseUrl+ 'Product/addproduct', product).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  updateProduct(product: any) {
    return this.dataAccessService.post(this.baseUrl+ 'Product/updateproduct', product)
  }

  deleteProduct(id: number) {
    return this.dataAccessService.delete(this.baseUrl+ 'Product/deleteproduct/'+ id).pipe(
      map((res: ResponseDto) => {return res} )
    )
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('imageFile',image);
    return this.dataAccessService.post(this.baseUrl+ 'Product/uploadimage',formData);
  }

  getSearchedProducts(search: string){
    let params = new HttpParams();
    params = params.append('search', search);
    return this.dataAccessService.get(this.baseUrl+ 'Product/searchproduct',params)
  }

  getProductsByCategory(id: number){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getproductsbycategory/'+ id).pipe(
      map((res: Product[]) => {return res})
    )
  }
}
