import { ResetPasswordResponse } from '../interfaces/reset-password-response.interface';
import { ResetPasswordRequest } from '../interfaces';
import { Exception } from '@/interfaces/exception.interface';

export const resetPasswordAction = async ({
  code,
  email,
  newPassword,
}: ResetPasswordRequest): Promise<ResetPasswordResponse | Exception> => {
  try {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    if (!API_URL) throw new Error('No API_URL found');

    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email, newPassword }),
    });

    const data: ResetPasswordResponse | Exception = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Reset Password: Network request failed');
  }
};
