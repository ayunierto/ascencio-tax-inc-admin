import { httpClient } from '@/adapters/http/httpClient.adapter';
import { GetAccountTypeResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const getAccountType = (id: string) => {
  try {
    const res = httpClient.get<GetAccountTypeResponse>(`account-types/${id}`);
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'getAccountType');
  }
};
