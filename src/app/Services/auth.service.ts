// local-storage.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../Models/Requests/login.request';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../Models/Responses/login.response';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { LocalStorageKey } from '../Shared/Enums/local-storage-key.enum';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient,
                private localStorage: LocalStorageService,
    ) { }

    login(loginRequest: LoginRequest) : Observable<LoginResponse> {
        return this.http.post<LoginResponse>(this.apiUrl + '/User/Login', loginRequest);
    }

    isLoggedIn(): boolean {
        let expiresOn: Date | null = this.localStorage.get<Date>(LocalStorageKey.Expiration);

        if(expiresOn) {
          return expiresOn.getTime() > Date.now();
        }
        
        return false;
    }
}