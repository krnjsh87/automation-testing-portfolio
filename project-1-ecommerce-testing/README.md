# Project 01: E-Commerce Test Automation

## Overview
A professional-grade, production-ready e-commerce test automation suite built with **Playwright** and **TypeScript**. This project demonstrates enterprise-level testing practices including the **Page Object Model (POM)** architecture, cross-browser testing, data-driven testing, and comprehensive E2E user journeys.

## Tech Stack
- **Framework**: Playwright
- **Language**: TypeScript
- **Pattern**: Page Object Model (POM)
- **Target App**: [Sauce Demo](https://www.saucedemo.com/)

## Project Structure
```text
project-1-ecommerce-testing/
├── pages/               # Page Object Classes (BasePage, LoginPage, ProductPage, CartPage, CheckoutPage)
├── tests/               # Playwright Test Specs (auth, product-search, cart, checkout, e2e journey)
├── utils/               # Helper utilities and test data constants
├── data/                # JSON test data files (users, products, addresses)
├── reports/             # Generated HTML test reports
├── screenshots/         # Screenshots captured on failure
├── videos/              # Video recordings of failed tests
├── playwright.config.ts # Playwright configuration (3 browsers, reporters)
└── tsconfig.json        # TypeScript configuration
```

## Setup & Execution

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

### 3. Run All Tests
```bash
npm test
```

### 4. Run Tests in Headed Mode
```bash
npm run test:headed
```

### 5. Run Tests in UI Mode
```bash
npm run test:ui
```

### 6. Run on Specific Browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### 7. View HTML Report
```bash
npm run report
```

## Test Coverage
- **Authentication Tests (8 tests)**: Valid login, invalid credentials, locked users, empty fields, multi-attempt
- **Product Search & Filtering (10 tests)**: Product display, cart operations, sorting (A-Z, price), price validation
- **Shopping Cart (6 tests)**: Add/remove items, persistence, continue shopping, empty state
- **Checkout Flow (6 tests)**: Valid checkout, field validation errors, cancel flow, order summary
- **E2E Journey (3 tests)**: Full purchase flow, multi-product purchase, sorting verification

**Total: 33 test cases × 3 browsers = 99 test executions**

## Key Features
- **POM Architecture**: Decoupled page logic from test scripts for scalability and maintainability
- **Data-Driven Testing**: Centralized test data in `utils/testData.ts` and JSON files
- **Cross-Browser**: Configured to run on Chromium, Firefox, and WebKit simultaneously
- **Auto-Retries**: Configured for CI environments with trace capture on retry
- **Rich Artifacts**: Captures screenshots and videos on failure, generates HTML/JSON/JUnit reports
- **Type Safety**: Full TypeScript with strict mode enabled
