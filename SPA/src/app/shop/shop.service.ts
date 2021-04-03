
import { environment } from './../../environments/environment';
import { IProduct } from './../shared/models/product';
import { Pagination } from './../shared/models/pagination';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.apiUrl;
  lastProducts: IProduct[] = [];
  
  constructor(private http: HttpClient) { }


  get3Products(){
    if (this.lastProducts.length > 0){
      return of(this.lastProducts);
    }
    
    return this.http.get<IProduct[]>(this.baseUrl + 'product/3products').pipe(
      map(response => {
        this.lastProducts = response;
        return response;
        })
    );
  }

  getProduct(id: number) {
    return this.http.get<IProduct>(this.baseUrl + 'product/' + id);
  }
}


