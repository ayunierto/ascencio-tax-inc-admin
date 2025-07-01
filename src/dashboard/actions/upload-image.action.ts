import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleApiErrors } from '@/auth/utils';
import { ExceptionResponse, UploadImageFile } from '@/interfaces';

export const uploadImage = async (
  file: File
): Promise<UploadImageFile | ExceptionResponse> => {
  try {
    const formdata = new FormData();
    formdata.append('image', file, file.name);

    const response = await httpClient.post<UploadImageFile | ExceptionResponse>(
      'images',
      {
        body: formdata,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'uploadImage');
  }
};
