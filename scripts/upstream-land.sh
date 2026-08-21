#!/usr/bin/env bash
# upstream-land.sh — integrate the watcher's vetted upstream merge into main.
#
# Companion to upstream-watch.sh. The watcher prepares (and, for a clean merge,
# builds) the upstream merge on branch `upstream-sync` in a sibling worktree.
# This script does the one reversible integration step: fast-forward `main` to
# that vetted merge and clean up. It deliberately STOPS THERE and hands the
# actual ship to the scotty:markedit-preview-ship skill — deploy/version/tag/push
# stay behind that gate, per the ship-via-skill doctrine.
#
# Refuses to run if:
#   - the worktree merge is still in progress / has unresolved conflicts
#   - upstream/main isn't actually contained in the vetted branch
#   - your main checkout has uncommitted changes (never clobbers WIP)

set -euo pipefail
export PATH="$HOME/.volta/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE="${REPO}-wt-upstream-sync"
SYNC_BRANCH="upstream-sync"
STATE_DIR="$HOME/.markedit-upstream-sync"

cd "$REPO"

die() { echo "❌ $*" >&2; exit 1; }

# ── preconditions ──────────────────────────────────────────────────────────────
[ -d "$WORKTREE" ] || die "No prepared worktree at ${WORKTREE}. Nothing to land (run the watcher, or upstream had nothing new)."

git -C "$WORKTREE" rev-parse --verify -q "$SYNC_BRANCH" >/dev/null \
  || die "Branch ${SYNC_BRANCH} not found in the worktree."

# Merge must be fully resolved and committed — no unmerged paths, no MERGE_HEAD.
if [ -n "$(git -C "$WORKTREE" diff --name-only --diff-filter=U)" ] \
   || git -C "$WORKTREE" rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1; then
  echo "Conflicts are still unresolved in ${WORKTREE}."
  echo "Resolve them there and commit the merge, then re-run this. See:"
  echo "  ${STATE_DIR}/status.md"
  exit 1
fi

# The vetted branch must actually contain current upstream/main.
git fetch upstream -q 2>/dev/null || true
if ! git merge-base --is-ancestor upstream/main "$SYNC_BRANCH"; then
  die "Upstream has advanced since this merge was prepared. Re-run the watcher to re-prepare (scripts/upstream-watch.sh)."
fi

# Never clobber uncommitted work in the main checkout.
if [ -n "$(git status --porcelain)" ]; then
  die "Your main checkout has uncommitted changes. Commit or stash them first."
fi

CUR_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
[ "$CUR_BRANCH" = "main" ] || die "Main checkout is on '${CUR_BRANCH}', not main. Switch to main first."

# ── integrate ──────────────────────────────────────────────────────────────────
BEFORE="$(git rev-parse --short main)"
echo "==> Integrating ${SYNC_BRANCH} into main..."
if git merge --ff-only "$SYNC_BRANCH" -q 2>/dev/null; then
  echo "    fast-forwarded main ${BEFORE} → $(git rev-parse --short main)"
else
  # main advanced independently since prep — make a real merge commit (hooks off
  # so the repo's post-commit auto-push doesn't fire before the ship skill runs).
  git -c core.hooksPath=/dev/null merge --no-ff --no-edit "$SYNC_BRANCH" -q
  echo "    merged (non-ff) main ${BEFORE} → $(git rev-parse --short main)"
fi

# ── clean up the worktree + branch (main now contains the merge) ───────────────
git worktree remove --force "$WORKTREE" 2>/dev/null || true
git branch -D "$SYNC_BRANCH" -q 2>/dev/null || true
rm -f "$STATE_DIR/status.md" "$STATE_DIR/last-notified"

UP_TAG="$(git describe --tags upstream/main 2>/dev/null || git rev-parse --short upstream/main)"
echo ""
echo "✅ main now contains upstream ${UP_TAG}. Nothing has been deployed or pushed yet."
echo ""
echo "   Ship it with the ship skill (deploy + version + tag + push + reload):"
echo "     invoke the scotty:markedit-preview-ship skill  (--full --reload)"
echo ""
echo "   Nothing is live until you ship. To undo this integration instead:"
echo "     git reset --hard ${BEFORE}"
