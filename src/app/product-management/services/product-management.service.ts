import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataAccessService } from 'src/app/core/services/data-access.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {

  baseUrl = environment.apiUrl;
  productManageMessage = new BehaviorSubject<string>('default view');
  currentMessage = this.productManageMessage.asObservable();

  constructor(
    private dataAccessService: DataAccessService
  ) { }

  changeToManageView(message: string) {
    this.productManageMessage.next(message);
  }

  getAllProducts(){
    return this.dataAccessService.get(this.baseUrl + 'Product/getallproducts');
  }

  getProductById(id: number){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getproduct/'+id);
  }

  getAllCategories(){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getallcategories');
  }

  getProductByAdmin(id: number){
    return this.dataAccessService.get(this.baseUrl+ 'Product/getproductbyadmin/'+id);
  }

  addProduct(product: any) {
    return this.dataAccessService.post(this.baseUrl+ 'Product/addproduct', product)
  }

  updateProduct(product: any) {
    return this.dataAccessService.post(this.baseUrl+ 'Product/updateproduct', product)
  }
}
