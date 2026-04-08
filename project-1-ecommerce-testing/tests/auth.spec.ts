import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { TEST_USERS, INVALID_CREDENTIALS, URLS } from '../utils/testData';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.waitForLoginPageReady();
  });

  test('TC001: Valid user login should succeed', async ({ page }) => {
    const { username, password } = TEST_USERS.validUser;

    await loginPage.login(username, password);

    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
    expect(page.url()).toContain(URLS.inventory);
  });

  test('TC002: Invalid password should show error', async () => {
    const { username, password } = INVALID_CREDENTIALS.invalidPassword;

    await loginPage.login(username, password);

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('TC003: Locked out user should see lock message', async () => {
    const { username, password } = TEST_USERS.lockedUser;

    await loginPage.login(username, password);

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('locked out');
  });

  test('TC004: Empty username should show error', async () => {
    const { username, password } = INVALID_CREDENTIALS.emptyUsername;

    await loginPage.login(username, password);

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });

  test('TC005: Empty password should show error', async () => {
    const { username, password } = INVALID_CREDENTIALS.emptyPassword;

    await loginPage.login(username, password);

    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBe(true);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password is required');
  });

  test('TC006: Login page title verification', async () => {
    const title = await loginPage.getPageTitle();
    expect(title).toContain('Swag Labs');
  });

  test('TC007: Problem user can still login', async () => {
    const { username, password } = TEST_USERS.problemUser;

    await loginPage.login(username, password);

    const isSuccessful = await loginPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
  });

  test('TC008: Multiple invalid login attempts', async () => {
    for (let i = 0; i < 3; i++) {
      await loginPage.login('invalid_user', 'invalid_pass');
      const isErrorDisplayed = await loginPage.isErrorDisplayed();
      expect(isErrorDisplayed).toBe(true);

      await loginPage.navigateToLogin();
      await loginPage.waitForLoginPageReady();
    }
  });
});
