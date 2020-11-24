import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersForUser(){
    return this.http.get(this.baseUrl + 'order');
  }

  getOrderByIdForUser(id: number){
    return this.http.get(this.baseUrl + 'order/' + id);
  }

}
