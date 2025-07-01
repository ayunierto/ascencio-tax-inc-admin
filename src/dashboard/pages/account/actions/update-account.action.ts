import { httpClient } from '@/adapters/http/httpClient.adapter';
import { UpdateAccountTypeInputs } from '../schemas';
import { UpdateAccountTypeResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const updateAccountType = async (
  accountType: UpdateAccountTypeInputs
): Promise<UpdateAccountTypeResponse> => {
  const { id, ...rest } = accountType;
  try {
    const res = await httpClient.patch<UpdateAccountTypeResponse>(
      `account-types/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rest),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'updateAccountType');
  }
};
