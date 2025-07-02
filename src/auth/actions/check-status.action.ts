import { httpClient } from '@/adapters/http/httpClient.adapter';
import { CheckStatusResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const checkStatus = async (): Promise<CheckStatusResponse> => {
  try {
    return await httpClient.get<CheckStatusResponse>('auth/check-status');
  } catch (error) {
    console.log(error);
    return handleApiErrors(error, 'checkStatus');
  }
};
