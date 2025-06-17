import { storageAdapter } from '../StorageAdapter';
import {
  HttpAdapter,
  RequestOptions,
  NetworkError,
  HttpError,
} from './http-client.interface';

const DEFAULT_TIMEOUT = 10000;

export class HttpClientAdapter implements HttpAdapter {
  private readonly baseUrl: string;

  constructor() {
    let apiUrl: string = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      throw new Error(
        'HttpClientAdapter: VITE_API_URL environment variable is not set.'
      );
    }

    if (!apiUrl.startsWith('http'))
      throw new Error(
        'HttpClientAdapter: VITE_API_URL environment must start with the http or https protocol.'
      );

    if (!apiUrl.endsWith('/')) {
      // Make sure the URL ends with a slash '/'
      apiUrl += '/';
    }
    this.baseUrl = apiUrl;
  }

  private async refreshTokenIfNeeded(): Promise<string | null> {
    // TODO: Implement logic to check if the token needs to be refreshed
    // Check if the token is present and has not expired.
    const token = storageAdapter.getItem('token');
    if (token) {
      return token;
    }
    return null;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  ): Promise<T> {
    const url = new URL(endpoint, this.baseUrl);

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    const fetchOptions: RequestInit = {
      method: method,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    };

    const token = await this.refreshTokenIfNeeded();
    if (token) {
      (fetchOptions.headers as Record<string, string>)[
        'Authorization'
      ] = `Bearer ${token}`;
    }

    if (options.body && method !== 'GET') {
      fetchOptions.body = options.body;
    }

    // Config to handle timeouts
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    fetchOptions.signal = controller.signal; // Use the controller's signal for aborting
    if (options.signal) {
      options.signal.addEventListener('abort', () => controller.abort());
    }

    try {
      const response = await fetch(url.toString(), fetchOptions);
      clearTimeout(timeoutId); // Clear the timeout if the request completes

      // Try to parse the response body as JSON
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let responseData: any = null;
      try {
        // Try to parse the response as JSON
        const textResponse = await response.text();
        if (textResponse) {
          responseData = JSON.parse(textResponse);
        }
      } catch (error) {
        // If parsing fails, we assume the response is not JSON or is empty.
        // This can happen for non-JSON responses like HTML error pages, plain text, etc.
        // This means the response did not have a JSON body or it was malformed.
        // We log the error but do not throw, as it could be an expected non-JSON error.
        console.warn(
          'HttpClientAdapter: Failed to parse JSON response body for a non-ok response. Could be an expected non-JSON error, or no body.',
          error
        );
      }

      // If the response is unsuccessful (status code outside of 200-299),
      // but we were able to obtain data (or there was no data but the app expects specific handling of that status code),
      // we return the data along with the HTTP status for the consumer to handle.
      // We modify the return type if necessary to include the status and OK.
      // Or, as in this case, if we don't want to throw an error, we simply return `responseData`
      // and it will be the caller's responsibility to verify the status code of the original response.

      // For 401, 404, 500, etc., if the backend sends a JSON, we will return it.
      // If the response is not OK and a JSON could NOT be parsed (e.g., empty body or unexpected plain text),
      // then we will throw an error.
      if (!response.ok && !responseData) {
        // If the response was unsuccessful AND we couldn't parse a JSON body,
        // we assume it's an unexpected API error (perhaps not JSON, or no body).
        // In this case, we throw an HttpError.
        throw new HttpError(
          `HTTP error ${response.status}. No response data or invalid JSON.`,
          response.status
        );
      }

      // In all other cases (OK response, or not OK response but with parsable JSON body),
      // we return the responseData directly.
      // This includes 401 responses with JSON.
      // The consumer must check `response.status` (if we pass it)
      // or infer the success/failure from the `responseData` structure.

      // To be able to know the status code in the consumer, we can add a property.
      // This means that type T must be able to handle this additional property.
      // One way to do this without changing T is to wrap the response.
      // However, to keep it simple and comply with your request not to throw,
      // we simply return responseData.
      // The caller MUST be prepared for a `responseData` representing an error.

      // If response.ok is true, simply return responseData.

      // If response.ok is false (e.g. 401), but responseData contains the API error,
      // also returns responseData.
      return responseData as T;
    } catch (error) {
      clearTimeout(timeoutId); // Clear the timeout if an error occurs

      // If the error is an instance of HttpError, rethrow it
      // This allows you to handle HTTP errors specifically in your application
      if (error instanceof HttpError) {
        throw error;
      }

      // If the error is an AbortError, it means the request was aborted (e.g., due to timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('HttpClientAdapter: Request timed out.');
        throw new NetworkError('The request timed out. Please try again.');
      }

      // Other network errors or unexpected errors
      if (error instanceof Error) {
        console.error(
          `HttpClientAdapter: Network or unexpected error during ${method}:`,
          error
        );
        // Throw a NetworkError with the error message
        throw new NetworkError(`Unable to complete request. ${error.message}`);
      }

      // If the error is not an instance of Error, log it and throw a generic error
      // This is a fallback for unexpected error types
      console.error(
        `HttpClientAdapter: Unknown error during ${method}:`,
        error
      );
      throw new Error('An unknown error occurred during the request.');
    }
  }

  // Public methods for HTTP requests
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
    return this.request<T>(endpoint, options, 'PUT');
  }

  async delete<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.request<T>(endpoint, options, 'DELETE');
  }
}

export const httpClient = new HttpClientAdapter();
