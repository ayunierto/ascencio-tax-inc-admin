import { ForgotPasswordRequest, ForgotPasswordResponse } from '../interfaces';

export const forgotPasswordAction = async ({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
  try {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;

    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data: ForgotPasswordResponse = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Reset Password: Network request failed');
  }
};
