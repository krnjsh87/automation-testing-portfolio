/**
 * Strategy Pattern - Interchangeable test execution strategies.
 * Demonstrates the Strategy design pattern for flexible test behavior.
 */

/**
 * Interface for test execution strategies
 */
export interface TestStrategy {
  name: string;
  execute(testName: string): Promise<void>;
  shouldRetry(error: Error): boolean;
}

/**
 * Fast strategy - minimal waits, no retries (for smoke tests)
 */
export class FastStrategy implements TestStrategy {
  name = 'fast';

  async execute(testName: string): Promise<void> {
    console.log(`[FastStrategy] Running: ${testName} (no waits, no retries)`);
  }

  shouldRetry(_error: Error): boolean {
    return false;
  }
}

/**
 * Resilient strategy - retries on failure with backoff
 */
export class ResilientStrategy implements TestStrategy {
  name = 'resilient';
  private maxRetries: number;

  constructor(maxRetries: number = 3) {
    this.maxRetries = maxRetries;
  }

  async execute(testName: string): Promise<void> {
    console.log(`[ResilientStrategy] Running: ${testName} (max ${this.maxRetries} retries)`);
  }

  shouldRetry(error: Error): boolean {
    // Retry on network or timeout errors
    return error.message.includes('timeout') || error.message.includes('net::');
  }
}

/**
 * Verbose strategy - logs every action for debugging
 */
export class VerboseStrategy implements TestStrategy {
  name = 'verbose';

  async execute(testName: string): Promise<void> {
    console.log(`[VerboseStrategy] Starting: ${testName}`);
    console.log(`[VerboseStrategy] Timestamp: ${new Date().toISOString()}`);
    console.log(`[VerboseStrategy] Environment: ${process.env.NODE_ENV || 'development'}`);
  }

  shouldRetry(_error: Error): boolean {
    return false;
  }
}

/**
 * Strategy context - manages and switches between strategies
 */
export class TestRunner {
  private strategy: TestStrategy;

  constructor(strategy: TestStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: TestStrategy): void {
    this.strategy = strategy;
  }

  getStrategyName(): string {
    return this.strategy.name;
  }

  async run(testName: string): Promise<void> {
    await this.strategy.execute(testName);
  }

  shouldRetry(error: Error): boolean {
    return this.strategy.shouldRetry(error);
  }
}
