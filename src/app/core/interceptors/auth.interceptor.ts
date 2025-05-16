import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../Services/local-storage.service';
import { LocalStorageKey } from '../../Shared/Enums/local-storage-key.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private localStorageService = inject(LocalStorageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.localStorageService.get(LocalStorageKey.Token);

    if (jwtToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${jwtToken}`)
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}