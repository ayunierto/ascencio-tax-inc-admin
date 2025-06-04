import { HttpError, NetworkError } from '@/adapters/http/http-client.interface';
import { Exception } from '@/interfaces'; // Asegúrate de que esta ruta sea correcta

export const handleErrors = (error: unknown): Exception => {
  // Se asegura de que siempre retorne Exception
  // Si el error es un HttpError con datos de error específicos (ej. tu API devuelve un JSON con errorData)
  // Aunque tu 401 no tiene 'error' en el body, otros errores de la API podrían tenerlo.
  // Aquí estamos forzando que se incluya 'error: "Http Error"' si no viene de la API.
  if (error instanceof HttpError && error.errorData) {
    // Si errorData contiene 'error', úsalo, si no, usa un valor por defecto.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiErrorType = (error.errorData as any).error || 'Http Error';
    return {
      message: error.message, // Podría ser el mensaje del backend o el genérico de HttpError
      statusCode: error.statusCode,
      error: apiErrorType,
    };
  }

  // Si el error es un NetworkError
  if (error instanceof NetworkError) {
    return {
      message: error.message,
      statusCode: 408, // Mantener tu status code de NetworkError
      error: 'Network Error', // Aseguramos que la propiedad 'error' esté presente
    };
  }

  // Si es cualquier otro tipo de Error (ej. Error genérico lanzado por el adaptador
  // cuando response.ok es false y no hay body JSON válido), o HttpError sin errorData
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: error instanceof HttpError ? error.statusCode : 500, // Usa el statusCode de HttpError si aplica, sino 500
      error: error.name === 'HttpError' ? 'Http Error' : error.name, // Aseguramos la propiedad 'error'
    };
  }

  // Fallback para errores desconocidos
  return {
    message: 'An unexpected error occurred.', // Mensaje más genérico
    statusCode: 500,
    error: 'Unknown Error', // Aseguramos la propiedad 'error'
  };
};
