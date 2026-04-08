import { BasePage } from './basePage';
import { Page } from '@playwright/test';

/**
 * CartPage - Page object for the SauceDemo shopping cart page.
 * Handles cart item management, checkout initiation, and cart verification.
 */
export class CartPage extends BasePage {
  // Selectors
  private cartItems = '.cart_item';
  private itemNames = '.inventory_item_name';
  private itemPrices = '.inventory_item_price';
  private removeButtons = 'button[data-test*="remove"]';
  private checkoutButton = 'button[data-test="checkout"]';
  private continueShopping = 'button[data-test="continue-shopping"]';
  private cartQuantity = '.cart_quantity';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to cart
   */
  async navigateToCart() {
    await this.navigateTo('/cart.html');
  }

  /**
   * Get all cart item names
   */
  async getCartItemNames(): Promise<string[]> {
    const elements = await this.page.locator(this.itemNames).all();
    const names: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) names.push(text);
    }
    return names;
  }

  /**
   * Remove item from cart by name
   */
  async removeItemByName(itemName: string) {
    const items = await this.page.locator(this.cartItems).all();
    for (const item of items) {
      const name = await item.locator(this.itemNames).textContent();
      if (name?.includes(itemName)) {
        const button = item.locator('button[data-test*="remove"]');
        await button.click();
        break;
      }
    }
  }

  /**
   * Click checkout button
   */
  async clickCheckout() {
    await this.click(this.checkoutButton);
  }

  /**
   * Click continue shopping
   */
  async clickContinueShopping() {
    await this.click(this.continueShopping);
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty(): Promise<boolean> {
    return !(await this.isVisible(this.cartItems));
  }

  /**
   * Get number of items in cart
   */
  async getItemCount(): Promise<number> {
    const items = await this.page.locator(this.cartItems).all();
    return items.length;
  }
}
