/**
 * Environment configuration for the full-stack testing platform.
 * Centralizes all environment-specific settings.
 */
export class Environment {
  private static config: Record<string, string> = {
    BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com',
    API_URL: process.env.API_URL || 'https://jsonplaceholder.typicode.com',
    LT_USERNAME: process.env.LT_USERNAME || '',
    LT_ACCESS_KEY: process.env.LT_ACCESS_KEY || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'testdb',
    DB_USER: process.env.DB_USER || 'testuser',
    DB_PASSWORD: process.env.DB_PASSWORD || 'testpass',
    ENVIRONMENT: process.env.NODE_ENV || 'staging',
    K6_VUS: process.env.K6_VUS || '10',
    K6_DURATION: process.env.K6_DURATION || '30s',
  };

  /**
   * Get a configuration value
   */
  static get(key: string): string {
    return Environment.config[key] || '';
  }

  /**
   * Check if running in CI
   */
  static isCI(): boolean {
    return process.env.CI === 'true';
  }

  /**
   * Check if LambdaTest credentials are available
   */
  static hasLambdaTestCredentials(): boolean {
    return !!(Environment.config.LT_USERNAME && Environment.config.LT_ACCESS_KEY);
  }

  /**
   * Get current environment name
   */
  static getEnvironment(): string {
    return Environment.config.ENVIRONMENT;
  }
}
