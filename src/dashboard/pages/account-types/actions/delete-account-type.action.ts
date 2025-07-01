import { httpClient } from '@/adapters/http/httpClient.adapter';
import { DeleteAccountTypeResponse } from '../interfaces';
import { handleApiErrors } from '@/auth/utils';

export const deleteAccountType = async (
  id: string
): Promise<DeleteAccountTypeResponse> => {
  try {
    const res = await httpClient.delete<DeleteAccountTypeResponse>(
      `account-types/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'deleteAccountType');
  }
};
