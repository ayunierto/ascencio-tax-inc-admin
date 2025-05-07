import { Exception } from '@/interfaces/exception.interface';
import { SigninResponse, SigninRequest } from '../interfaces';
import { httpClient } from '@/utils/adapters/fetch.adapter';
import {
  HttpError,
  NetworkError,
} from '@/utils/adapters/http-adapter.interface';

export const signinAction = async (
  credentials: SigninRequest
): Promise<SigninResponse | Exception> => {
  // Mantenemos el tipo de retorno por compatibilidad con store/hooks
  try {
    // Llama al método post del adaptador
    const response = await httpClient.post<SigninResponse>('auth/signin', {
      body: credentials,
    });
    // Si la petición es exitosa, el adaptador devuelve los datos parseados
    return response;
  } catch (error) {
    // El adaptador ya ha manejado y clasificado el error (NetworkError, HttpError)
    console.error('Error caught in signinAction:', error);

    // Si es un error HTTP con datos (posiblemente formato Exception)
    if (error instanceof HttpError && error.errorData) {
      // Puedes retornar directamente los datos del error si coinciden con tu tipo Exception
      // O puedes crear un nuevo objeto Exception basado en HttpError
      return {
        message: error.message,
        statusCode: error.statusCode,
        error: error.errorData?.error || 'Http Error', // Intenta obtener el 'error' del cuerpo
        // ... otros campos de Exception si existen en errorData
      } as Exception;
    }

    // Si es un error de Red
    if (error instanceof NetworkError) {
      return {
        message: error.message,
        statusCode: 408, // O 503 Service Unavailable, o 0 podría ser más representativo
        error: 'Network Error',
      } as Exception;
    }

    // Si es un HttpError sin datos específicos o cualquier otro error
    if (error instanceof Error) {
      return {
        message: error.message,
        // Intenta obtener el statusCode si es HttpError, sino usa 500
        statusCode: error instanceof HttpError ? error.statusCode : 500,
        error: error.name, // 'HttpError', 'NetworkError', o 'Error'
      } as Exception;
    }

    // Fallback para errores desconocidos
    return {
      message: 'An unexpected error occurred in signin.',
      statusCode: 500,
      error: 'Unknown Error',
    } as Exception;
  }
};
