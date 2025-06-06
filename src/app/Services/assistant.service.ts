import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ResponseData } from "../Models/Responses/response-data";
import { Observable } from "rxjs";
import { toHttpParams } from "../shared/utils/http-utils";
import { AssistantRequest } from "../Models/Requests/assistant.request";

@Injectable({
  providedIn: 'root',
})

export class AssistantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAssistantResponse(assistantRequest: AssistantRequest): Observable<ResponseData<string>> {
    return this.http.post<ResponseData<string>>(this.apiUrl + '/AssistantChat/assistantResponse', assistantRequest);
	}
}