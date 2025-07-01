import { httpClient } from '@/adapters/http/httpClient.adapter';
import { DeleteAccountRequest, DeleteAccountResponse } from '../interfaces';
import { handleApiErrors } from '../utils';

export const deleteAccount = async (
  data: DeleteAccountRequest
): Promise<DeleteAccountResponse> => {
  try {
    const res = await httpClient.delete<DeleteAccountResponse>(
      'auth/delete-account',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    return res;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'deleteAccount');
  }
};
