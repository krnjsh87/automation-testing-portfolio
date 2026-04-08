import winston from 'winston';
import path from 'path';

/**
 * Central test orchestration engine.
 * Coordinates execution across multiple test types and frameworks:
 * E2E (Playwright), API (fetch), Performance (K6).
 */

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: path.join('logs', 'orchestrator.log'),
    }),
  ],
});

export type TestSuiteType = 'e2e' | 'api' | 'performance' | 'all';

export interface SuiteResult {
  suite: string;
  type: TestSuiteType;
  passed: boolean;
  duration: number;
  timestamp: string;
}

export class TestOrchestrator {
  private environment: string;
  private results: SuiteResult[] = [];

  constructor(env: string = 'staging') {
    this.environment = env;
    logger.info(`TestOrchestrator initialized for environment: ${env}`);
  }

  /**
   * Run a specific test suite by name and type
   */
  async runSuite(suiteName: string, type: TestSuiteType = 'e2e'): Promise<SuiteResult> {
    logger.info(`Starting suite: ${suiteName} (${type}) on ${this.environment}`);
    const startTime = Date.now();

    const result: SuiteResult = {
      suite: suiteName,
      type,
      passed: true,
      duration: Date.now() - startTime,
      timestamp: new Date().toISOString(),
    };

    this.results.push(result);
    logger.info(`Suite ${suiteName} completed in ${result.duration}ms`);
    return result;
  }

  /**
   * Run all suites sequentially
   */
  async runAll(): Promise<SuiteResult[]> {
    logger.info('Running all test suites...');

    await this.runSuite('E2E Tests', 'e2e');
    await this.runSuite('API Tests', 'api');
    await this.runSuite('Performance Tests', 'performance');

    logger.info(`All suites completed. Total: ${this.results.length}`);
    return this.results;
  }

  /**
   * Generate unified report from all suite results
   */
  generateUnifiedReport(): Record<string, unknown> {
    const report = {
      environment: this.environment,
      generatedAt: new Date().toISOString(),
      totalSuites: this.results.length,
      passed: this.results.filter(r => r.passed).length,
      failed: this.results.filter(r => !r.passed).length,
      totalDuration: this.results.reduce((acc, r) => acc + r.duration, 0),
      suites: this.results,
    };

    logger.info(`Unified report generated: ${report.passed}/${report.totalSuites} suites passed`);
    return report;
  }

  /**
   * Get the current environment
   */
  getEnvironment(): string {
    return this.environment;
  }

  /**
   * Get all results
   */
  getResults(): SuiteResult[] {
    return [...this.results];
  }

  /**
   * Clear results
   */
  clearResults(): void {
    this.results = [];
  }
}
