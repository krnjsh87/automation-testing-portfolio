import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { TEST_USERS, CHECKOUT_DATA } from '../utils/testData';

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
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
  });

  test('should complete a full purchase journey', async ({ page }) => {
    const productName = 'Sauce Labs Backpack';
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.validCheckout;

    // 1. Product Addition
    await productPage.addProductToCart(productName);
    expect(await productPage.getCartItemCount()).toBe(1);

    // 2. Cart Verification
    await productPage.clickCartLink();
    const items = await cartPage.getCartItemNames();
    expect(items).toContain(productName);

    // 3. Checkout
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.completeCheckout();

    // 4. Verification
    const message = await checkoutPage.getCompletionMessage();
    expect(message).toBe('Thank you for your order!');
  });

  test('should complete multi-product purchase', async ({ page }) => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.validCheckout;

    // Add multiple products
    for (const product of products) {
      await productPage.addProductToCart(product);
    }
    expect(await productPage.getCartItemCount()).toBe(2);

    // Verify cart
    await productPage.clickCartLink();
    const cartItems = await cartPage.getCartItemNames();
    for (const product of products) {
      expect(cartItems).toContain(product);
    }

    // Complete checkout
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();
    await checkoutPage.completeCheckout();

    expect(page.url()).toContain('checkout-complete');
  });

  test('should sort products by price (low to high)', async ({ page }) => {
    await productPage.sortProducts('lohi');

    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
