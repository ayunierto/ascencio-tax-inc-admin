import { httpClient } from '@/adapters/http/httpClient.adapter';
import { ServiceResponse } from '../interfaces';
import { Exception } from '@/interfaces';

export const deleteServiceAction = async (
  id: string
): Promise<ServiceResponse | Exception> => {
  try {
    const response = await httpClient.delete<ServiceResponse | Exception>(
      `services/${id}`
    );
    // TODO: Delete image
    return response;
  } catch (error) {
    throw new Error('The service could not be created');
    console.error(error);
  }
};
