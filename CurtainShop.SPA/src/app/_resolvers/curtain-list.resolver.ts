import { Injectable } from '@angular/core';
import { Curtain } from '../_models/curtain';
import { CurtainService } from '../_services/curtain.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { catchError } from 'rxjs/operators';




@Injectable()
export class CurtainListResolver implements Resolve<Curtain[]> {
  pageNumber = 1;
  pageSize = 12;


  constructor(private curtainService: CurtainService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Curtain[]> {
    return this.curtainService.GetCurtains(this.pageNumber, this.pageSize).pipe(
        catchError(error => {
            console.log('Nie udało się pobrać');
            this.router.navigate(['']);
            return of(null);
        })
    );
  }
}
