import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { GetUsersRequest } from "../Models/Requests/get.users.request";
import { UserData } from "../Models/data/user-data";
import { ResponseData } from "../Models/Responses/response-data";
import { Observable } from "rxjs";
import { toHttpParams } from "../shared/utils/http-utils";

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(getUserRequest: GetUsersRequest): Observable<ResponseData<UserData[]>> {
    return this.http.get<ResponseData<UserData[]>>(this.apiUrl + '/User/allUsers', {params: toHttpParams(getUserRequest)});
	}
}