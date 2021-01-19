import { AccountService } from '../../account/account.service';
import  jwt_decode  from 'jwt-decode';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map(auth => {
        if (auth){
          var decode = jwt_decode(auth.token);
          if(decode['role'] === "Admin")
          {
            return true;
          }
        }
        this.router.navigate([''], {queryParams: {returnUrl: state.url}});
      })
    );
  }
  
}
