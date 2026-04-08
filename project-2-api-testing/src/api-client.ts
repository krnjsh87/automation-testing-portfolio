/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public responseBody: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Main API Client class for making HTTP requests.
 * Provides typed methods for all HTTP verbs with error handling.
 */
export class APIClient {
  private baseURL: string;
  private headers: Record<string, string>;
  private timeout: number;

  constructor(baseURL?: string, timeout?: number) {
    this.baseURL = baseURL || process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';
    this.timeout = timeout || parseInt(process.env.API_TIMEOUT || '5000', 10);
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  /**
   * Set authentication header
   */
  setAuthToken(token: string, type: 'Bearer' | 'Basic' = 'Bearer'): void {
    this.headers['Authorization'] = `${type} ${token}`;
  }

  /**
   * Set API key authentication
   */
  setApiKey(apiKey: string, headerName: string = 'X-API-Key'): void {
    this.headers[headerName] = apiKey;
  }

  /**
   * Set custom headers
   */
  setHeaders(headers: Record<string, string>): void {
    this.headers = { ...this.headers, ...headers };
  }

  /**
   * Generic request method with full error handling
   */
  private async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: Record<string, unknown>,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.headers, ...customHeaders };

    const options: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const contentType = response.headers.get('content-type');
      let responseBody: unknown = '';

      if (contentType?.includes('application/json')) {
        responseBody = await response.json();
      } else {
        responseBody = await response.text();
      }

      if (!response.ok) {
        throw new APIError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          JSON.stringify(responseBody)
        );
      }

      return responseBody as T;
    } catch (error: unknown) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new Error(`Request failed: ${(error as Error).message}`);
    }
  }

  /** GET request */
  get<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'GET', undefined, headers);
  }

  /** POST request */
  post<T>(endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'POST', body, headers);
  }

  /** PUT request */
  put<T>(endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PUT', body, headers);
  }

  /** PATCH request */
  patch<T>(endpoint: string, body: Record<string, unknown>, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'PATCH', body, headers);
  }

  /** DELETE request */
  delete<T>(endpoint: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>(endpoint, 'DELETE', undefined, headers);
  }
}
