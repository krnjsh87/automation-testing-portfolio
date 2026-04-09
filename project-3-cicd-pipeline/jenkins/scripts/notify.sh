#!/bin/bash

###############################################################################
# Notification Script
# Sends notifications to Slack and email
###############################################################################

STATUS="${1:-success}"
BUILD_URL="${2:-}"
BUILD_NUMBER="${3:-}"

# Slack notification (only if webhook URL is set)
if [ ! -z "$SLACK_WEBHOOK_URL" ]; then
  if [ "$STATUS" == "success" ]; then
    EMOJI="✅"
    COLOR="good"
    TEXT="Build #${BUILD_NUMBER} PASSED"
  else
    EMOJI="❌"
    COLOR="danger"
    TEXT="Build #${BUILD_NUMBER} FAILED"
  fi

  curl -X POST "$SLACK_WEBHOOK_URL" \
    -H 'Content-Type: application/json' \
    -d "{
      \"attachments\": [
        {
          \"color\": \"$COLOR\",
          \"title\": \"$EMOJI Build Status\",
          \"text\": \"$TEXT\",
          \"actions\": [
            {
              \"type\": \"button\",
              \"text\": \"View Results\",
              \"url\": \"$BUILD_URL\"
            }
          ]
        }
      ]
    }"
fi

echo "Notification simulation: Status=$STATUS, Build=$BUILD_NUMBER"
