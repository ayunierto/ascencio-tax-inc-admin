import { httpClient } from '@/adapters/http/httpClient.adapter';
import { ResetPasswordRequest, ResetPasswordResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const resetPassword = async ({
  code,
  email,
  newPassword,
}: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
  try {
    const res = await httpClient.post<ResetPasswordResponse>(
      'auth/reset-password',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, email, newPassword }),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'resetPassword');
  }
};
