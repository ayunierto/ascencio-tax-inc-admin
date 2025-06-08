import { Exception } from '@/interfaces/exception.interface';
import { SigninResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleErrors } from '../utils';

/**
 * Checks the authentication status of the user by making a GET request to 'auth/check-status' endpoint.
 *
 * @async
 * @function checkStatus
 * @returns {Promise<SigninResponse | Exception>} Returns a Promise that resolves to either:
 * - SigninResponse: The successful authentication status response.
 * - Exception: An error object returned directly by the API (e.g., for 401 Unauthorized).
 *
 * @throws {NetworkError} When there are network connectivity issues or timeouts (these are errors launched by the adapter).
 * @throws {HttpError} When the server responds with a non-OK status code AND no parsable JSON body (these are errors launched by the adapter).
 * @throws {Error} For any other unexpected errors launched by the adapter.
 */
export const checkStatusAction = async (): Promise<
  SigninResponse | Exception
> => {
  try {
    const response = await httpClient.get<SigninResponse | Exception>(
      'auth/check-status',
      {}
    );

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
