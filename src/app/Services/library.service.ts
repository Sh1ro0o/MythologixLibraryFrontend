import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { GetBooksRequest } from "../Models/Requests/get.books.request";
import { Observable } from "rxjs";
import { toHttpParams } from "../shared/utils/http-utils";
import { BookData } from "../Models/data/book-data";
import { ResponseData } from "../Models/Responses/response-data";

@Injectable({
  providedIn: 'root',
})

export class LibraryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBooks(getBookRequest: GetBooksRequest): Observable<ResponseData<BookData[]>> {
    return this.http.get<ResponseData<BookData[]>>(this.apiUrl + '/Book/allBooks', { params: toHttpParams(getBookRequest)});
  }
}