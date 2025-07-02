import { httpClient } from '@/adapters/http/httpClient.adapter';
import { CreateCurrencyInputs } from '../schemas';
import { handleApiErrors } from '@/auth/utils';
import { Currency } from '../interfaces';

export const createCurrency = async (values: CreateCurrencyInputs) => {
  try {
    const res = await httpClient.post<Currency>('currency', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'createCurrency');
  }
};
