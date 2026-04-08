/**
 * TestConfig Singleton - Central configuration management.
 * Demonstrates the Singleton design pattern for shared config state.
 */
export class TestConfig {
  private static instance: TestConfig;
  private config: Record<string, string>;

  private constructor() {
    this.config = {
      baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
      apiURL: process.env.API_URL || 'https://jsonplaceholder.typicode.com',
      defaultTimeout: process.env.TIMEOUT || '10000',
      environment: process.env.NODE_ENV || 'test',
      logLevel: process.env.LOG_LEVEL || 'info',
    };
  }

  /**
   * Get the singleton instance
   */
  public static getInstance(): TestConfig {
    if (!TestConfig.instance) {
      TestConfig.instance = new TestConfig();
    }
    return TestConfig.instance;
  }

  /**
   * Get a config value by key
   */
  get(key: string): string {
    return this.config[key] || '';
  }

  /**
   * Set a config value
   */
  set(key: string, value: string): void {
    this.config[key] = value;
  }

  /**
   * Get all config as a readonly object
   */
  getAll(): Readonly<Record<string, string>> {
    return { ...this.config };
  }

  /**
   * Reset instance (for testing purposes)
   */
  public static resetInstance(): void {
    TestConfig.instance = undefined as unknown as TestConfig;
  }
}
