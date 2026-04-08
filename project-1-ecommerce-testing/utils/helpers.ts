import { Page } from '@playwright/test';

/**
 * Utility helper functions for test automation.
 * Provides reusable functions for common test operations.
 */

/**
 * Wait for element and verify it's clickable
 */
export async function waitForElementClickable(
  page: Page,
  selector: string,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector(selector, { timeout });
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });
}

/**
 * Perform login shortcut - navigates to the app and logs in
 */
export async function performLogin(
  page: Page,
  username: string,
  password: string
): Promise<void> {
  await page.goto('/');
  await page.fill('input[data-test="username"]', username);
  await page.fill('input[data-test="password"]', password);
  await page.click('input[data-test="login-button"]');
  await page.waitForSelector('.inventory_container', { timeout: 5000 });
}

/**
 * Calculate total price from cart items
 */
export async function calculateCartTotal(page: Page): Promise<number> {
  const priceElements = await page.locator('.inventory_item_price').all();
  let total = 0;
  for (const element of priceElements) {
    const text = await element.textContent();
    if (text) {
      const price = parseFloat(text.replace('$', ''));
      total += price;
    }
  }
  return parseFloat(total.toFixed(2));
}

/**
 * Get all text from multiple elements
 */
export async function getMultipleElementTexts(
  page: Page,
  selector: string
): Promise<string[]> {
  const elements = await page.locator(selector).all();
  const texts: string[] = [];
  for (const element of elements) {
    const text = await element.textContent();
    if (text) texts.push(text.trim());
  }
  return texts;
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(
  page: Page,
  name: string
): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `screenshots/${name}-${timestamp}.png`;
  await page.screenshot({ path: fileName });
  return fileName;
}

/**
 * Wait for network idle (useful after actions)
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}
