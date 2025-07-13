import { HttpError, NetworkError } from '@/adapters/http/http-client.interface';

export const handleApiErrors = (
  error: unknown,
  actionName: string
): HttpError => {
  console.error(error);

  if (error instanceof HttpError && error.error) {
    return {
      name: error.error || 'HttpError',
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof NetworkError) {
    return {
      name: 'NetworkError',
      message: error.message,
      statusCode: 408,
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name || 'Error',
      message: error.message,
      statusCode: error instanceof HttpError ? error.statusCode : 500,
    };
  }

  return {
    name: 'UnknownError',
    message: `An unexpected error occurred in ${actionName}.`,
    statusCode: 500,
  };
};
