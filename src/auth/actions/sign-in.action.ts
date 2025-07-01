import { handleApiErrors } from '../utils';
import { SignInRequest, SignInResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';

export const singIn = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  try {
    const res = await httpClient.post<SignInResponse>('auth/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'singIn');
  }
};
