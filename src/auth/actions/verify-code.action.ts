import { Exception } from '@/interfaces/exception.interface';
import { VerifyCodeRequest, VerifyCodeResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleErrors } from '../utils';

/**
 * Verifies a code sent to the user's email by sending a POST request to 'auth/verify-code' endpoint.
 *
 * @async
 * @function verifyCodeAction
 * @param {VerifyCodeRequest} request - The request object containing the verification code and email.
 * @returns {Promise<VerifyCodeResponse | Exception>} Returns a Promise that resolves to either:
 *  - VerifyCodeResponse: The successful response indicating code verification
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const verifyCodeAction = async ({
  code,
  email,
}: VerifyCodeRequest): Promise<VerifyCodeResponse | Exception> => {
  try {
    const response = await httpClient.post<VerifyCodeResponse>(
      'auth/verify-code',
      { body: { code, email } }
    );

    return response;
  } catch (error) {
    console.error('Error caught in verifyCodeAction:', error);

    return handleErrors(error);
  }
};
