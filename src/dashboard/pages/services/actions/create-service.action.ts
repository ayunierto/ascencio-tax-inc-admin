import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Exception } from '@/interfaces';
import { uploadImageAction } from '@/dashboard/actions/upload-image.action';
import { ServiceRequest, ServiceResponse } from '../interfaces';

export const createServiceAction = async (
  service: ServiceRequest
): Promise<ServiceResponse | Exception> => {
  try {
    const uploadImageResponse = await uploadImageAction(service.image);
    console.warn(uploadImageResponse);

    const response = await httpClient.post<ServiceResponse | Exception>(
      'services',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(service),
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    throw new Error('The service could not be created');
  }
};
