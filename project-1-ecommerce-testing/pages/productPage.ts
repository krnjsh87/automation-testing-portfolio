import { BasePage } from './basePage';
import { Page } from '@playwright/test';

export class ProductPage extends BasePage {
  private inventoryItems = '.inventory_item';
  private productNames = '.inventory_item_name';
  private addToCartButtons = 'button[data-test*="add-to-cart"]';
  private cartBadge = '.shopping_cart_badge';
  private cartLink = '.shopping_cart_link';
  private sortDropdown = 'select[data-test="product_sort_container"]';

  constructor(page: Page) {
    super(page);
  }

  async addProductToCart(productName: string) {
    const products = await this.page.locator(this.inventoryItems).all();
    for (const product of products) {
      const name = await product.locator(this.productNames).textContent();
      if (name === productName) {
        await product.locator(this.addToCartButtons).click();
        break;
      }
    }
  }

  async getCartBadgeCount(): Promise<number> {
    if (await this.page.isVisible(this.cartBadge)) {
      const count = await this.getText(this.cartBadge);
      return parseInt(count, 10);
    }
    return 0;
  }

  async goToCart() {
    await this.click(this.cartLink);
  }

  async sortProducts(option: string) {
    await this.page.selectOption(this.sortDropdown, option);
  }
}
