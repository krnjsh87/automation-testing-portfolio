import { BasePage } from './basePage';
import { Page } from '@playwright/test';

/**
 * CheckoutPage - Page object for the SauceDemo checkout flow.
 * Handles checkout information, order summary, and completion.
 */
export class CheckoutPage extends BasePage {
  // Checkout Step One
  private firstNameInput = 'input[data-test="firstName"]';
  private lastNameInput = 'input[data-test="lastName"]';
  private postalCodeInput = 'input[data-test="postalCode"]';
  private continueButton = 'input[data-test="continue"]';
  private errorMessage = 'h3[data-test="error"]';

  // Checkout Step Two
  private finishButton = 'button[data-test="finish"]';
  private cancelButton = 'button[data-test="cancel"]';
  private summaryInfo = '.summary_info';

  // Checkout Complete
  private completeHeader = '.complete-header';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fill(this.firstNameInput, firstName);
    await this.fill(this.lastNameInput, lastName);
    await this.fill(this.postalCodeInput, postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.click(this.continueButton);
  }

  /**
   * Get checkout error message
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error is displayed
   */
  async isErrorDisplayed(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  /**
   * Complete checkout and verify order
   */
  async completeCheckout() {
    await this.click(this.finishButton);
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.click(this.cancelButton);
  }

  /**
   * Get order summary total
   */
  async getOrderTotal(): Promise<string> {
    return await this.getText('.summary_total_label');
  }

  /**
   * Verify checkout summary is visible
   */
  async isCheckoutSummaryVisible(): Promise<boolean> {
    return await this.isVisible(this.summaryInfo);
  }

  /**
   * Get completion message after checkout
   */
  async getCompletionMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }
}
