import { BasePage } from './basePage';
import { Page } from '@playwright/test';

/**
 * ProductPage - Page object for the SauceDemo inventory/products page.
 * Handles product listing, sorting, cart operations, and product filtering.
 */
export class ProductPage extends BasePage {
  // Selectors
  private inventoryItems = '.inventory_item';
  private productNames = '.inventory_item_name';
  private productPrices = '.inventory_item_price';
  private addToCartButtons = 'button[data-test*="add-to-cart"]';
  private sortDropdown = 'select[data-test="product-sort-container"]';
  private cartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to inventory (products page)
   */
  async navigateToInventory() {
    await this.navigateTo('/inventory.html');
  }

  /**
   * Get all product names
   */
  async getProductNames(): Promise<string[]> {
    const elements = await this.page.locator(this.productNames).all();
    const names: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) names.push(text);
    }
    return names;
  }

  /**
   * Get product by partial name match
   */
  async getProductByName(productName: string): Promise<string | null> {
    const products = await this.getProductNames();
    return products.find(p => p.includes(productName)) || null;
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName: string) {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="add-to-cart"]');
        await button.click();
        break;
      }
    }
  }

  /**
   * Remove product from cart by name
   */
  async removeProductFromCart(productName: string) {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="remove"]');
        if (await button.isVisible()) {
          await button.click();
        }
        break;
      }
    }
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: string) {
    await this.selectDropdown(this.sortDropdown, sortOption);
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<number> {
    if (await this.page.isVisible(this.cartBadge)) {
      const badge = await this.getText(this.cartBadge);
      return parseInt(badge, 10) || 0;
    }
    return 0;
  }

  /**
   * Click on cart link
   */
  async clickCartLink() {
    await this.click(this.cartLink);
  }

  /**
   * Get all product prices
   */
  async getProductPrices(): Promise<number[]> {
    const elements = await this.page.locator(this.productPrices).all();
    const prices: number[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        const price = parseFloat(text.replace('$', ''));
        prices.push(price);
      }
    }
    return prices;
  }

  /**
   * Check if product is in cart (button shows "Remove")
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name?.includes(productName)) {
        const button = product.locator('button[data-test*="remove"]');
        return await button.isVisible();
      }
    }
    return false;
  }
}
