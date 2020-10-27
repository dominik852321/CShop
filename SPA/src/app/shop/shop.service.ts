import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { IRoom } from '../shared/models/productRoom';
import { delay, map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.typeId !== 0 ) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.roomId !== 0 ) {
      params = params.append('roomId', shopParams.roomId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageSize', shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'product', {observe: 'response', params})
       .pipe(
         map(response =>  {
           return response.body;
         })
       );
  }

  getTypes() {
    return this.http.get<IType[]>(this.baseUrl + 'product/types');
  }

  getRooms() {
    return this.http.get<IRoom[]>(this.baseUrl + 'product/rooms');
  }
}


