import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Service } from '@/dashboard/interfaces';
import { Exception } from '@/interfaces';

export const getServicesAction = async () => {
  try {
    const response = await httpClient.get<Service[] | Exception>('services');
    return response;
  } catch (error) {
    console.error('Error in getServicesAction:', error);
    throw new Error('Failed to fetch services');
  }
};
