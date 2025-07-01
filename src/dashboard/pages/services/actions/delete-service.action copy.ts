import { httpClient } from '@/adapters/http/httpClient.adapter';
import { uploadImage } from '@/dashboard/actions/upload-image.action';
import { DeleteServiceResponse } from '../interfaces/services-responses.interface';
import { DeleteServiceRequest } from '../interfaces/service-request.interface';

export const deleteServiceAction = async (
  service: DeleteServiceRequest
): Promise<DeleteServiceResponse> => {
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

    const response = await httpClient.post<DeleteServiceResponse>('services', {
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
