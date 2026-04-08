import { Page } from '@playwright/test';
import { logger } from '../core/Logger';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string) {
    logger.info(`Navigating to ${path}`);
    await this.page.goto(path);
  }

  // Simplified version for demo
  async click(selector: string) {
    logger.debug(`Clicking ${selector}`);
    await this.page.click(selector);
  }
}
