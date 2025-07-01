import { httpClient } from '@/adapters/http/httpClient.adapter';
import { uploadImage } from '@/dashboard/actions/upload-image.action';
import { CreateServiceResponse } from '../interfaces/services-responses.interface';
import { CreateServiceRequest } from '../interfaces/service-request.interface';

export const createServiceAction = async (
  service: CreateServiceRequest
): Promise<CreateServiceResponse> => {
  try {
    let image: string | undefined;

    if (service.image && !(typeof service.image === 'string')) {
      const imageUploaded = await uploadImage(service.image);
      if ('error' in imageUploaded) {
        console.error(imageUploaded);
        throw new Error('The image could not be uploaded.');
      }
      image = imageUploaded.image;
    } else {
      image = service.image;
    }

    const response = await httpClient.post<CreateServiceResponse>('services', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...service, image }),
    });

    return response;
  } catch (error) {
    // * Important
    // TODO: Delete image if there was an error creating the service.
    console.error(error);
    throw new Error('The service could not be created');
  }
};
