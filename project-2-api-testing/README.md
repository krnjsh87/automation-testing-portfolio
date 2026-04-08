# Project 02: REST API Testing Suite

## Overview
This project is a professional-grade REST API testing suite demonstration. It showcases expertise in testing backend services using **Playwright (Request API)** and **Python (Requests)**.

## Tech Stack
- **Framework**: Playwright (Request API / Fetch)
- **Language**: TypeScript & Python
- **Key Concepts**: CRUD operations, response validation, HTTP protocols.
- **Target API**: [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

## Project Structure
```text
project-2-api-testing/
├── src/                 # Reusable API Client
├── tests/               # TypeScript test specs
├── scripts/python/      # Python test scripts
├── schemas/             # JSON schemas for validation
└── tsconfig.json        # TypeScript configuration
```

## Setup & Execution (TypeScript)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run API Tests
```bash
npx playwright test
```

## Setup & Execution (Python)

### 1. Install Dependencies
```bash
pip install requests
```

### 2. Run Test Script
```bash
python scripts/python/api_client.py
```
