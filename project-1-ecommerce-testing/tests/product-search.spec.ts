import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { TEST_USERS, SORT_OPTIONS } from '../utils/testData';

test.describe('Product Search and Filtering Tests', () => {
  let loginPage: LoginPage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await loginPage.navigateToLogin();
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
  });

  test('TC101: Verify all products are displayed', async () => {
    const productNames = await productPage.getProductNames();

    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames.length).toBe(6);
  });

  test('TC102: Verify specific product exists', async () => {
    const productToFind = 'Sauce Labs Backpack';

    const foundProduct = await productPage.getProductByName(productToFind);

    expect(foundProduct).not.toBeNull();
    expect(foundProduct).toContain(productToFind);
  });

  test('TC103: Add product to cart', async () => {
    const productName = 'Sauce Labs Backpack';

    await productPage.addProductToCart(productName);

    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);
    const isInCart = await productPage.isProductInCart(productName);
    expect(isInCart).toBe(true);
  });

  test('TC104: Add multiple products to cart', async () => {
    const products = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

    for (const product of products) {
      await productPage.addProductToCart(product);
    }

    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(products.length);
  });

  test('TC105: Remove product from cart', async () => {
    const productName = 'Sauce Labs Backpack';
    await productPage.addProductToCart(productName);

    await productPage.removeProductFromCart(productName);

    const cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(0);
    const isInCart = await productPage.isProductInCart(productName);
    expect(isInCart).toBe(false);
  });

  test('TC106: Sort products by name A-Z', async () => {
    await productPage.sortProducts(SORT_OPTIONS.nameAZ);

    const productNames = await productPage.getProductNames();
    const sorted = [...productNames].sort();
    expect(productNames).toEqual(sorted);
  });

  test('TC107: Sort products by price low to high', async () => {
    await productPage.sortProducts(SORT_OPTIONS.priceLowHigh);

    const prices = await productPage.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('TC108: Verify product prices are positive', async () => {
    const prices = await productPage.getProductPrices();

    prices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  });

  test('TC109: Navigate to cart from product page', async ({ page }) => {
    await productPage.clickCartLink();

    expect(page.url()).toContain('cart');
  });

  test('TC110: Product count in cart updates correctly', async () => {
    let cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(0);

    await productPage.addProductToCart('Sauce Labs Backpack');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);

    await productPage.addProductToCart('Sauce Labs Bike Light');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(2);

    await productPage.removeProductFromCart('Sauce Labs Backpack');
    cartCount = await productPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
});
