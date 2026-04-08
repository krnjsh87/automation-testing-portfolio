# Project 03: CI/CD & Infrastructure

## Overview
This project demonstrates **DevOps for QA** — containerized test execution and automated CI/CD pipelines. It provides ready-to-use infrastructure configurations for running Playwright tests in Docker containers, Jenkins pipelines, and GitHub Actions workflows.

## Tech Stack
- **Containerization**: Docker & Docker Compose
- **CI/CD**: Jenkins (Jenkinsfile) & GitHub Actions
- **Test Framework**: Playwright (from Projects 1 & 2)
- **Orchestration**: Docker Compose for multi-service test environments

## Project Structure
```text
project-3-cicd-pipeline/
├── docker/
│   └── Dockerfile              # Multi-stage Playwright test runner
├── .github/
│   └── workflows/
│       └── playwright-tests.yml # GitHub Actions workflow
├── Jenkinsfile                  # Jenkins declarative pipeline
├── docker-compose.yml           # Docker Compose for test services
└── README.md                    # This file
```

## Docker Setup

### Build the Test Runner Image
```bash
docker build -f docker/Dockerfile -t playwright-test-runner .
```

### Run Tests in Docker
```bash
docker run --rm playwright-test-runner
```

### Run with Docker Compose
```bash
docker-compose up --build
```

## CI/CD Pipelines

### GitHub Actions
The workflow (`.github/workflows/playwright-tests.yml`) triggers on:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`

It automatically:
1. Checks out the code
2. Installs Node.js and dependencies
3. Installs Playwright browsers
4. Runs the full test suite
5. Uploads the HTML report as an artifact (retained for 30 days)

### Jenkins
The `Jenkinsfile` defines a declarative pipeline with:
- **Parallel execution**: Smoke and regression tests run simultaneously
- **Report publishing**: HTML reports are published after every build
- **Artifact archival**: Test results are archived for historical tracking

## Key Features
- **Multi-Stage Docker Build**: Optimized image with separate build and runtime stages
- **Pipeline as Code**: Both Jenkinsfile and GitHub Actions YAML are version-controlled
- **Parallel Execution**: Jenkins pipeline runs smoke and regression tests in parallel
- **Artifact Management**: Reports and test results are automatically archived
- **Environment Parity**: Tests run consistently across local, Docker, and CI environments
