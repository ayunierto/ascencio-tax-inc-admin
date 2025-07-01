import { httpClient } from '@/adapters/http/httpClient.adapter';
import { ForgotPasswordRequest, ForgotPasswordResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const forgotPassword = async ({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  try {
    const res = await httpClient.post<ForgotPasswordResponse>(
      'auth/forgot-password',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    return res;
  } catch (error) {
    console.error('Error caught in forgotPassword:', error);
    return handleApiErrors(error, 'forgotPassword');
  }
};
