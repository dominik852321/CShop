import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from, Observable, throwError } from 'rxjs';
import { catchError, delay} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if(error.status === 400){
                        console.log(error.error.message, error.error.statusCode);
                    }
                    if(error.status === 401){
                        if(error.error.message == "Authorized, you are not")
                        {
                            localStorage.removeItem('token');
                            console.log(error.error.message, error.error.statusCode);
                        }
                        else
                        {
                            console.log(error.error.message, error.error.statusCode);
                        }
                    }
                    if(error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                    if(error.status === 500) {
                        const navigationExtras: NavigationExtras = {state: {error: error.error}};
                        this.router.navigateByUrl('server-error', navigationExtras);
                    }
                    return throwError(error);
                }
            })
        );
    }

}