#!/usr/bin/env bash
set -euo pipefail

# Load .env if present (it contains MONGODB_URI in this project)
if [ -f "$(dirname "$0")/../.env" ]; then
  # shellcheck disable=SC1091
  source "$(dirname "$0")/../.env"
fi

echo "Stopping any running server processes..."
pkill -f "node server.js" || true

echo "Clearing sessions in MongoDB..."
if [ -n "${MONGODB_URI:-}" ]; then
  mongosh "$MONGODB_URI" --eval 'db.sessions.deleteMany({})' || true
else
  mongosh "mongodb://127.0.0.1:27017/ics385_week14" --eval 'db.sessions.deleteMany({})' || true
fi

echo "Starting server and tailing logs..."
cd "$(dirname "$0")/.."
node server.js > /tmp/termproj_server.log 2>&1 &
sleep 1
tail -n 200 /tmp/termproj_server.log
