import { IOrder } from './../shared/models/order';
import { IProductToEdit } from './../shared/models/product';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPagination, Pagination } from '../shared/models/pagination';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  pagination = new Pagination();
  shopParams = new ShopParams();
  

  constructor(private http: HttpClient) {}

  getOrdersByAdmin() {
    return this.http.get(this.baseUrl + 'admin/orders');
  }
  getOrderbyAdmin(id: number) {
    return this.http.get<IOrder>(this.baseUrl + 'admin/orders/' + id);
  }

  getProductsByAdmin() {
    let params = new HttpParams();

    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'admin/products', {observe: 'response', params})
       .pipe(
         map(response =>  {
          this.pagination = response.body;
          return this.pagination;
         })
       );
  }

  getProductByAdmin(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'admin/products/' + id);
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  
  getShopParams() {
    return this.shopParams;
  }
  
  

  updateProduct(id: number, productToEdit: IProductToEdit) {
    return this.http.post(this.baseUrl + 'admin/edit/' + id, productToEdit);
  }

  removeProduct(id: number) {
    return this.http.delete(this.baseUrl + 'admin/remove/'+ id);
  }

  addProduct(formData: FormData) {
    return this.http.post(this.baseUrl + 'admin/add', formData);
  }

  addPhoto(id: number, formData: FormData) {
    return this.http.post(this.baseUrl + 'admin/product/'+ id + '/photo', formData);
  }


}
