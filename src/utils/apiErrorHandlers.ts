import { HttpError, NetworkError } from '@/adapters/http/http-client.interface';

/**
 * @description Handles various types of API errors and returns a standardized HttpError.
 * @param error The raw error object caught from an API call.
 * @param actionName A descriptive name of the action where the error occurred (e.g., 'createUser', 'fetchProducts').
 * @returns A standardized HttpError object.
 */
export const handleApiErrors = (
  error: unknown,
  actionName: string
): HttpError => {
  // If the error is already an instance of HttpError
  if (error instanceof HttpError) {
    console.error(`HttpError in ${actionName}:`, error);
    return error;
  }

  // If the error is an instance of NetworkError
  if (error instanceof NetworkError) {
    console.error(`NetworkError in ${actionName}:`, error);
    return new HttpError(
      error.message,
      408, // Request Timeout
      'Network Error'
    );
  }

  // If the error is a generic Error instance
  if (error instanceof Error) {
    console.error(`Generic Error in ${actionName}:`, error);
    return new HttpError(
      error.message || `An unexpected error occurred in ${actionName}.`,
      500, // Internal Server Error for default
      error.name || 'Generic Error'
    );
  }

  // For unknown errors that are not instances of Error
  console.error(`Unknown Error in ${actionName}:`, error);
  return new HttpError(
    `An unexpected error occurred in ${actionName}.`,
    500,
    'Unknown Error'
  );
};
