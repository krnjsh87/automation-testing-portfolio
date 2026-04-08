import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { TEST_USERS } from '../utils/testData';

test.describe('Shopping Cart Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
  });

  test('TC301: Add single item and verify in cart', async () => {
    const productName = 'Sauce Labs Backpack';

    await productPage.addProductToCart(productName);
    await productPage.clickCartLink();

    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(productName);
    expect(await cartPage.getItemCount()).toBe(1);
  });

  test('TC302: Add multiple items and verify in cart', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];

    for (const product of products) {
      await productPage.addProductToCart(product);
    }
    await productPage.clickCartLink();

    const cartItems = await cartPage.getCartItemNames();
    for (const product of products) {
      expect(cartItems).toContain(product);
    }
    expect(await cartPage.getItemCount()).toBe(3);
  });

  test('TC303: Remove item from cart', async () => {
    const productName = 'Sauce Labs Backpack';

    await productPage.addProductToCart(productName);
    await productPage.clickCartLink();

    await cartPage.removeItemByName(productName);

    expect(await cartPage.isCartEmpty()).toBe(true);
  });

  test('TC304: Continue shopping button returns to products', async ({ page }) => {
    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.clickCartLink();

    await cartPage.clickContinueShopping();

    expect(page.url()).toContain('inventory');
  });

  test('TC305: Cart persists after navigation', async () => {
    const productName = 'Sauce Labs Fleece Jacket';

    await productPage.addProductToCart(productName);
    await productPage.clickCartLink();
    await cartPage.clickContinueShopping();

    // Navigate back to cart
    await productPage.clickCartLink();

    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(productName);
  });

  test('TC306: Empty cart state', async () => {
    await productPage.clickCartLink();

    expect(await cartPage.isCartEmpty()).toBe(true);
  });
});
