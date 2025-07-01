import { httpClient } from '@/adapters/http/httpClient.adapter';
import { GetCurrenciesResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const getCurrencies = () => {
  try {
    const res = httpClient.get<GetCurrenciesResponse>('currency');
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'getCurrencies');
  }
};
