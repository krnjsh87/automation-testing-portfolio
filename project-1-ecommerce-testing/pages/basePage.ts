import { Page } from '@playwright/test';

/**
 * BasePage - Abstract base class for all page objects.
 * Provides reusable utility methods for common interactions.
 */
export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a specific path relative to baseURL
   */
  async navigateTo(path: string) {
    await this.page.goto(path);
  }

  /**
   * Get current page title
   */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  /**
   * Get current page URL
   */
  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for selector to be visible
   */
  async waitForSelector(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Click an element
   */
  async click(selector: string) {
    await this.page.click(selector);
  }

  /**
   * Fill text input
   */
  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  /**
   * Get text content of element
   */
  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || '';
  }

  /**
   * Get attribute value
   */
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    return await this.page.getAttribute(selector, attribute);
  }

  /**
   * Check if element is visible
   */
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  /**
   * Wait and click element
   */
  async waitAndClick(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
    await this.page.click(selector);
  }

  /**
   * Select option from dropdown
   */
  async selectDropdown(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(fileName: string) {
    await this.page.screenshot({ path: `screenshots/${fileName}.png` });
  }

  /**
   * Scroll element into view
   */
  async scrollIntoView(selector: string) {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

  /**
   * Wait for page load
   */
  async waitForPageLoad(timeout: number = 10000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }
}
