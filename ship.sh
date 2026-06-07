#!/bin/bash
# ship.sh — Build and deploy markedit-preview, optionally commit + tag + push
# Usage:
#   bash ship.sh                 # build:lite + deploy only
#   bash ship.sh --full          # full build (lint + build) + deploy
#   bash ship.sh --push          # build + git commit + tag + push
#   bash ship.sh --reload        # build + restart MarkEdit after deploy
#   bash ship.sh --push --reload # all of the above

set -euo pipefail

if [ -z "${MARKEDIT_SHIP_VIA_SKILL:-}" ] && [ -z "${MARKEDIT_SHIP_DIRECT:-}" ]; then
  echo "DOCTRINE VIOLATION: Do not call ship.sh directly."
  echo "    Use: invoke the scotty:markedit-preview-ship Cowork skill"
  echo "    To bypass: MARKEDIT_SHIP_DIRECT=1 bash ship.sh [args]"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH

VERSION=$(node -p "require('./package.json').version")
FULL_BUILD=false
DO_PUSH=false
DO_RELOAD=false

for arg in "$@"; do
  case "$arg" in
    --full)   FULL_BUILD=true ;;
    --push)   DO_PUSH=true ;;
    --reload) DO_RELOAD=true ;;
  esac
done

# ?? 1. Build ????????????????????????????????????????????????????????????????
echo ""
echo "? Building markedit-preview v${VERSION}..."

if $FULL_BUILD; then
  echo "  (full build with lint)"
  yarn build
else
  echo "  (lite build — skip lint)"
  yarn build:lite
fi

  # Sync built JS to both script locations MarkEdit may load from
  SHARED="$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts"
  PRIVATE="$HOME/Library/Containers/app.cyan.markedit/Data/Documents/scripts"
  mkdir -p "$SHARED"
  cp dist/markedit-preview.js "$SHARED/markedit-preview.js"
  if [ -d "$PRIVATE" ]; then
    cp dist/markedit-preview.js "$PRIVATE/markedit-preview.js"
  fi

echo "?  Build complete — deployed to MarkEdit scripts folder"

# ?? 2. Git commit + tag + push ???????????????????????????????????????????????
if $DO_PUSH; then
  echo ""
  echo "? Committing and pushing v${VERSION}..."
  git add -A
  git commit -m "ship markedit-preview v${VERSION}" 2>/dev/null || echo "  (nothing to commit)"
  git tag -f "v${VERSION}" 2>/dev/null || true
  git push 2>/dev/null || echo "  (no remote configured)"
  git push --tags --force 2>/dev/null || echo "  (tags: no remote)"
  echo "?  Pushed v${VERSION}"
fi

# ?? 3. Reload MarkEdit ????????????????????????????????????????????????????????
if $DO_RELOAD; then
  echo ""
  echo "? Reloading MarkEdit..."
  yarn reload 2>/dev/null || osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'
  echo "?  MarkEdit reloaded"
fi

echo ""
echo "Done. markedit-preview v${VERSION} is live."