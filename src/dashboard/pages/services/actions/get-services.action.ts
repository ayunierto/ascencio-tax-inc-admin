import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Exception } from '@/interfaces';
import { ServiceResponse } from '../interfaces';

export const getServicesAction = async () => {
  try {
    const response = await httpClient.get<ServiceResponse[] | Exception>(
      'services'
    );
    return response;
  } catch (error) {
    console.error('Error in getServicesAction:', error);
    throw new Error('Failed to fetch services');
  }
};
