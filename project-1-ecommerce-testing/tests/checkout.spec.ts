import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { TEST_USERS, CHECKOUT_DATA } from '../utils/testData';

test.describe('Checkout Flow Tests', () => {
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

    await productPage.addProductToCart('Sauce Labs Backpack');
    await productPage.addProductToCart('Sauce Labs Bike Light');
  });

  test('TC201: Complete checkout with valid information', async ({ page }) => {
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.validCheckout;

    await productPage.clickCartLink();
    await cartPage.clickCheckout();

    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    await checkoutPage.completeCheckout();

    expect(page.url()).toContain('checkout-complete');
  });

  test('TC202: Checkout with missing first name shows error', async () => {
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingFirstName;

    await productPage.clickCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC203: Checkout with missing last name shows error', async () => {
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingLastName;

    await productPage.clickCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC204: Checkout with missing postal code shows error', async () => {
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.missingPostalCode;

    await productPage.clickCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    const isErrorDisplayed = await checkoutPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
  });

  test('TC205: Cancel checkout returns to inventory', async ({ page }) => {
    await productPage.clickCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.clickCancel();

    expect(page.url()).toContain('inventory');
  });

  test('TC206: Verify checkout summary is visible', async () => {
    const { firstName, lastName, postalCode } = CHECKOUT_DATA.validCheckout;

    await productPage.clickCartLink();
    await cartPage.clickCheckout();
    await checkoutPage.fillCheckoutInfo(firstName, lastName, postalCode);
    await checkoutPage.clickContinue();

    const summaryVisible = await checkoutPage.isCheckoutSummaryVisible();
    expect(summaryVisible).toBe(true);
  });
});
