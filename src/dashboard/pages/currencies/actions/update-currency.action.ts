import { httpClient } from '@/adapters/http/httpClient.adapter';
import { UpdateCurrencyInputs } from '../schemas';
import { UpdateCurrencyResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const updateCurrency = async (
  currency: UpdateCurrencyInputs
): Promise<UpdateCurrencyResponse> => {
  const { id, ...rest } = currency;
  try {
    const res = await httpClient.patch<UpdateCurrencyResponse>(
      `currency/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'updateCurrency');
  }
};
