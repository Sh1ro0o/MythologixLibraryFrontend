import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { ResponseData } from "../Models/Responses/response-data";
import { Observable } from "rxjs";
import { toHttpParams } from "../shared/utils/http-utils";
import { GetBorrowingTransactionRequest } from "../Models/Requests/get.borrowing-transaction.request";
import { BorrowingTransactionData } from "../Models/data/borrowing-transaction-data";

@Injectable({
  providedIn: 'root',
})

export class ActivityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBorrowingTransctions(getBorrowingTransctions: GetBorrowingTransactionRequest): Observable<ResponseData<BorrowingTransactionData[]>> {
    return this.http.get<ResponseData<BorrowingTransactionData[]>>(this.apiUrl + '/BorrowingTransaction/allBorrowingTransactions', {params: toHttpParams(getBorrowingTransctions)});
  }
}