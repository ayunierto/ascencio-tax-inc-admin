/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Exception } from '@/core/interfaces/exception.interface';

// Opciones que se pueden pasar a cada petición
export interface RequestOptions {
  headers?: Record<string, string>;
  body?: any; // Puedes usar 'unknown' o 'any' o definir tipos más específicos
  params?: Record<string, string | number>; // Para query parameters
  signal?: AbortSignal; // Para permitir cancelar peticiones desde fuera si es necesario
}

// Errores específicos que puede lanzar el adaptador
export class NetworkError extends Error {
  constructor(
    message = 'Network request failed. Please check your connection.'
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class HttpError extends Error {
  statusCode: number;
  errorData?: any; // Para guardar el cuerpo de la respuesta de error

  constructor(message: string, statusCode: number, errorData?: any) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.errorData = errorData;
  }
}

// La interfaz que deben cumplir todos los adaptadores HTTP
export interface HttpAdapter {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  post<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  patch<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  put<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
