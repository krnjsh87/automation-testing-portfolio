import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  private firstNameInput = 'input[data-test="firstName"]';
  private lastNameInput = 'input[data-test="lastName"]';
  private postalCodeInput = 'input[data-test="postalCode"]';
  private continueButton = 'input[data-test="continue"]';
  private finishButton = 'button[data-test="finish"]';
  private completeHeader = '.complete-header';

  constructor(page: Page) {
    super(page);
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
    await this.click(this.continueButton);
  }

  async finishCheckout() {
    await this.click(this.finishButton);
  }

  async getCompletionMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }
}
