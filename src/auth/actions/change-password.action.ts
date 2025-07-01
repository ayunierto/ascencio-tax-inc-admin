import { handleApiErrors } from '../utils';
import { ChangePasswordRequest, ChangePasswordResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';

export const changePassword = async ({
  currentPassword,
  newPassword,
}: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const res = await httpClient.post<ChangePasswordResponse>('auth/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'changePassword');
  }
};
