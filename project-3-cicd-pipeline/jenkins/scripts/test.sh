#!/bin/bash

###############################################################################
# Test Execution Script
# Runs automated tests with proper error handling
###############################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
TEST_SUITE="${1:-all}"
BROWSER_LIST="${2:-chromium,firefox,webkit}"
PARALLEL_WORKERS="${3:-4}"
REPORT_DIR="${4:-reports}"
TEST_RESULTS_DIR="${5:-test-results}"

echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo -e "${YELLOW}Test Execution Script${NC}"
echo -e "${YELLOW}═══════════════════════════════════════${NC}"
echo "Test Suite: $TEST_SUITE"
echo "Browsers: $BROWSER_LIST"
echo "Workers: $PARALLEL_WORKERS"
echo "Report Dir: $REPORT_DIR"
echo ""

# Create directories
mkdir -p "$REPORT_DIR" "$TEST_RESULTS_DIR"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing dependencies...${NC}"
    npm install
fi

# Run tests based on suite selection
case $TEST_SUITE in
  smoke)
    echo -e "${YELLOW}Running smoke tests...${NC}"
    npx playwright test tests/smoke --workers=$PARALLEL_WORKERS
    ;;
  integration)
    echo -e "${YELLOW}Running integration tests...${NC}"
    npx playwright test tests/integration --workers=$PARALLEL_WORKERS
    ;;
  regression)
    echo -e "${YELLOW}Running regression tests...${NC}"
    npx playwright test tests/regression --workers=$PARALLEL_WORKERS
    ;;
  all)
    echo -e "${YELLOW}Running all tests...${NC}"
    npx playwright test --workers=$PARALLEL_WORKERS
    ;;
  *)
    echo -e "${RED}Unknown test suite: $TEST_SUITE${NC}"
    exit 1
    ;;
esac

# Generate reports
echo -e "${YELLOW}Generating reports...${NC}"
if [ -d "playwright-report" ]; then
  cp -r playwright-report/* "$REPORT_DIR/"
fi

echo -e "${GREEN}✓ Test execution completed successfully${NC}"
