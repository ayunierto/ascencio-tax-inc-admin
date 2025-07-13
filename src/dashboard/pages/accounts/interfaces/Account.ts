import { AccountType } from '../../account-types/interfaces';
import { Currency } from '../../currencies/interfaces';

export interface Account {
  id: string;
  name: string;
  icon: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  currency: Currency;
  accountType: AccountType;
}
