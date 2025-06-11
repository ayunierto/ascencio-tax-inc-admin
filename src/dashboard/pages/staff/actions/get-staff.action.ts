import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Staff } from '../interfaces';
import { Exception } from '@/interfaces';

export const getStaffAction = () => {
  try {
    const response = httpClient.get<Staff[] | Exception>('staff', {
      headers: { 'Content-Type': 'application/json' },
    });
    return response;
  } catch (error) {
    console.error('Error in getStaffAction: ', error);
    throw new Error('Failed to fetch staff members');
  }
};
