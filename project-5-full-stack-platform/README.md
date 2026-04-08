# Project 05: Full-Stack Test Automation Platform

## Overview
The **capstone project** of the portfolio. This is a unified test orchestration platform that coordinates E2E, API, and Performance tests across multiple frameworks and environments. It integrates Playwright, K6, Docker, Kubernetes, and monitoring tools into a production-grade testing pipeline.

## Key Features
- **Test Orchestration**: Central `TestOrchestrator` manages multi-layer testing (UI, API, Performance)
- **Performance Testing**: K6 load testing with configurable VUs and thresholds
- **Cloud Testing**: Integration-ready for **LambdaTest** cloud grid execution
- **Monitoring**: Prometheus + Grafana for test metrics visualization
- **Container Orchestration**: Docker Compose for local services, Kubernetes manifests for scale
- **Unified Reporting**: Aggregated results from all test types into a single report

## Tech Stack
- **E2E**: Playwright (TypeScript)
- **Performance**: K6 (JavaScript)
- **Cloud Grid**: LambdaTest (integration-ready)
- **Monitoring**: Prometheus & Grafana
- **Infrastructure**: Docker Compose, Kubernetes
- **CI/CD**: GitHub Actions
- **Logging**: Winston (structured JSON logging)
- **Languages**: TypeScript & Python

## Project Structure
```text
project-5-full-stack-platform/
├── src/
│   ├── core/               # TestOrchestrator engine
│   ├── api/                # API test runner
│   ├── config/             # Environment configuration
│   ├── performance/k6/     # K6 load test scripts
│   └── utils/              # Report aggregator
├── monitoring/
│   ├── prometheus/         # Prometheus configuration
│   └── grafana/            # Grafana dashboards
├── kubernetes/             # K8s deployment manifests
├── .github/workflows/      # GitHub Actions CI/CD
├── docker-compose.yml      # Local infrastructure services
├── playwright.config.ts    # Playwright configuration
└── tsconfig.json           # TypeScript configuration
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

### 3. Start Infrastructure (Optional)
```bash
npm run docker:up
```
This starts PostgreSQL, Redis, Prometheus, and Grafana locally.

## Running Tests

### Run E2E Tests
```bash
npm run test:e2e
```

### Run K6 Performance Test
```bash
npm run test:k6
```

### Run Orchestrator
```bash
npm start
```

### View Report
```bash
npm run report
```

### Stop Infrastructure
```bash
npm run docker:down
```

## Monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000

## CI/CD Pipeline
The GitHub Actions workflow (`full-stack-tests.yml`) runs three jobs:
1. **E2E Tests** — Playwright tests across browsers
2. **API Tests** — API endpoint validation
3. **Performance Smoke** — K6 load test (runs after E2E + API pass)

## Kubernetes Deployment
Deploy the test runner to a K8s cluster:
```bash
kubectl apply -f kubernetes/test-runner-deployment.yaml
```
