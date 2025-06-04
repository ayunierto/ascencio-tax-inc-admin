import { Exception } from '../../interfaces/exception.interface';
import { SigninResponse, SigninRequest } from '../interfaces';
import { httpClient } from '../../adapters/http/httpClient.adapter';
import { handleErrors } from '../utils';

/**
 * Signs in a user by sending their credentials to the 'auth/signin' endpoint.
 *
 * @async
 * @function signinAction
 * @param {SigninRequest} credentials - The request object containing the user's email and password.
 * @returns {Promise<SigninResponse | Exception>} Returns a Promise that resolves to either:
 *  - SigninResponse: The successful response containing user authentication details
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const signinAction = async (
  credentials: SigninRequest
): Promise<SigninResponse | Exception> => {
  try {
    const response = await httpClient.post<SigninResponse>('auth/signin', {
      body: credentials,
    });
    return response;
  } catch (error) {
    console.error('Error caught in signinAction:', error);

    return handleErrors(error);
  }
};
