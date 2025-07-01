import { httpClient } from '@/adapters/http/httpClient.adapter';
import { SignUpRequest, SignUpResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const signUp = async (
  newUser: SignUpRequest
): Promise<SignUpResponse> => {
  newUser.email = newUser.email.toLocaleLowerCase().trim();

  try {
    const res = await httpClient.post<SignUpResponse>('auth/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'registerUser');
  }
};
