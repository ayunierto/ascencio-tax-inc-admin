import { httpClient } from '@/adapters/http/httpClient.adapter';
import { User } from '@/dashboard/interfaces';
import { Exception } from '@/interfaces';

export const getUsersAction = async () => {
  try {
    const response = await httpClient.get<User[] | Exception>('users');
    return response;
  } catch (error) {
    console.error('Error in getUsersAction:', error);
    throw new Error('Failed to fetch users');
  }
};
