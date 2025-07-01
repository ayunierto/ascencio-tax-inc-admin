import { httpClient } from '@/adapters/http/httpClient.adapter';
import { GetAccountTypesResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const getAccountTypes = () => {
  try {
    const res = httpClient.get<GetAccountTypesResponse>('account-types');
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'getAccountTypes');
  }
};
