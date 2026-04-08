/**
 * Test data constants for the SauceDemo e-commerce application.
 * Contains user credentials, product data, checkout info, and URL paths.
 */

export const TEST_USERS = {
  validUser: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  problemUser: {
    username: 'problem_user',
    password: 'secret_sauce',
  },
  performanceUser: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
  },
};

export const INVALID_CREDENTIALS = {
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
  emptyUsername: {
    username: '',
    password: 'secret_sauce',
  },
  emptyPassword: {
    username: 'standard_user',
    password: '',
  },
};

export const TEST_PRODUCTS = [
  { name: 'Sauce Labs Backpack', price: 29.99 },
  { name: 'Sauce Labs Bike Light', price: 9.99 },
  { name: 'Sauce Labs Bolt T-Shirt', price: 15.99 },
  { name: 'Sauce Labs Fleece Jacket', price: 49.99 },
  { name: 'Sauce Labs Onesie', price: 7.99 },
  { name: 'Test.allTheThings() T-Shirt (Red)', price: 15.99 },
];

export const CHECKOUT_DATA = {
  validCheckout: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingFirstName: {
    firstName: '',
    lastName: 'Doe',
    postalCode: '12345',
  },
  missingLastName: {
    firstName: 'John',
    lastName: '',
    postalCode: '12345',
  },
  missingPostalCode: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '',
  },
};

export const URLS = {
  login: '/',
  inventory: '/inventory.html',
  cart: '/cart.html',
  checkoutStepOne: '/checkout-step-one.html',
  checkoutStepTwo: '/checkout-step-two.html',
  checkoutComplete: '/checkout-complete.html',
};

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
};
