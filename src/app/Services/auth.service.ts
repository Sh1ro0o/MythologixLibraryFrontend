// local-storage.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../Models/Requests/login.request';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../shared/Enums/local-storage-key.enum';
import { ResponseData } from '../Models/Responses/response-data';
import { LoginData } from '../Models/data/login-data';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService,
  ) { }

  login(loginRequest: LoginRequest) : Observable<ResponseData<LoginData>> {
      return this.http.post<ResponseData<LoginData>>(this.apiUrl + '/User/Login', loginRequest);
  }

  isLoggedIn(): boolean {
      let expiresOn: Date | null = this.localStorage.get<Date>(LocalStorageKey.Expiration);

      if(expiresOn) {
        return expiresOn.getTime() > Date.now();
      }
      
      return false;
  }
}