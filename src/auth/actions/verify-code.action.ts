import { Exception } from '@/interfaces/exception.interface';
import { VerifyCodeRequest, VerifyCodeResponse } from '../interfaces';

export const verifyCodeAction = async ({
  code,
  email,
}: VerifyCodeRequest): Promise<VerifyCodeResponse | Exception> => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  try {
    const response = await fetch(`${API_URL}/auth/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, email }),
    });

    const data: VerifyCodeResponse | Exception = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Verify Code: Network request failed');
  }
};
