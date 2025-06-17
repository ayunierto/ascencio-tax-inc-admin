import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Exception } from '@/interfaces';
import { uploadImageAction } from '@/dashboard/actions/upload-image.action';
import { ServiceRequest, ServiceResponse } from '../interfaces';

interface ServiceToUpload {
  name: string;
  isAvailableOnline: boolean;
  address: string;
  duration: number;
  description?: string;
  isActive: boolean;
  images: string[];
  staff: string[];
  price: number;
}

export const createServiceAction = async (
  service: ServiceRequest
): Promise<ServiceResponse | Exception> => {
  try {
    const imageUploaded = await uploadImageAction(service.image);
    if ('error' in imageUploaded) {
      throw new Error('The image could not be uploaded.');
    }

    const newService: ServiceToUpload = {
      name: service.name,
      isAvailableOnline: service.isAvailableOnline,
      address: service.address,
      duration: service.duration,
      description: service.description,
      isActive: service.isActive,
      images: [imageUploaded.image],
      staff: service.staff,
      price: service.price,
    };

    const response = await httpClient.post<ServiceResponse | Exception>(
      'services',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(newService),
      }
    );

    return response;
  } catch (error) {
    // * Important
    // TODO: Delete image if there was an error creating the service.
    console.error(error);
    throw new Error('The service could not be created');
  }
};
