# Multi-stage build for test automation
FROM mcr.microsoft.com/playwright:v1.52.0-noble AS base

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy application code
COPY . .

# Final stage
FROM base AS runtime

# Set environment
ENV NODE_ENV=test
ENV CI=true

# Create directories for results
RUN mkdir -p test-results reports

# Run tests by default
ENTRYPOINT ["/app/jenkins/scripts/test.sh"]
CMD ["all"]
