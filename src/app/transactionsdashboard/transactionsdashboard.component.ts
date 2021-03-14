import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { TransactionDetails } from '../models/transactiondetails';
import { AccountDetails } from '../models/accountdetails';

@Component({
  selector: 'app-transactionsdashboard',
  templateUrl: './transactionsdashboard.component.html',
  styleUrls: ['./transactionsdashboard.component.css']
})
export class TransactionsDashboardComponent implements OnInit {
  accountDetails: AccountDetails[];
  transactionDetails: TransactionDetails[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAccountDetails();
    this.getTransactions();
  }

  getAccountDetails(): void {
    this.dataService.getAccounts().subscribe(
      (accounts: any) => {
        if ( accounts && accounts.data ) {
          this.accountDetails = accounts.data;
        }
    });
  }

  getTransactions(): void {
    this.dataService.getTransactions().subscribe(
      (transaction: any) => {
        if ( transaction && transaction.data ) {
          this.transactionDetails = transaction.data;
        }
    });
  }

  addTransactionDetails(transactionDetail: TransactionDetails): void {
    this.dataService.addTransactions(transactionDetail).subscribe((data: any) => {
        if ( data && data.status ) {
          this.getAccountDetails();
          this.getTransactions();
        }
    });
  }
}
