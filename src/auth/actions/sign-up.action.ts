import { Exception } from '@/interfaces/exception.interface';
import { SignUpRequest, SignUpResponse } from '../interfaces';

export const signupAction = async (
  newUser: SignUpRequest
): Promise<SignUpResponse | Exception> => {
  newUser.email = newUser.email.toLocaleLowerCase().trim();

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const data: SignUpResponse | Exception = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Sign up: Network request failed');
  }
};
