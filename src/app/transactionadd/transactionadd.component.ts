import { Component, OnInit, OnChanges, OnDestroy,
    Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionDetails } from '../models/transactiondetails';
import { MerchantDetails } from '../models/merchantdetails';
import { AppConstants } from '../app.constants';
import { AccountDetails } from '../models/accountdetails';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transactionadd',
  templateUrl: './transactionadd.component.html',
  styleUrls: ['./transactionadd.component.css']
})
export class TransactionAddComponent implements OnInit, OnChanges, OnDestroy {

  @Input() accountDetails: AccountDetails[];
  @Input() transactionDetails: TransactionDetails[];
  @Output() addTransaction = new EventEmitter<TransactionDetails>();

  transactionForm: FormGroup;

  merchantDetails: MerchantDetails[];

  suggestions: string[];

  fromValueChangeSubscription: Subscription;

  constructor(private dataService: DataService) {
    this.transactionForm = new FormGroup({
      to: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });
    this.merchantDetails = [];
    this.suggestions = [];
  }

  ngOnInit(): void  {
    if ( this.accountDetails && this.accountDetails.length > 0 ) {
      this.setFromAccount();
    }

    if ( this.transactionDetails && this.transactionDetails.length >= 0 ) {
      this.addMerchantDetails();
    }

    this.fromValueChangeSubscription = this.transactionForm.controls['from'].valueChanges
      .subscribe((value: AccountDetails) => {
        if ( value ) {
          this.transactionForm.controls['amount'].setValidators(Validators.max(value.balanceAmount));
          this.transactionForm.controls['amount'].updateValueAndValidity();
        }
    });
  }

  ngOnChanges(changes: SimpleChanges): void  {
    if ( changes.accountDetails && changes.accountDetails.currentValue
        && changes.accountDetails.currentValue.length > 0 ) {
      this.setFromAccount();
    }
    if ( changes.transactionDetails && changes.transactionDetails.currentValue
        && changes.transactionDetails.currentValue.length > 0 ) {
      this.addMerchantDetails();
    }
  }

  ngOnDestroy(): void {
    if ( this.fromValueChangeSubscription ) {
      this.fromValueChangeSubscription.unsubscribe();
    }
  }

  setFromAccount(): void  {
    if ( this.accountDetails && this.accountDetails.length > 0 ) {
      this.transactionForm.controls['from'].setValue(this.accountDetails[0]);
    }
  }

  addMerchantDetails(): void  {
    let  merchantDetail: MerchantDetails;
    this.transactionDetails.forEach((t: TransactionDetails) => {
      if ( this.merchantDetails.length === 0 || this.merchantDetails.filter((m: MerchantDetails) =>
         m.merchant.toLocaleLowerCase() === t.merchant.toLocaleLowerCase()).length === 0 ) {
            merchantDetail = new MerchantDetails();
            merchantDetail.merchant = t.merchant;
            merchantDetail.merchantLogo = t.merchantLogo;
            merchantDetail.categoryCode = t.categoryCode;
            this.merchantDetails.push(merchantDetail);
      }
    });
  }

  selectMerchant(selection: string): void  {
    this.transactionForm.controls['to'].setValue(selection);
    this.suggestions = [];
  }

  suggest(): void  {
    if ( this.transactionForm.value && this.transactionForm.value.to ) {
      this.suggestions = this.merchantDetails
        .filter(t => t.merchant.toLocaleLowerCase()
        .startsWith(this.transactionForm.value.to.toLocaleLowerCase()))
        .map( t => t.merchant)
        .slice(0, 5);
    } else {
      this.suggestions = [];
    }
  }

  changeAmount(): void  {
    const formValue = this.transactionForm.value;
    const amount = parseFloat(formValue.amount).toFixed(2);
    this.transactionForm.controls['amount'].setValue(amount);
  }

  addTransactionDetails(): void  {
    if ( this.transactionForm.invalid ) {
      this.transactionForm.markAsDirty();
      this.transactionForm.markAsTouched();
      this.transactionForm.controls.to.markAsDirty();
      this.transactionForm.controls.to.markAsTouched();
      this.transactionForm.controls.from.markAsDirty();
      this.transactionForm.controls.from.markAsTouched();
      this.transactionForm.controls.amount.markAsDirty();
      this.transactionForm.controls.amount.markAsTouched();
      return;
    }
    const transactionDetail: TransactionDetails = new TransactionDetails();
    const formValue = this.transactionForm.value;
    const merchantDetails: MerchantDetails[] = this.merchantDetails
      .filter(t => t.merchant.toLocaleLowerCase()
      .startsWith(formValue.to.toLocaleLowerCase()));
    if ( merchantDetails && merchantDetails.length > 0 ) {
      const merchantDetail: MerchantDetails = merchantDetails[0];
      transactionDetail.categoryCode = merchantDetail.categoryCode;
      transactionDetail.merchant = merchantDetail.merchant;
      transactionDetail.merchantLogo = merchantDetail.merchantLogo;
    } else {
      transactionDetail.categoryCode = AppConstants.DEFAULT_CATEGORY_CODE;
      transactionDetail.merchant = formValue.to;
      transactionDetail.merchantLogo = AppConstants.DEFAULT_LOGO;
    }
    transactionDetail.transactionDate = Date.now();
    transactionDetail.amount = formValue.amount;
    transactionDetail.transactionType = AppConstants.DEFAULT_TRANSACTION_TYPE;
    transactionDetail.fromAccount = formValue.from;
    this.addTransaction.emit(transactionDetail);
    this.transactionForm.reset();
    this.transactionForm.markAsPristine();
    this.transactionForm.markAsUntouched();
  }
}
