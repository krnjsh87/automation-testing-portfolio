# Project 01: E-Commerce Test Automation

## Overview
This project is a professional-grade, production-ready e-commerce test automation suite built with **Playwright** and **TypeScript**. It demonstrates enterprise-level testing practices including the **Page Object Model (POM)** architecture, cross-browser testing, and comprehensive E2E user journeys.

## Tech Stack
- **Framework**: Playwright
- **Language**: TypeScript
- **Pattern**: Page Object Model (POM)
- **Target App**: [Sauce Demo](https://www.saucedemo.com/)

## Project Structure
```text
project-1-ecommerce-testing/
├── pages/               # Page Object Classes
├── tests/               # Playwright Test Specs
├── utils/               # Helper utilities
├── playwright.config.ts # Playwright configuration
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
npx playwright test
```

### 4. Run with UI Mode
```bash
npx playwright test --ui
```

### 5. Generate Report
```bash
npx playwright show-report
```

## Key Features
- **POM Architecture**: Decoupled page logic from test scripts for scalability.
- **Cross-Browser**: Configured to run on Chromium, Firefox, and WebKit.
- **Auto-Retries**: Configured for CI environments.
- **Rich Artifacts**: Captures screenshots and videos on failure.
