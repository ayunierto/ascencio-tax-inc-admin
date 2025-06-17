export interface RequestOptions {
  headers?: HeadersInit;
  body?: BodyInit;
  params?: Record<string, string | number>;
  signal?: AbortSignal;
}

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
  errorData?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    errorData?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.errorData = errorData;
  }
}

export interface HttpAdapter {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  post<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  put<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  patch<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
}
