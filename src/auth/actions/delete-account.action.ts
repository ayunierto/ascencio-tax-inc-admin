import { Exception } from '@/interfaces/exception.interface';
import { DeleteAccountRequest, DeleteAccountResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleErrors } from '../utils';

/**
 * Deletes the user's account by sending a POST request to 'auth/delete-account' endpoint.
 *
 * @async
 * @function deleteAccountAction
 * @param {DeleteAccountRequest} request - The request object containing the user's password.
 * @returns {Promise<DeleteAccountResponse | Exception>} Returns a Promise that resolves to either:
 *  - DeleteAccountResponse: The successful response indicating account deletion
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const deleteAccountAction = async ({
  password,
}: DeleteAccountRequest): Promise<DeleteAccountResponse | Exception> => {
  try {
    const response = await httpClient.post<DeleteAccountResponse>(
      'auth/delete-account',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ password }),
      }
    );

    return response;
  } catch (error) {
    console.error(error);

    return handleErrors(error);
  }
};
