// local-storage.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../Models/Requests/login.request';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, finalize, Observable, Subject, take, tap, throwError } from 'rxjs';
import { ResponseData } from '../Models/Responses/response-data';
import { AuthData } from '../Models/data/auth-data';
import { RegisterRequest } from '../Models/Requests/register.request';
import { Role } from '../shared/enums/role.enum';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = environment.apiUrl;
  private isUserLoggedIn: boolean = false;
  private roles: string[] = [];

  isRefreshing = false;
  private refreshSubject = new Subject<ResponseData<AuthData>>();

  constructor(private http: HttpClient) { }

  //Log in
  login(loginRequest: LoginRequest) : Observable<ResponseData<AuthData>> {
    return this.http.post<ResponseData<AuthData>>(this.apiUrl + '/User/Login', loginRequest);
  }

  //Register
  register(registerRequest: RegisterRequest): Observable<ResponseData<AuthData>> {
    return this.http.post<ResponseData<AuthData>>(this.apiUrl + '/User/Register', registerRequest);
  }

  logout(): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/User/Logout', {});
  }

  refreshSession(): Observable<ResponseData<AuthData>> {
    if (this.isRefreshing) {
      return this.refreshSubject.pipe(
        take(1)
      );
    }

    this.isRefreshing = true;
    
    return this.http.post<ResponseData<AuthData>>(this.apiUrl + '/Auth/Refresh', {})
      .pipe(
        tap(response => this.refreshSubject.next(response)),
        catchError(err => {
          console.log(err);
          this.refreshSubject.error(err);
          return throwError(() => err);
        }),
        finalize(() => {
          this.isRefreshing = false;
        }),
      );
  }
  
  setIsLoggedIn(status: boolean) {
    this.isUserLoggedIn = status;
  }

  setRoles(newRoles: string[]) {
    this.roles = newRoles;
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  isAdmin(): boolean {
    return this.roles.some(x => x == Role.Admin);
  }

  reset(): void {
    this.isUserLoggedIn = false;
    this.roles = [];
  }
}