# Multi-stage Dockerfile for Test Automation
FROM mcr.microsoft.com/playwright:v1.52.0-noble AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build stage
FROM base AS builder
COPY . .
RUN npm run build || echo "No build step required"

# Runtime stage
FROM base AS runtime
COPY --from=builder /app /app

ENV CI=true
ENTRYPOINT ["npx", "playwright", "test"]
