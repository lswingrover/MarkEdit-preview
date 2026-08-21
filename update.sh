#!/usr/bin/env bash
# update.sh — merge upstream MarkEdit-preview + rebuild + deploy (manual, unvetted).
# Usage: ./update.sh
#
# SUPERSEDED by the automated watch-and-land flow — prefer that unless you
# specifically want a blind, immediate merge-into-main:
#   scripts/upstream-watch.sh   watches upstream, prepares+builds the merge on a
#                               branch in an isolated worktree, and notifies you
#   scripts/upstream-land.sh    integrates that vetted merge into main
#   scripts/install-upstream-watch.sh   installs the daily launchd watcher
#
# This script does a direct merge into your current checkout with no conflict
# vetting and no build gate, so keep it only as an escape hatch.

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

echo "==> Building (full — matches the deployed variant: KaTeX + Mermaid)..."
export PATH="$HOME/.volta/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
# Full build. `yarn build` deploys via vite's copy plugin and then removes the
# Shared script, so we re-copy the full artifact below. (The old lite build here
# silently replaced the ~5 MB full script with the ~315 KB lite one, stripping
# KaTeX + Mermaid — that was a footgun, not intended behavior.)
yarn build

echo "==> Deploying to MarkEdit scripts folder..."
cp dist/markedit-preview.js "$SCRIPTS_DIR/markedit-preview.js"

echo "==> Restarting MarkEdit..."
osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'

echo "✓ Done — MarkEdit-preview updated to $(node -p "require('./package.json').version")"
