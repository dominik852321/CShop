import { environment } from '../../../../environments/environment';
import { IProduct } from '../../../shared/models/product';
import { Pagination } from '../../../shared/models/pagination';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../../../shared/models/pagination';
import { ShopParams } from '../../../shared/models/shopParams';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class GotoweService {

  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  shopParams = new ShopParams();
  pagination = new Pagination();

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


    params = params.append('typeId', '1');
    params = params.append('roomId', '2');
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


  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }
  
  getShopParams() {
    return this.shopParams;
  }

}


