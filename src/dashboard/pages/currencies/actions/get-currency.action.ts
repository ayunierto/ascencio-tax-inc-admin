import { httpClient } from '@/adapters/http/httpClient.adapter';
import { GetCurrencyResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const getCurrency = (id: string) => {
  try {
    const res = httpClient.get<GetCurrencyResponse>(`currency/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'getCurrency');
  }
};
