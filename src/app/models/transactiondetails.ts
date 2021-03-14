import { AccountDetails } from './accountdetails';
export class TransactionDetails {
  amount: number;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: string;
  fromAccount?: AccountDetails;
}

