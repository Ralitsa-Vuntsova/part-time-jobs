import { LocalStorage } from '../libs/local-storage';
import { UserToken } from '../models/user-model';

interface HttpRequestConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  abortSignal?: AbortSignal;
  cache?: RequestCache;
}

export class HttpService {
  constructor(private baseUrl = import.meta.env.VITE_REACT_APP_SERVER_URL) {}

  private readonly storage = new LocalStorage<UserToken>('currentUser');

  async post<T>(path: string, config: HttpRequestConfig): Promise<T> {
    return this.request('POST', path, config);
  }

  async get<T>(path: string, config: HttpRequestConfig = {}): Promise<T> {
    return this.request('GET', path, config);
  }

  async put<T>(path: string, config: HttpRequestConfig): Promise<T> {
    return this.request('PUT', path, config);
  }

  async patch<T>(path: string, config: HttpRequestConfig = {}): Promise<T> {
    return this.request('PATCH', path, config);
  }

  async delete<T>(path: string, config: HttpRequestConfig = {}): Promise<T> {
    return this.request('DELETE', path, config);
  }

  private async request<T>(
    method: string,
    path: string,
    config: HttpRequestConfig
  ): Promise<T> {
    const queryParams = new URLSearchParams(config.query).toString();
    const authToken = this.storage.get()?.access_token;

    const response = await fetch(
      `${this.baseUrl}/${path.replace(/^\//, '')}${
        queryParams ? `?${queryParams}` : ''
      }`,
      {
        method,
        body: config.body ? JSON.stringify(config.body) : undefined,
        signal: config.abortSignal,
        headers: {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : undefined),
          ...(config.body ? { 'Content-Type': 'application/json' } : {}),
          ...(config.headers ?? {}),
        },
        cache: config.cache,
      }
    );

    // TODO: Better error handling
    if (response.status === 404) {
      throw new Error('Not Found');
    }

    return response.json();
  }
}
