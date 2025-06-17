import { httpClient } from '@/adapters/http/httpClient.adapter';
import { Exception } from '@/interfaces';

export interface RemoveImageResponse {
  result: string;
}

export const removeImageAction = async (
  public_id: string
): Promise<RemoveImageResponse | Exception> => {
  try {
    const response = await httpClient.delete<RemoveImageResponse | Exception>(
      `images/${public_id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw new Error('The image could not be removed');
  }
};
