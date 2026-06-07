#!/usr/bin/env bash
# update.sh — merge upstream MarkEdit-preview + rebuild + deploy
# Usage: ./update.sh
# Run this whenever upstream ships a new release.

set -euo pipefail

FORK_DIR="$(cd "$(dirname "$0")" && pwd)"
SCRIPTS_DIR="$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts"

echo "==> Fetching upstream..."
cd "$FORK_DIR"
git fetch upstream

UPSTREAM_TAG=$(git describe --tags upstream/main 2>/dev/null || git rev-parse --short upstream/main)
CURRENT_TAG=$(git describe --tags HEAD 2>/dev/null || git rev-parse --short HEAD)
echo "    current: $CURRENT_TAG"
echo "    upstream: $UPSTREAM_TAG"

if git merge-base --is-ancestor upstream/main HEAD; then
  echo "==> Already up to date."
  exit 0
fi

echo "==> Merging upstream/main..."
git merge upstream/main --no-edit

echo "==> Building (lite)..."
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
LITE_BUILD=true yarn vite build

echo "==> Deploying to MarkEdit scripts folder..."
cp dist/lite/markedit-preview.js "$SCRIPTS_DIR/markedit-preview.js"

echo "==> Restarting MarkEdit..."
osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'

echo "✓ Done — MarkEdit-preview updated to $(node -p "require('./package.json').version")"
