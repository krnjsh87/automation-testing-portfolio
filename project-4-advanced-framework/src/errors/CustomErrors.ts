/**
 * Custom error classes for the test framework.
 * Demonstrates structured error handling patterns.
 */

/**
 * Base class for all framework errors
 */
export class FrameworkError extends Error {
  constructor(message: string, public readonly context?: Record<string, unknown>) {
    super(message);
    this.name = 'FrameworkError';
  }
}

/**
 * Thrown when a page element cannot be found
 */
export class ElementNotFoundError extends FrameworkError {
  constructor(selector: string, timeout?: number) {
    super(`Element not found: "${selector}" within ${timeout || 5000}ms`);
    this.name = 'ElementNotFoundError';
  }
}

/**
 * Thrown when navigation fails
 */
export class NavigationError extends FrameworkError {
  constructor(url: string, reason?: string) {
    super(`Navigation failed to "${url}": ${reason || 'unknown reason'}`);
    this.name = 'NavigationError';
  }
}

/**
 * Thrown when a test assertion fails with context
 */
export class AssertionError extends FrameworkError {
  constructor(expected: unknown, actual: unknown, message?: string) {
    super(
      message || `Assertion failed: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
    this.name = 'AssertionError';
  }
}

/**
 * Thrown when database operations fail
 */
export class DatabaseError extends FrameworkError {
  constructor(operation: string, reason: string) {
    super(`Database ${operation} failed: ${reason}`);
    this.name = 'DatabaseError';
  }
}

/**
 * Thrown when configuration is invalid or missing
 */
export class ConfigurationError extends FrameworkError {
  constructor(key: string) {
    super(`Missing or invalid configuration: "${key}"`);
    this.name = 'ConfigurationError';
  }
}
