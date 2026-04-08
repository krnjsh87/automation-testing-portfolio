# Project 02: REST API Testing Suite

## Overview
A professional-grade REST API testing suite demonstrating expertise in backend service testing using **Playwright (Request API)**, **TypeScript**, and **Python**. Covers comprehensive CRUD operations, response validation, contract testing, and dual-language implementation.

## Tech Stack
- **Framework**: Playwright (Request API / Fetch)
- **Languages**: TypeScript & Python
- **Key Concepts**: CRUD operations, response validation, contract testing, HTTP protocols
- **Target API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## Project Structure
```text
project-2-api-testing/
├── src/                     # Reusable API Client & utilities
│   ├── api-client.ts        # Main HTTP client with typed generics
│   ├── test-data.ts         # Test data fixtures and interfaces
│   └── response-validator.ts # Response validation utilities
├── tests/                   # TypeScript test specs
│   ├── users-api.test.ts    # User endpoint tests (12 tests)
│   ├── products-api.test.ts # Posts/Product endpoint tests (8 tests)
│   └── orders-api.test.ts   # Todos/Order endpoint tests (6 tests)
├── scripts/python/          # Python test implementation
│   ├── api_client.py        # Python API client
│   ├── test_users.py        # Python user API tests (9 tests)
│   └── requirements.txt     # Python dependencies
├── schemas/                 # JSON schemas for contract testing
│   └── user-schema.json     # User response schema
├── playwright.config.ts     # Playwright configuration
└── .env.example             # Environment variables template
```

## Setup & Execution

### TypeScript Tests

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Run All API Tests
```bash
npm test
```

#### 3. Run Specific Test Suite
```bash
npm run test:users
npm run test:products
npm run test:orders
```

#### 4. View Report
```bash
npm run report
```

### Python Tests

#### 1. Install Dependencies
```bash
cd scripts/python
pip install -r requirements.txt
```

#### 2. Run Python Tests
```bash
npm run python:test
```

## Test Coverage
- **Users API (TypeScript)**: 12 tests — GET/POST/PUT/PATCH/DELETE, email validation, bulk operations
- **Posts API (TypeScript)**: 8 tests — CRUD, filtering by userId, field validation
- **Todos API (TypeScript)**: 6 tests — CRUD, completion status, user filtering
- **Users API (Python)**: 9 tests — CRUD, 404 handling, email format, required fields

**Total: 35 test cases across two languages**

## Key Features
- **Typed API Client**: Generic TypeScript client with full error handling
- **Dual-Language**: Same test scenarios in TypeScript and Python
- **Contract Testing**: JSON schemas for response structure validation
- **Response Validation**: Reusable validator for status codes, email format, and field presence
- **Environment Config**: `.env.example` template for API configuration
