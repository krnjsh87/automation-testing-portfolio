#!/bin/bash

###############################################################################
# Report Generation Script
# Aggregates test results and generates reports
###############################################################################

set -e

REPORT_DIR="${1:-reports}"
TEST_RESULTS_DIR="${2:-test-results}"
OUTPUT_REPORT="${3:-${REPORT_DIR}/summary.html}"

echo "Generating test reports..."

# Create report directory
mkdir -p "$REPORT_DIR"

# Count test results
PASSED=0
FAILED=0
SKIPPED=0

# Process JUnit XML files
if [ -d "$TEST_RESULTS_DIR" ]; then
  for file in "$TEST_RESULTS_DIR"/*.xml; do
    if [ -f "$file" ]; then
      PASSED=$((PASSED + $(grep -c 'testcase' "$file" || true)))
      FAILED=$((FAILED + $(grep -c 'failure' "$file" || true)))
      SKIPPED=$((SKIPPED + $(grep -c 'skipped' "$file" || true)))
    fi
  done
fi

# Generate HTML report
cat > "$OUTPUT_REPORT" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test Execution Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { padding: 20px; background: #f5f5f5; border-radius: 5px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .skipped { color: #ffc107; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { padding: 10px; text-align: left; border: 1px solid #ddd; }
        th { background: #f8f9fa; }
    </style>
</head>
<body>
    <h1>Test Execution Report</h1>
    <div class="summary">
        <h2>Summary</h2>
        <p class="passed">✓ Passed: PASSED_COUNT</p>
        <p class="failed">✗ Failed: FAILED_COUNT</p>
        <p class="skipped">⊘ Skipped: SKIPPED_COUNT</p>
        <p><strong>Total: TOTAL_COUNT</strong></p>
    </div>
</body>
</html>
EOF

# Replace placeholders using a temporary file to avoid sed issues on some platforms
sed "s/PASSED_COUNT/$PASSED/g" "$OUTPUT_REPORT" > "$OUTPUT_REPORT.tmp" && mv "$OUTPUT_REPORT.tmp" "$OUTPUT_REPORT"
sed "s/FAILED_COUNT/$FAILED/g" "$OUTPUT_REPORT" > "$OUTPUT_REPORT.tmp" && mv "$OUTPUT_REPORT.tmp" "$OUTPUT_REPORT"
sed "s/SKIPPED_COUNT/$SKIPPED/g" "$OUTPUT_REPORT" > "$OUTPUT_REPORT.tmp" && mv "$OUTPUT_REPORT.tmp" "$OUTPUT_REPORT"
sed "s/TOTAL_COUNT/$((PASSED + FAILED + SKIPPED))/g" "$OUTPUT_REPORT" > "$OUTPUT_REPORT.tmp" && mv "$OUTPUT_REPORT.tmp" "$OUTPUT_REPORT"

echo "Report generated: $OUTPUT_REPORT"
