import { HttpError } from '@/adapters/http/http-client.interface';
import { AccountType } from './account-type.interface';

export type CreateAccountTypeResponse = AccountType | HttpError;
export type GetAccountTypeResponse = AccountType | HttpError;
export type GetAccountTypesResponse = AccountType[] | HttpError;
export type UpdateAccountTypeResponse = AccountType | HttpError;
export type DeleteAccountTypeResponse = AccountType | HttpError;
