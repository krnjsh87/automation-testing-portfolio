import { BasePage } from './basePage';
import { Page } from '@playwright/test';

/**
 * LoginPage - Page object for the SauceDemo login page.
 * Handles authentication flows and error message validation.
 */
export class LoginPage extends BasePage {
  // Selectors
  private usernameInput = 'input[data-test="username"]';
  private passwordInput = 'input[data-test="password"]';
  private loginButton = 'input[data-test="login-button"]';
  private errorMessage = 'h3[data-test="error"]';
  private inventoryContainer = '.inventory_container';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin() {
    await this.navigateTo('/');
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  /**
   * Get login error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if login was successful (inventory page loaded)
   */
  async isLoginSuccessful(): Promise<boolean> {
    try {
      await this.waitForSelector(this.inventoryContainer, 3000);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoginPageReady() {
    await this.waitForSelector(this.usernameInput);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }
}
