import { Exception } from '@/interfaces/exception.interface';
import { SigninResponse } from '../interfaces';
import { httpClient } from '@/adapters/http/httpClient.adapter';
import { handleErrors } from '../utils'; // Asegúrate de que handleErrors maneje tanto errores lanzados como objetos Exception si lo deseas

/**
 * Predicado de tipo para determinar si un objeto es una respuesta de error de la API (Exception).
 * Se basa en las propiedades 'message' y 'statusCode' que tu API devuelve para errores.
 * @param {any} obj El objeto a verificar.
 * @returns {boolean} True si el objeto parece una excepción de la API, false en caso contrario.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiErrorResponse(obj: any): obj is Exception {
  // Verificamos si tiene 'message' (string) y 'statusCode' (number)
  // Esto cubrirá tu respuesta 401: { "message": "Unauthorized", "statusCode": 401 }
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.message === 'string' &&
    typeof obj.statusCode === 'number'
    // Nota: No incluimos 'error' en la verificación aquí, ya que tu API no lo envía en el 401
    // y tu interfaz Exception lo tiene. Asumimos que 'error' se puede añadir después
    // o que es opcional en la práctica para la detección inicial.
  );
}

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
export const checkStatus = async (): Promise<SigninResponse | Exception> => {
  try {
    // Definimos el tipo de retorno esperado de httpClient.get como la unión de ambos,
    // ya que el adaptador YA NO LANZA HTTPError para 401 con cuerpo JSON.
    const response = await httpClient.get<SigninResponse | Exception>(
      'auth/check-status',
      {}
    );

    // Es CRUCIAL verificar si la respuesta es un objeto de error de la API.
    // Si la API devuelve un 401 con un cuerpo JSON de error, 'response' será ese JSON.
    // Si la API devuelve 200, 'response' será SigninResponse.
    if (isApiErrorResponse(response)) {
      // Si el objeto parece una excepción de la API, lo retornamos directamente.
      // TypeScript entenderá que 'response' es de tipo 'Exception' aquí.
      return response;
    }

    // Si no es un objeto de error de la API, asumimos que es una respuesta exitosa.
    // TypeScript entenderá que 'response' es de tipo 'SigninResponse' aquí.
    return response;
  } catch (error) {
    // Este bloque 'catch' SOLO se ejecuta si el 'httpClient' lanza un error,
    // es decir, para problemas de red (NetworkError) o si la API respondió con
    // un código no-OK y SIN UN CUERPO JSON VÁLIDO (HttpError).
    // Tu `handleErrors` debe estar preparado para estos tipos de errores.

    // console.error('Error caught in CheckStatusAction (adapter threw error):', error);
    return handleErrors(error);
  }
};
