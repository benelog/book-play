#!/usr/bin/env bash
# Serve the game locally with pretty URLs and open it in the browser.
# Usage: ./start.sh [port]   (default 8765)
set -euo pipefail
cd "$(dirname "$0")"

PORT="${1:-8765}"
URL="http://127.0.0.1:${PORT}/"

open_browser() {
  if command -v xdg-open >/dev/null 2>&1; then xdg-open "$1" >/dev/null 2>&1 &
  elif command -v open >/dev/null 2>&1; then open "$1"
  elif command -v google-chrome >/dev/null 2>&1; then google-chrome "$1" >/dev/null 2>&1 &
  else echo "Open this in your browser: $1"
  fi
}

echo "Once Upon a Line"
if ! command -v python3 >/dev/null 2>&1; then
  echo "python3 is required (it runs tools/serve.py). You can also open index.html directly in Chrome." >&2
  exit 1
fi
python3 tools/embed-text.py
(sleep 1; open_browser "$URL") &
exec python3 tools/serve.py "$PORT"
