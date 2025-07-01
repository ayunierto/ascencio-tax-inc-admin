import { httpClient } from '@/adapters/http/httpClient.adapter';
import { DeleteCurrencyResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const deleteCurrency = async (
  id: string
): Promise<DeleteCurrencyResponse> => {
  try {
    const res = await httpClient.delete<DeleteCurrencyResponse>(
      `currency/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'deleteCurrency');
  }
};
