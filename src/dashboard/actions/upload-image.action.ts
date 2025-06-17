import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Exception, UploadImageFile } from '@/interfaces';

export const uploadImageAction = async (
  file: File
): Promise<UploadImageFile | Exception> => {
  try {
    const formdata = new FormData();
    formdata.append('image', file, file.name);

    const response = await httpClient.post<UploadImageFile | Exception>(
      'images',
      {
        body: formdata,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('The image could not be uploaded');
  }
};
