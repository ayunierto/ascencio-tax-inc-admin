import { Exception } from '@/interfaces';
import { ForgotPasswordRequest, ForgotPasswordResponse } from '../interfaces';
import { handleErrors } from '../utils';
import { httpClient } from '@/adapters/http/httpClient.adapter';

/**
 * Sends a request to reset the user's password by providing their email address.
 *
 * @async
 * @function forgotPasswordAction
 * @param {ForgotPasswordRequest} request - The request object containing the user's email.
 * @returns {Promise<ForgotPasswordResponse | Exception>} Returns a Promise that resolves to either:
 *  - ForgotPasswordResponse: The successful response indicating that a reset link has been sent
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const forgotPasswordAction = async ({
  email,
}: ForgotPasswordRequest): Promise<ForgotPasswordResponse | Exception> => {
  try {
    const response = await httpClient.post<ForgotPasswordResponse>(
      'auth/forgot-password',
      {
        body: { email },
      }
    );

    return response;
  } catch (error) {
    console.error('Error in forgotPasswordAction:', error);
    return handleErrors(error);
  }
};
