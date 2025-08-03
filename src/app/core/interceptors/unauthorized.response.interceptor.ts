import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ROUTES } from '../../shared/constants/routes';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        //If error Unauthorized
        if (error.status === 401) {
          return this.authService.refreshSession().pipe(
            switchMap(() => {
              return next.handle(req);
            }),
            catchError((refreshError: HttpErrorResponse) => {
              this.authService.reset();
              this.router.navigate([ROUTES.LOGIN]);
              return throwError(() => refreshError);
            })
          )
        }

        return throwError(() => error)
      })
    )
  }

}
