/**
 * Response validator for API testing.
 * Provides schema validation, field checks, and response time validation.
 */
export class ResponseValidator {
  /**
   * Check if response has required properties
   */
  hasRequiredProperties(data: Record<string, unknown>, properties: string[]): boolean {
    return properties.every(prop => prop in data);
  }

  /**
   * Validate status code matches expected
   */
  validateStatusCode(statusCode: number, expected: number | number[]): boolean {
    if (Array.isArray(expected)) {
      return expected.includes(statusCode);
    }
    return statusCode === expected;
  }

  /**
   * Validate response time is within threshold (ms)
   */
  validateResponseTime(responseTime: number, maxTime: number): boolean {
    return responseTime <= maxTime;
  }

  /**
   * Validate content type header
   */
  validateContentType(contentType: string | null, expected: string): boolean {
    return contentType?.includes(expected) || false;
  }

  /**
   * Deep equality check using JSON serialization
   */
  deepEqual(obj1: unknown, obj2: unknown): boolean {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  /**
   * Check if value is within a numeric range
   */
  isInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  /**
   * Validate email format using regex
   */
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
