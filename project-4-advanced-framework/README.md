# Project 04: Advanced Test Automation Framework

## Overview
An enterprise-grade automation framework demonstrating advanced architectural patterns, database integration, structured logging, and comprehensive error handling. This project showcases the kind of framework design used in Fortune 500 companies.

## Key Features
- **Design Patterns**: Implementation of **Singleton**, **Factory**, and **Strategy** patterns
- **Database Integration**: PostgreSQL client using Singleton pattern for connection pooling
- **Structured Logging**: Winston-based logging with file and console transports
- **Custom Error Handling**: Hierarchical error classes for different failure scenarios
- **Data Generation**: Randomized test data generator for dynamic test scenarios
- **Lifecycle Hooks**: Centralized test setup and teardown management

## Tech Stack
- **Framework**: Playwright (E2E) + Jest (Unit)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL
- **Logging**: Winston
- **Patterns**: Singleton, Factory, Strategy

## Project Structure
```text
project-4-advanced-framework/
├── src/
│   ├── config/          # TestConfig (Singleton pattern)
│   ├── core/            # Logger (Winston structured logging)
│   ├── database/        # DatabaseClient (Singleton + connection pooling)
│   ├── errors/          # Custom error hierarchy
│   ├── hooks/           # Test lifecycle hooks
│   ├── pages/           # BasePage with logging integration
│   ├── patterns/        # Factory & Strategy pattern implementations
│   └── utils/           # DataGenerator utility
├── tests/
│   ├── unit/            # Jest unit tests for patterns
│   ├── integration/     # Integration tests
│   └── e2e/             # Playwright E2E tests
├── jest.config.js       # Jest configuration
├── playwright.config.ts # Playwright configuration
└── tsconfig.json        # TypeScript configuration
```

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npx playwright install
```

### 3. (Optional) Setup PostgreSQL
```bash
# Using Docker:
docker run --name test-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=testdb -p 5432:5432 -d postgres:15-alpine
```

## Running Tests

### Unit Tests (Design Patterns)
```bash
npm run test:unit
```

### E2E Tests
```bash
npm run test:e2e
```

### All Tests
```bash
npm test
```

## Design Patterns Explained

### Singleton (TestConfig)
Ensures a single shared configuration instance across all test files. Prevents duplicate database connections and maintains consistent state.

### Factory (PageFactory)
Dynamically creates page objects by type name. New pages can be registered at runtime without modifying existing code.

### Strategy (TestRunner)
Swaps test execution behavior at runtime. Choose between Fast (smoke), Resilient (retry on failure), or Verbose (debug logging) strategies.

## Test Coverage
- **Unit Tests**: 14 tests covering Singleton, Factory, Strategy patterns and DataGenerator
- **E2E Tests**: Playwright tests using the framework's page objects
