import { HttpError, NetworkError } from '@/adapters/http/http-client.interface';
import { ExceptionResponse } from '@/interfaces';

export const handleApiErrors = (
  error: unknown,
  actionName: string
): ExceptionResponse => {
  if (error instanceof HttpError && error.errorData) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      error: error.errorData?.error || 'Http Error',
    } as ExceptionResponse;
  }

  if (error instanceof NetworkError) {
    return {
      message: error.message,
      statusCode: 408,
      error: 'Network Error',
    } as ExceptionResponse;
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: error instanceof HttpError ? error.statusCode : 500,
      error: error.name, // 'HttpError', 'NetworkError', o 'Error'
    } as ExceptionResponse;
  }

  return {
    message: `An unexpected error occurred in ${actionName}.`,
    statusCode: 500,
    error: 'Unknown Error',
  } as ExceptionResponse;
};
