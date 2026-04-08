import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  private usernameInput = 'input[data-test="username"]';
  private passwordInput = 'input[data-test="password"]';
  private loginButton = 'input[data-test="login-button"]';
  private errorMessage = 'h3[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin() {
    await this.navigateTo('/');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }
}
