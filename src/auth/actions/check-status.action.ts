import { httpClient } from '@/adapters/http/httpClient.adapter';
import { CheckStatusResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const checkStatus = async (): Promise<CheckStatusResponse> => {
  try {
    const res = await httpClient.get<CheckStatusResponse>('auth/check-status');
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'checkStatus');
  }
};
