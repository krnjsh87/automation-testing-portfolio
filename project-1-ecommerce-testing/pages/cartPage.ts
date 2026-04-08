import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class CartPage extends BasePage {
  private cartItems = '.cart_item';
  private checkoutButton = 'button[data-test="checkout"]';
  private inventoryItemName = '.inventory_item_name';

  constructor(page: Page) {
    super(page);
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.page.locator(this.inventoryItemName).allTextContents();
  }

  async checkout() {
    await this.click(this.checkoutButton);
  }
}
