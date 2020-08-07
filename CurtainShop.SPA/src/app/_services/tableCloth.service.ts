import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { TableCloth } from '../_models/tablecloth';
import { HttpParams, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TableClothService {
  baseUrl = environment.apiUrl + 'tablecloths';

  constructor(private http: HttpClient) {}

  GetTableCloths(page?, itemsPerPage?, tableClothParams?): Observable<PaginationResult<TableCloth[]>> {
    const paginationResult: PaginationResult<
      TableCloth[]> = new PaginationResult<TableCloth[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (tableClothParams != null) {
      params = params.append('minValue', tableClothParams.minValue);
      params = params.append('maxValue', tableClothParams.maxValue);
      if (tableClothParams.room != null) {
        params = params.append('type', tableClothParams.room);
      }
    }

    return this.http.get<TableCloth[]>(this.baseUrl, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginationResult;
        })
      );
  }

  GetTableCloth(id: number): Observable<TableCloth> {
    return this.http.get<TableCloth>(this.baseUrl + '/' + id);
  }

  CreateTableCloth(tableCloth: TableCloth) {
    return this.http.post(this.baseUrl, tableCloth);
  }

  UpdateTableCloth(id: number, tableCloth: TableCloth) {
    return this.http.put(this.baseUrl + '/' + id, tableCloth);
  }

  DeleteTableCloth(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }





}
