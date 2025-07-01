import { httpClient } from '@/adapters/http/httpClient.adapter';
import { CreateCurrencyInputs } from '../schemas';
import { CreateCurrencyResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const createCurrency = async (
  values: CreateCurrencyInputs
): Promise<CreateCurrencyResponse> => {
  try {
    const res = await httpClient.post<CreateCurrencyResponse>('currency', {
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
