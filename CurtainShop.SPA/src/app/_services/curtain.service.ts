import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curtain } from '../_models/curtain';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurtainService {

  baseUrl = environment.apiUrl + 'curtains';

constructor(private http: HttpClient) { }

   GetCurtains(page?, itemsPerPage?, curtainParams?): Observable<PaginationResult<Curtain[]>>{
     const paginationResult: PaginationResult<Curtain[]> = new PaginationResult<Curtain[]>();
     let params = new HttpParams();

     if (page != null && itemsPerPage != null)
     {
       params = params.append('pageNumber', page);
       params = params.append('pageSize', itemsPerPage);
     }

     if (curtainParams != null)
     {
       params = params.append('minValue', curtainParams.minValue);
       params = params.append('maxValue', curtainParams.maxValue);
       if (curtainParams.room != null)
       {
        params = params.append('room', curtainParams.room);
       }
       if (curtainParams.material != null)
       {
        params = params.append('material', curtainParams.material);
       }
     }

     return this.http.get<Curtain[]>(this.baseUrl, { observe: 'response', params })
        .pipe(
          map(response => {
            paginationResult.result = response.body;

            if(response.headers.get('Pagination') != null ) {
              paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
            }
            return paginationResult;
          }));
   }

   GetCurtain(id: number): Observable<Curtain> {
     return this.http.get<Curtain>(this.baseUrl + '/' + id);
   }

   
   CreateCurtain(curtain: Curtain) {
     return this.http.post(this.baseUrl, curtain);
   }

   UpdateCurtain(id: number, curtain: Curtain) {
     return this.http.put(this.baseUrl + '/' + id, curtain);
   }

   DeleteCurtain(id: number) {
     return this.http.delete(this.baseUrl + '/' + id);
   }

}
