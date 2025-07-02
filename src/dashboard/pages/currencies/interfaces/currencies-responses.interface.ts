import { HttpError } from '@/adapters/http/http-client.interface';
import { Currency } from './currency.interface';

export type CreateCurrencyResponse = Currency | HttpError;
export type GetCurrencyResponse = Currency | HttpError;
export type GetCurrenciesResponse = Currency[] | HttpError;
export type UpdateCurrencyResponse = Currency | HttpError;
export type DeleteCurrencyResponse = Currency | HttpError;
