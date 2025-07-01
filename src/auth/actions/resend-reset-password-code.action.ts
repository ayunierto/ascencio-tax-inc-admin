import { httpClient } from '@/adapters/http/httpClient.adapter';
import {
  ResendResetPasswordCodeRequest,
  ResendResetPasswordCodeResponse,
} from '../interfaces';
import { handleApiErrors } from '../utils';

export const resendResetPasswordCode = async ({
  email,
}: ResendResetPasswordCodeRequest): Promise<ResendResetPasswordCodeResponse> => {
  try {
    const res = await httpClient.post<ResendResetPasswordCodeResponse>(
      'auth/resend-reset-password-code',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'resendResetPasswordCode');
  }
};
