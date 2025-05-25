import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { GetBooksRequest } from "../Models/Requests/get.books.request";
import { Observable } from "rxjs";
import { toHttpParams } from "../shared/utils/http-utils";
import { BookData } from "../Models/data/book-data";
import { ResponseData } from "../Models/Responses/response-data";
import { GetAuthorsRequest } from "../Models/Requests/get.authors.request";
import { AuthorData } from "../Models/data/author-data";
import { GetGenresRequest } from "../Models/Requests/get.genres.request";
import { GenreData } from "../Models/data/genre-data";

@Injectable({
  providedIn: 'root',
})

export class LibraryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBooks(getBookRequest: GetBooksRequest): Observable<ResponseData<BookData[]>> {
    return this.http.get<ResponseData<BookData[]>>(this.apiUrl + '/Book/allBooks', {params: toHttpParams(getBookRequest)});
  }

  getAuthors(getAuthorRequest: GetAuthorsRequest): Observable<ResponseData<AuthorData[]>> {
    return this.http.get<ResponseData<AuthorData[]>>(this.apiUrl + '/Author/allAuthors', {params: toHttpParams(getAuthorRequest)});
  }

  getGenres(getGenreRequest: GetGenresRequest): Observable<ResponseData<GenreData[]>> {
    return this.http.get<ResponseData<GenreData[]>>(this.apiUrl + '/Genre/allGenres', {params: toHttpParams(getGenreRequest)});
  }
}