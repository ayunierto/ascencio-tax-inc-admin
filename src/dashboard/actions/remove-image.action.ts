import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleApiErrors } from '@/auth/utils';
import { ExceptionResponse } from '@/interfaces';

export interface RemoveImageResponse {
  result: string;
}

export const removeImage = async (
  public_id: string
): Promise<RemoveImageResponse | ExceptionResponse> => {
  try {
    const response = await httpClient.delete<
      RemoveImageResponse | ExceptionResponse
    >(`images/${public_id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    return handleApiErrors(error, 'removeImage');
  }
};
