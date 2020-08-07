import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableClothService } from '../_services/tableCloth.service';
import { TableCloth } from '../_models/tablecloth';




@Injectable()
export class TableClothListResolver implements Resolve<TableCloth[]> {

  pageNumber = 1;
  pageSize = 15;


  constructor(private tableClothService: TableClothService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<TableCloth[]> {
    return this.tableClothService.GetTableCloths(this.pageNumber, this.pageSize).pipe(
        catchError(error => {
            console.log('Nie udało się pobrać');
            this.router.navigate(['']);
            return of(null);
        })
    );
  }
}
