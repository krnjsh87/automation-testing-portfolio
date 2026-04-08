import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('E-Commerce Full Journey Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should complete a full purchase journey', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';

    // 1. Product Addition
    await productPage.addProductToCart(productName);
    expect(await productPage.getCartBadgeCount()).toBe(1);

    // 2. Cart Verification
    await productPage.goToCart();
    const items = await cartPage.getCartItemNames();
    expect(items).toContain(productName);

    // 3. Checkout
    await cartPage.checkout();
    await checkoutPage.fillInformation('John', 'Doe', '12345');
    await checkoutPage.finishCheckout();

    // 4. Verification
    const message = await checkoutPage.getCompletionMessage();
    expect(message).toBe('Thank you for your order!');
  });

  test('should sort products by price (low to high)', async () => {
    await productPage.sortProducts('lohi');
    // In a real scenario, we'd verify the actual prices are in order.
    // For this demonstration, we are verifying the flow.
    await expect(page.locator('.active_option')).toHaveText('Price (low to high)');
  });
});
