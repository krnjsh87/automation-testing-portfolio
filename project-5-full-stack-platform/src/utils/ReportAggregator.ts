/**
 * Report Aggregator - Combines results from E2E, API, and Performance tests.
 * Generates a unified report for the test orchestration platform.
 */

export interface TestReport {
  type: string;
  totalTests: number;
  passed: number;
  failed: number;
  duration: number;
  timestamp: string;
}

export class ReportAggregator {
  private reports: TestReport[] = [];

  /**
   * Add a report from a test suite
   */
  addReport(report: TestReport): void {
    this.reports.push(report);
  }

  /**
   * Get the unified summary
   */
  getSummary(): Record<string, unknown> {
    const totalTests = this.reports.reduce((acc, r) => acc + r.totalTests, 0);
    const totalPassed = this.reports.reduce((acc, r) => acc + r.passed, 0);
    const totalFailed = this.reports.reduce((acc, r) => acc + r.failed, 0);
    const totalDuration = this.reports.reduce((acc, r) => acc + r.duration, 0);

    return {
      generatedAt: new Date().toISOString(),
      suiteCount: this.reports.length,
      totalTests,
      totalPassed,
      totalFailed,
      passRate: totalTests > 0 ? ((totalPassed / totalTests) * 100).toFixed(2) + '%' : '0%',
      totalDuration: `${totalDuration}ms`,
      suites: this.reports,
    };
  }

  /**
   * Export summary as JSON string
   */
  toJSON(): string {
    return JSON.stringify(this.getSummary(), null, 2);
  }

  /**
   * Clear all reports
   */
  clear(): void {
    this.reports = [];
  }
}
