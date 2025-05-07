import { Exception } from '@/interfaces/exception.interface';
import { DeleteAccountRequest, DeleteAccountResponse } from '../interfaces';
import { StorageAdapter } from '@/utils/adapters/storage.adapter';

export const deleteAccountAction = async ({
  password,
}: DeleteAccountRequest): Promise<DeleteAccountResponse | Exception> => {
  console.warn({ password });
  try {
    const API_URL = process.env.API_URL;

    const token = StorageAdapter.getItem('token');
    if (!token) {
      throw new Error('Token not found');
    }

    const response = await fetch(`${API_URL}/auth/delete-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    const data: DeleteAccountResponse | Exception = await response.json();
    console.warn({ data });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Delete Account: Network request failed');
  }
};
