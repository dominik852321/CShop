import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { Curtain } from '../_models/curtain';
import { CurtainService } from '../_services/curtain.service';
import { catchError } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';


@Injectable()
export class CurtainDetailResolver implements Resolve<Curtain> {

    constructor(private curtainService: CurtainService,
                private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Curtain> {
        return this.curtainService.GetCurtain(route.params.id).pipe(
            catchError(error => {
                console.log('Nie udało się pobrać');
                this.router.navigate(['/firany']);

                return of(null);
            })
        );
    }
}