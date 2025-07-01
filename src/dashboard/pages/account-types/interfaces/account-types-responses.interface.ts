import { ExceptionResponse } from '@/interfaces';
import { AccountType } from './account-type.interface';

export type CreateAccountTypeResponse = AccountType | ExceptionResponse;
export type GetAccountTypeResponse = AccountType | ExceptionResponse;
export type GetAccountTypesResponse = AccountType[] | ExceptionResponse;
export type UpdateAccountTypeResponse = AccountType | ExceptionResponse;
export type DeleteAccountTypeResponse = AccountType | ExceptionResponse;
