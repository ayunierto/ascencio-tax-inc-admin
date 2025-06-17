import { Exception } from '@/interfaces/exception.interface';
import { SignUpRequest, SignUpResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleErrors } from '../utils';

/**
 * Signs up a new user by sending their details to the 'auth/signup' endpoint.
 *
 * @async
 * @function signupAction
 * @param {SignUpRequest} newUser - The request object containing the user's email, password, and other details.
 * @returns {Promise<SignUpResponse | Exception>} Returns a Promise that resolves to either:
 *  - SignUpResponse: The successful response containing user registration details
 *  - Exception: An error object with the following properties:
 *    - message: Description of the error
 *    - statusCode: HTTP status code (408 for network errors, original status code for HTTP errors, or 500 for others)
 *    - error: Type of error ('Http Error', 'Network Error', or error name)
 *
 * @throws {HttpError} When the server responds with an error status
 * @throws {NetworkError} When there are network connectivity issues
 * @throws {Error} For any other unexpected errors
 */
export const signupAction = async (
  newUser: SignUpRequest
): Promise<SignUpResponse | Exception> => {
  newUser.email = newUser.email.toLocaleLowerCase().trim();

  try {
    const response = await httpClient.post<SignUpResponse>('auth/signup', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    return response;
  } catch (error) {
    console.error('Error caught in signupAction: ', error);
    return handleErrors(error);
  }
};
