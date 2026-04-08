# Project Rules & Coding Standards

This document serves as the source of truth for development patterns, directory structure, and quality standards for the **Automation Testing Portfolio**.

## 1. Directory Structure
- **Monorepo Approach**: Each project must reside in its own subdirectory (e.g., `project-1-ecommerce-testing/`).
- **Independence**: Subprojects MUST have their own `package.json`, `tsconfig.json`, and `README.md`.
- **Global Assets**: Common configurations (like shared Docker base images or global CI workflows) reside in the root `.github/` or `infrastructure/` folders.

## 2. Coding Standards (TypeScript/Playwright)
- **Page Object Model (POM)**: Mandatory for all UI automation. Pages go in `pages/` and tests in `tests/`.
- **Type Safety**: TypeScript is the primary language. Avoid `any`. Use interfaces for data models.
- **Naming Conventions**:
  - Files: `camelCase.ts` or `kebab-case.spec.ts`.
  - Classes: `PascalCase`.
  - Methods/Variables: `camelCase`.
- **Selectors**: Use Playwright's built-in locators (e.g., `getByRole`, `getByText`, `getByTestId`) over raw CSS/XPath where possible. Use `data-test` attributes for reliability.

## 3. API Testing Standards
- **Contract Testing**: Validate response schemas using JSON schema validators (e.g., `ajv`).
- **Isolation**: Use environment variables (`.env`) for base URLs and credentials. Never commit real secrets.
- **Reporting**: Ensure all API tests generate structured XML/JSON reports for CI integration.

## 4. Documentation Standards
- **README per Project**: Each project must include setup instructions, tech stack overview, and execution commands.
- **Commit Messages**: Use conventional commits (e.g., `feat:`, `fix:`, `docs:`, `chore:`).
- **Code Comments**: Document complex logic, especially in utility functions and custom orchestrators.

## 5. CI/CD & Infrastructure
- **Dockerization**: Keep Dockerfiles optimized using multi-stage builds.
- **Pipeline as Code**: Support both Jenkins (`Jenkinsfile`) and GitHub Actions (`.yml`).
- **Environment Parity**: Tests should run consistently across local, Docker, and Cloud environments.

## 6. Maintenance
- **Cleanup**: Always include lifecycle hooks (`beforeAll`, `afterAll`, `afterEach`) to clean up test data and close browser contexts/database connections.
- **Logging**: Use structured logging (e.g., `Pino` or `Winston`) for advanced framework projects.
