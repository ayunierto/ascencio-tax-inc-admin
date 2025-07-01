import { httpClient } from '@/adapters/http/httpClient.adapter';
import {
  ResendEmailVerificationCodeRequest,
  ResendEmailVerificationResponse,
} from '../interfaces';
import { handleApiErrors } from '../utils';

export const resendEmailCode = async ({
  email,
}: ResendEmailVerificationCodeRequest): Promise<ResendEmailVerificationResponse> => {
  try {
    const res = await httpClient.post<ResendEmailVerificationResponse>(
      'auth/resend-email-code',
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
    return handleApiErrors(error, 'resendEmailCode');
  }
};
