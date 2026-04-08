# Project 05: Full-Stack Test Automation Platform

## Overview
This is the **capstone project** of the portfolio. It integrates Playwright, TypeScript, Python, and K6 into a unified testing platform with cloud grid support and performance monitoring.

## Key Features
- **Cloud Testing**: Parallel execution on **LambdaTest** cloud grid.
- **Performance Testing**: Load testing with **K6**.
- **Test Orchestration**: A central `TestOrchestrator` to manage multi-layer testing (UI, API, Perf).
- **Monitoring**: Integration-ready structure for Prometheus and Grafana.

## Tech Stack
- **E2E**: Playwright & Cypress
- **Performance**: K6
- **Cloud Grid**: LambdaTest
- **Language**: TypeScript & Python
- **Orchestration**: Custom JS/TS Engine

## Setup
```bash
npm install
```

## Running the Platform
```bash
# Run orchestrated suite
npm start
```
