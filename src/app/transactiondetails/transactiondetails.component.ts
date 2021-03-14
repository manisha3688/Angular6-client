import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TransactionDetails } from '../models/transactiondetails';

@Component({
  selector: 'app-transactiondetails',
  templateUrl: './transactiondetails.component.html',
  styleUrls: ['./transactiondetails.component.css']
})


export class TransactionDetailsComponent implements OnInit, OnChanges {
  @Input() transactionDetails: TransactionDetails[];
  processedTransactionDetails: TransactionDetails[];
  transactionTableForm: FormGroup;
  sortByOrder: string;

  constructor() {
    this.transactionTableForm = new FormGroup({
      searchBy: new FormControl(''),
      sortBy: new FormControl('transactionDate')
    });
    this.sortByOrder = 'DESC';
  }

  ngOnInit(): void {
    this.filterTransaction();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.transactionDetails ) {
      this.filterTransaction();
    }
  }

  delay(fn: any, ms: number): any {
    let timer: any;
    return function() {
      if ( timer ) {
        clearTimeout(timer);
      }
      timer = setTimeout(fn.bind(this), ms || 0);
    };
  }

  filterTransaction(): void  {
    let searchBy = this.transactionTableForm.controls['searchBy'].value;
    if ( searchBy ) {
      searchBy = searchBy.toLowerCase();
      this.processedTransactionDetails = this.transactionDetails.filter((t: any) => {
        return t.merchant.toLowerCase().indexOf(searchBy) >= 0;
      });
    } else {
      this.processedTransactionDetails = this.transactionDetails;
    }
    if ( this.transactionTableForm.controls['searchBy'].dirty ||
      this.transactionTableForm.controls['searchBy'].touched ) {
      const sortBy = this.transactionTableForm.controls['sortBy'].value;
      if ( sortBy ) {
        this.sortTransactions(sortBy, true);
      }
    }
  }

  sortTransactions(sortBy: string, retainOrder?: boolean): void {
    if ( !this.processedTransactionDetails || this.processedTransactionDetails.length === 0 ) {
      return;
    }
    const oldSortBy = this.transactionTableForm.controls['sortBy'].value;
    if ( !retainOrder && sortBy !== oldSortBy ) {
      this.sortByOrder = 'DESC';
      this.transactionTableForm.controls['sortBy'].setValue(sortBy);
    } else if ( !retainOrder ) {
      this.sortByOrder = (this.sortByOrder === 'ASC') ? 'DESC' : 'ASC';
    }
    if ( sortBy === 'merchant' ) {
      this.processedTransactionDetails = this.processedTransactionDetails
        .sort((a: TransactionDetails, b: TransactionDetails) =>
          a[sortBy].localeCompare(b[sortBy]));
    } else {
      this.processedTransactionDetails = this.processedTransactionDetails
        .sort((a: TransactionDetails, b: TransactionDetails) =>
          Number(a[sortBy]) !== Number(b[sortBy]) ? Number(a[sortBy]) < Number(b[sortBy]) ? -1 : 1 : 0);
    }
    if ( this.sortByOrder === 'DESC' ) {
      this.processedTransactionDetails.reverse();
    }
  }

}
