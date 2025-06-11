import { HttpError, NetworkError } from '@/adapters/http/http-client.interface';
import { Exception } from '@/interfaces';

export const handleErrors = (error: unknown): Exception => {
  if (error instanceof HttpError && error.errorData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiErrorType = (error.errorData as any).error || 'Http Error';
    return {
      message: error.message,
      statusCode: error.statusCode,
      error: apiErrorType,
    };
  }

  if (error instanceof NetworkError) {
    return {
      message: error.message,
      statusCode: 408,
      error: 'Network Error',
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: error instanceof HttpError ? error.statusCode : 500,
      error: error.name === 'HttpError' ? 'Http Error' : error.name,
    };
  }

  return {
    message: 'An unexpected error occurred.',
    statusCode: 500,
    error: 'Unknown Error',
  };
};
