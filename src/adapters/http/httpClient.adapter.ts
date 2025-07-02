import { CheckStatusResponse } from '@/auth/interfaces';
import { storageAdapter } from '../StorageAdapter';
import {
  HttpAdapter,
  RequestOptions,
  NetworkError,
  HttpError,
} from './http-client.interface';

const DEFAULT_TIMEOUT: number = 10000;

export class HttpClientAdapter implements HttpAdapter {
  private readonly baseUrl: string;

  constructor() {
    let apiUrl: string = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error(
        'HttpClientAdapter: VITE_API_URL environment variable is not set.'
      );
    }
    if (!apiUrl.startsWith('http')) {
      throw new Error(
        'HttpClientAdapter: VITE_API_URL environment must start with the http or https protocol.'
      );
    }
    if (!apiUrl.endsWith('/')) {
      apiUrl += '/';
    }
    this.baseUrl = apiUrl;
  }

  // Refresca el token en cada peticion para mantaner al usuario logeado.
  private async refreshToken(): Promise<string | null> {
    const token = await storageAdapter.getAccessToken();
    if (!token) {
      console.warn('No token found in storage');
      return null;
    }
    try {
      const res = await fetch(this.baseUrl + 'auth/check-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.warn('Reflesh token failed');
        return null;
      }
      const data: CheckStatusResponse = await res.json();
      if ('statusCode' in data) {
        console.warn(data.message);
        return null;
      }
      await storageAdapter.setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      console.warn(error);
      return null;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  ): Promise<T> {
    // Función para ejecutar la lógica de la petición, para poder reintentarla.
    const processedOptions: RequestOptions = options;

    const url: URL = new URL(
      endpoint.startsWith('/') ? endpoint.slice(1) : endpoint,
      this.baseUrl
    );
    if (processedOptions.params) {
      Object.entries(processedOptions.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const fetchOptions: RequestInit = {
      method: method,
      headers: {
        Accept: 'application/json',
        ...processedOptions.headers,
      },
    };

    // Añadir token de autorización si existe
    const token = await this.refreshToken();
    if (token) {
      (fetchOptions.headers as Record<string, string>)[
        'Authorization'
      ] = `Bearer ${token}`;
    }

    // Handle body types : FormData | object | string
    if (processedOptions.body && method !== 'GET') {
      if (processedOptions.body instanceof FormData) {
        // Si es FormData, lo pasamos directamente.
        // IMPORTANTE: NO establecemos el 'Content-Type'. El navegador lo hará
        // automáticamente con el 'boundary' correcto.
        fetchOptions.body = processedOptions.body;
      } else if (typeof processedOptions.body === 'object') {
        // Si es un objeto normal, lo convertimos a JSON.
        (fetchOptions.headers as Record<string, string>)['Content-Type'] =
          'application/json';
        fetchOptions.body = JSON.stringify(processedOptions.body);
      } else {
        // Para otros tipos de body (ej. string) que ya han sido pasados por el método stringify.
        fetchOptions.body = processedOptions.body as BodyInit;
      }
    }

    const controller: AbortController = new AbortController();
    const timeoutId: NodeJS.Timeout = setTimeout(
      () => controller.abort(),
      DEFAULT_TIMEOUT
    );
    fetchOptions.signal = controller.signal;
    if (processedOptions.signal) {
      processedOptions.signal.addEventListener('abort', () =>
        controller.abort()
      );
    }

    try {
      const response: Response = await fetch(url.toString(), fetchOptions);
      clearTimeout(timeoutId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let responseData: any = null;
      const textResponse: string = await response.text();
      if (textResponse) {
        try {
          responseData = JSON.parse(textResponse);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          console.warn(
            'HttpClientAdapter: Failed to parse JSON response body.'
          );
        }
      }

      // Si la respuesta no es exitosa (status code fuera de 200-299)
      if (!response.ok) {
        // responseData podría contener el objeto Exception de tu backend
        const errorMessage =
          responseData?.message || `HTTP error ${response.status}`;
        throw new HttpError(errorMessage, response.status, responseData);
      }

      // Si la respuesta es exitosa
      return responseData as T;
    } catch (error) {
      clearTimeout(timeoutId);

      // Si ya es un HttpError (lanzado por !response.ok),
      if (error instanceof HttpError) {
        throw error;
      }

      // Si es un error de AbortController (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('FetchAdapter: Request timed out.');
        throw new NetworkError('The request timed out. Please try again.');
      }

      // Otros errores (fallo de red, DNS, CORS, etc.) se suelen manifestar como TypeError
      if (error instanceof Error) {
        throw new NetworkError(`Unable to complete request. ${error.message}`);
      }

      // Error completamente inesperado
      throw new Error('An unexpected error occurred during the request.');
    }
  }

  // Los métodos públicos no cambian
  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'GET');
  }

  async post<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'POST');
  }

  async patch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'PATCH');
  }

  async put<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'PATCH');
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'PATCH');
  }
}

export const httpClient = new HttpClientAdapter();
