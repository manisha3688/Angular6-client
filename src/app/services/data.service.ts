import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transactions } from '../models/transactions';
import { TransactionDetails } from '../models/transactiondetails';
import { AccountDetails } from '../models/accountdetails';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getAccounts(): Observable<AccountDetails> {
    return (this.http.get<AccountDetails>(AppConstants.ACCOUNTS_API_ENDPOINT));
  }

  public getTransactions(): Observable<Transactions> {
    return (this.http.get<Transactions>(AppConstants.TRANSACTIONS_API_ENDPOINT));
  }

  public addTransactions(transactionDetail: TransactionDetails): Observable<Object> {
    const body = JSON.parse(JSON.stringify(transactionDetail));
    return (this.http
      .post(AppConstants.TRANSACTIONS_API_ENDPOINT, body));
  }
}
