/**
 * API Test Runner - Executes API test suites using the native fetch API.
 * Part of the unified test orchestration platform.
 */
import { Environment } from '../config/Environment';

export interface ApiTestResult {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  passed: boolean;
  error?: string;
}

export class ApiTestRunner {
  private baseURL: string;
  private results: ApiTestResult[] = [];

  constructor() {
    this.baseURL = Environment.get('API_URL');
  }

  /**
   * Execute a single API test
   */
  async testEndpoint(
    method: string,
    endpoint: string,
    expectedStatus: number = 200,
    body?: Record<string, unknown>
  ): Promise<ApiTestResult> {
    const startTime = Date.now();
    const url = `${this.baseURL}${endpoint}`;

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(url, options);
      const responseTime = Date.now() - startTime;

      const result: ApiTestResult = {
        endpoint,
        method,
        statusCode: response.status,
        responseTime,
        passed: response.status === expectedStatus,
      };

      if (!result.passed) {
        result.error = `Expected ${expectedStatus}, got ${response.status}`;
      }

      this.results.push(result);
      return result;
    } catch (error: unknown) {
      const result: ApiTestResult = {
        endpoint,
        method,
        statusCode: 0,
        responseTime: Date.now() - startTime,
        passed: false,
        error: (error as Error).message,
      };

      this.results.push(result);
      return result;
    }
  }

  /**
   * Run a predefined API health check suite
   */
  async runHealthCheck(): Promise<ApiTestResult[]> {
    await this.testEndpoint('GET', '/users', 200);
    await this.testEndpoint('GET', '/posts', 200);
    await this.testEndpoint('GET', '/todos', 200);
    await this.testEndpoint('GET', '/users/99999', 404);
    return this.results;
  }

  /**
   * Get all results
   */
  getResults(): ApiTestResult[] {
    return [...this.results];
  }

  /**
   * Get pass rate
   */
  getPassRate(): number {
    if (this.results.length === 0) return 0;
    return (this.results.filter(r => r.passed).length / this.results.length) * 100;
  }
}
