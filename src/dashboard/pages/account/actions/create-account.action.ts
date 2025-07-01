import { httpClient } from '@/adapters/http/httpClient.adapter';
import { CreateAccountInputs } from '../schemas';
import { CreateAccountTypeResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const createAccount = async (
  values: CreateAccountInputs
): Promise<CreateAccountTypeResponse> => {
  try {
    const res = await httpClient.post<CreateAccountTypeResponse>(
      'account-types',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'createAccountType');
  }
};
