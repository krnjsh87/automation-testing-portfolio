import { exec } from 'child_process';
import { promisify } from 'util';
import { Environment } from '../config/Environment';

const execAsync = promisify(exec);

export interface E2eTestResult {
  suite: string;
  passed: boolean;
  duration: number;
  error?: string;
  testsTotal: number;
  testsPassed: number;
  testsFailed: number;
}

/**
 * E2E Test Runner - Executes Playwright test suites.
 * Part of the unified test orchestration platform.
 */
export class E2eTestRunner {
  private results: E2eTestResult[] = [];

  /**
   * Run the full Playwright E2E suite
   */
  async runSuite(project?: string): Promise<E2eTestResult> {
    const startTime = Date.now();
    let command = 'npx playwright test';
    
    if (project) {
      command += ` --project=${project}`;
    }

    // Tell Playwright to output a simple JSON report for parsing
    command += ' --reporter=json';

    try {
      // Execute playwright via child process
      const { stdout } = await execAsync(command, {
        env: { ...process.env, BASE_URL: Environment.get('BASE_URL') }
      });
      
      const report = JSON.parse(stdout);
      
      const result: E2eTestResult = {
        suite: project || 'all',
        passed: report.errors.length === 0,
        duration: Date.now() - startTime,
        testsTotal: report.stats.expected,
        testsPassed: report.stats.expected - report.stats.unexpected - report.stats.flaky,
        testsFailed: report.stats.unexpected,
      };

      this.results.push(result);
      return result;
    } catch (error: any) {
      // Playwright returns exit code > 0 on test failure, which throws here
      let result: E2eTestResult;
      
      try {
        // Try parsing stdout for partial results
        const report = JSON.parse(error.stdout);
        result = {
          suite: project || 'all',
          passed: false,
          duration: Date.now() - startTime,
          testsTotal: report.stats.expected,
          testsPassed: report.stats.expected - report.stats.unexpected - report.stats.flaky,
          testsFailed: report.stats.unexpected,
          error: 'Test failures detected'
        };
      } catch (parseError) {
        // Fatal error, not a test failure
        result = {
          suite: project || 'all',
          passed: false,
          duration: Date.now() - startTime,
          testsTotal: 0,
          testsPassed: 0,
          testsFailed: 0,
          error: error.message || 'Fatal execution error'
        };
      }

      this.results.push(result);
      return result;
    }
  }

  /**
   * Get all results
   */
  getResults(): E2eTestResult[] {
    return [...this.results];
  }
}
