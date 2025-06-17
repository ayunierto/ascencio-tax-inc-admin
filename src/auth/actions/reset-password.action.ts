import { Exception } from '@/interfaces/exception.interface';
import { ResetPasswordRequest, ResetPasswordResponse } from '../interfaces';
import { handleErrors } from '../utils';
import { httpClient } from '@/adapters/http/httpClient.adapter';

/**
 * Resets the user's password by sending a POST request to 'auth/reset-password' endpoint.
 *
 * @async
 * @function resetPasswordAction
 * @param {ResetPasswordRequest} request - The request object containing the reset code, email, and new password.
 * @returns {Promise<ResetPasswordResponse | Exception>} Returns a Promise that resolves to either:
 *  - ResetPasswordResponse: The successful response indicating password reset
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const resetPasswordAction = async ({
  code,
  email,
  newPassword,
}: ResetPasswordRequest): Promise<ResetPasswordResponse | Exception> => {
  try {
    const response = await httpClient.post<ResetPasswordResponse>(
      'auth/reset-password',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ code, email, newPassword }),
      }
    );

    return response;
  } catch (error) {
    console.error('Error caught in resetPasswordAction:', error);

    return handleErrors(error);
  }
};
