import { Page } from '@playwright/test';
import { logger } from '../core/Logger';

/**
 * BasePage - Enhanced base page with logging and error recovery.
 * All page objects extend this class for shared behavior.
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a path with logging
   */
  async navigateTo(path: string) {
    logger.info(`Navigating to ${path}`);
    await this.page.goto(path);
  }

  /**
   * Click with logging and error recovery
   */
  async click(selector: string) {
    logger.debug(`Clicking ${selector}`);
    await this.page.waitForSelector(selector, { timeout: 5000 });
    await this.page.click(selector);
  }

  /**
   * Fill input with logging
   */
  async fill(selector: string, text: string) {
    logger.debug(`Filling ${selector}`);
    await this.page.fill(selector, text);
  }

  /**
   * Get text content
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Check element visibility
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait for selector
   */
  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Take screenshot with logging
   */
  async takeScreenshot(name: string) {
    const path = `screenshots/${name}-${Date.now()}.png`;
    logger.info(`Taking screenshot: ${path}`);
    await this.page.screenshot({ path });
  }
}
