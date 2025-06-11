import { httpClient } from '@/adapters/http/httpClient.adapter';
import { UploadImageFile } from '@/interfaces';

export const uploadImageAction = async (
  file: File
): Promise<UploadImageFile> => {
  try {
    const formdata = new FormData();
    formdata.append('file', file, file.name);

    const response = await httpClient.post<UploadImageFile>('files/upload', {
      body: formdata,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('The image could not be uploaded');
  }
};
