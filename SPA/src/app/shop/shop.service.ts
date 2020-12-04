import { IProduct } from './../shared/models/product';
import { Pagination } from './../shared/models/pagination';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { IRoom } from '../shared/models/productRoom';
import { ShopParams } from '../shared/models/shopParams';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';
  products: IProduct[] = [];
  lastProducts: IProduct[] = [];
  rooms: IRoom[] = [];
  types: IType[] = [];
  pagination = new Pagination();
  shopParams = new ShopParams();

  constructor(private http: HttpClient) { }

  getProducts(useCache: boolean) {
    if (useCache === false){
      this.products = [];
    }

    if (this.products.length > 0 && useCache === true){
      const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

      if(this.shopParams.pageNumber <= pagesReceived){
        this.pagination.data = this.products
        .slice((this.shopParams.pageNumber - 1) * this.shopParams.pageSize,
        this.shopParams.pageNumber * this.shopParams.pageSize);

        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.typeId !== 0 ) {
      params = params.append('typeId', this.shopParams.typeId.toString());
    }

    if (this.shopParams.roomId !== 0 ) {
      params = params.append('roomId', this.shopParams.roomId.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'product', {observe: 'response', params})
       .pipe(
         map(response =>  {
           this.products = [...this.products, ...response.body.data];
           this.pagination = response.body;
           return this.pagination;
         })
       );
  }

  get4Products(){
    if (this.lastProducts.length > 0){
      return of(this.lastProducts);
    }
    return this.http.get<IProduct[]>(this.baseUrl + 'product/4products').pipe(
      map(response => {
        this.lastProducts = response ;
        console.log(this.lastProducts);
        return response;
        })
    );
  }

  getTypes() {
    if (this.types.length > 0){
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'product/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }

  getRooms() {
    if (this.rooms.length > 0){
      return of(this.rooms);
    }
    return this.http.get<IRoom[]>(this.baseUrl + 'product/rooms').pipe(
      map(response => {
        this.rooms = response;
        return response;
      })
    );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  
  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'product/' + id);
  }
}


