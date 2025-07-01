import { ExceptionResponse } from '@/interfaces';
import { Currency } from './currency.interface';

export type CreateCurrencyResponse = Currency | ExceptionResponse;
export type GetCurrencyResponse = Currency | ExceptionResponse;
export type GetCurrenciesResponse = Currency[] | ExceptionResponse;
export type UpdateCurrencyResponse = Currency | ExceptionResponse;
export type DeleteCurrencyResponse = Currency | ExceptionResponse;
