import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { TableClothService } from '../_services/tableCloth.service';
import { TableCloth } from '../_models/tablecloth';
import { catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';


@Injectable()
export class TableClothDetailResolver implements Resolve<TableCloth> {

    constructor(private tableClothService: TableClothService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TableCloth> {
        return this.tableClothService.GetTableCloth(route.params.id).pipe(
            catchError(error => {
                console.log('Nie udało się pobrać');
                this.router.navigate(['/obrusy-i-poszewki']);

                return of(null);
            })
        );
    }
}