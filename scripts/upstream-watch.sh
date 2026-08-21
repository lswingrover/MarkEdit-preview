#!/usr/bin/env bash
# upstream-watch.sh — watch upstream MarkEdit-preview, prepare a vetted merge, notify.
#
# Run unattended by launchd (see scripts/com.lou.markedit-upstream-watch.plist).
# It NEVER touches your main checkout's HEAD, NEVER deploys to the live MarkEdit
# script, and NEVER lands anything. All it does is:
#
#   1. fetch upstream
#   2. if there's nothing new, exit silently
#   3. otherwise attempt the merge in an ISOLATED sibling worktree
#        - clean merge  → build it (full, to prove KaTeX/Mermaid still compile)
#                         and report "ready to land"
#        - conflicts    → leave them staged in the worktree for you to resolve,
#                         and report which files need you
#   4. write a durable status file + fire a macOS notification
#
# You (or a Claude session) then run scripts/upstream-land.sh to finish the job.
# Because this fork heavily modifies the same files upstream does, CONFLICTS ARE
# THE COMMON CASE — the value here is the notification plus a worktree with the
# merge already attempted, so resolution is fast.

set -euo pipefail

# launchd runs with a minimal PATH; volta hosts node/yarn on this Mac.
export PATH="$HOME/.volta/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE="${REPO}-wt-upstream-sync"          # sibling dir, never inside the repo
SYNC_BRANCH="upstream-sync"
STATE_DIR="$HOME/.markedit-upstream-sync"
STATUS="$STATE_DIR/status.md"
LAST_NOTIFIED="$STATE_DIR/last-notified"
BUILD_LOG="$STATE_DIR/build.log"
WATCH_LOG="$STATE_DIR/watch.log"
LOCKDIR="$STATE_DIR/watch.lock.d"
SHARED="$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts/markedit-preview.js"

mkdir -p "$STATE_DIR"

# ── logging ────────────────────────────────────────────────────────────────────
log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$WATCH_LOG"; }

# ── single-instance guard ──────────────────────────────────────────────────────
# A slow build must never overlap the next scheduled run. macOS ships no flock,
# so use an atomic mkdir lock; steal it if a crashed run left it >2h stale.
if ! mkdir "$LOCKDIR" 2>/dev/null; then
  if [ -n "$(find "$LOCKDIR" -maxdepth 0 -mmin +120 2>/dev/null)" ]; then
    log "stale lock (>2h) — stealing it"
    rmdir "$LOCKDIR" 2>/dev/null || true
    mkdir "$LOCKDIR" 2>/dev/null || { log "could not acquire lock — skipping"; exit 0; }
  else
    log "another watch run holds the lock — skipping"
    exit 0
  fi
fi

# ── macOS notification ─────────────────────────────────────────────────────────
notify() {  # notify <title> <message>
  local title="$1" msg="$2"
  osascript -e "display notification \"${msg//\"/\\\"}\" with title \"${title//\"/\\\"}\" subtitle \"see status.md for how to land\"" >/dev/null 2>&1 || true
}

# Any unexpected failure is surfaced, never swallowed — a silent watcher that
# has quietly died is worse than a noisy one.
trap 'rc=$?; rmdir "$LOCKDIR" 2>/dev/null || true; if [ $rc -ne 0 ]; then log "ERROR: exited $rc (see above)"; notify "MarkEdit upstream watch errored" "watcher exited $rc — check $WATCH_LOG"; fi' EXIT

cd "$REPO"

# ── 1. fetch upstream (network failure is a quiet skip, not an alarm) ───────────
if ! git fetch upstream -q 2>>"$WATCH_LOG"; then
  log "git fetch upstream failed (offline?) — quiet skip"
  exit 0
fi

UP_SHA="$(git rev-parse upstream/main)"
UP_TAG="$(git describe --tags upstream/main 2>/dev/null || git rev-parse --short upstream/main)"
MAIN_SHA="$(git rev-parse main)"

# ── 2. nothing new? ────────────────────────────────────────────────────────────
if git merge-base --is-ancestor upstream/main main; then
  log "up to date (upstream ${UP_TAG} already in main) — clearing status"
  rm -f "$STATUS"
  exit 0
fi

BEHIND="$(git rev-list --count main..upstream/main)"

# ── 3. already notified for this exact upstream head? ──────────────────────────
# Dedupe so a daily cron doesn't re-fire the same alert every day. If the vetted
# worktree is gone (e.g. landed or cleaned), fall through and re-prepare.
if [ -f "$LAST_NOTIFIED" ] && [ "$(cat "$LAST_NOTIFIED")" = "$UP_SHA" ] && [ -d "$WORKTREE" ]; then
  log "already notified for upstream ${UP_TAG} (${UP_SHA:0:8}) and worktree present — skipping"
  exit 0
fi

log "new upstream: ${UP_TAG} (${UP_SHA:0:8}); main is ${BEHIND} behind — preparing merge"

# ── 4. prepare the isolated worktree and attempt the merge ─────────────────────
# All git writes disable hooks: the repo's post-commit hook auto-pushes, and a
# clean merge here would otherwise silently push the sync branch to origin.
GIT_NOHOOKS=(git -c core.hooksPath=/dev/null)

if [ -d "$WORKTREE" ]; then
  "${GIT_NOHOOKS[@]}" -C "$WORKTREE" merge --abort 2>/dev/null || true
  "${GIT_NOHOOKS[@]}" -C "$WORKTREE" reset --hard main -q
else
  # -B recreates the branch at main even if it already exists from a prior run.
  "${GIT_NOHOOKS[@]}" worktree add -B "$SYNC_BRANCH" "$WORKTREE" main -q
fi

set +e
MERGE_OUT="$("${GIT_NOHOOKS[@]}" -C "$WORKTREE" merge --no-edit upstream/main 2>&1)"
MERGE_RC=$?
set -e

CLICK_STATUS="$STATUS"

if [ "$MERGE_RC" -eq 0 ]; then
  # ── clean merge → prove it still builds ──────────────────────────────────────
  log "merge is CLEAN — building to verify"

  # The worktree needs node_modules to build. Symlink the main checkout's rather
  # than install: `vite build` only READS node_modules, so this never mutates the
  # real one, and it's instant. If upstream changed dependencies, the build fails
  # loudly below and we report "needs you" — the correct outcome for a dep change.
  [ -e "$WORKTREE/node_modules" ] || ln -s "$REPO/node_modules" "$WORKTREE/node_modules"

  # `yarn build` deploys to the live Shared script mid-build (hardcoded to the OS
  # home dir — not redirectable via $HOME) and then deletes it. Back up the live
  # script and restore it byte-for-byte so a running MarkEdit is untouched. The
  # scheduled hour is quiet precisely so this window can't collide with a reload.
  SHARED_BACKUP=""
  if [ -f "$SHARED" ]; then
    SHARED_BACKUP="$(mktemp)"
    cp "$SHARED" "$SHARED_BACKUP"
  fi

  set +e
  ( cd "$WORKTREE" && yarn build ) >"$BUILD_LOG" 2>&1
  BUILD_RC=$?
  set -e

  if [ -n "$SHARED_BACKUP" ]; then
    cp "$SHARED_BACKUP" "$SHARED"       # restore the live script exactly
    rm -f "$SHARED_BACKUP"
  fi

  if [ "$BUILD_RC" -eq 0 ]; then
    cat > "$STATUS" <<EOF
# MarkEdit upstream sync — READY TO LAND ✅

Upstream **${UP_TAG}** (${BEHIND} new commit(s)) merges **cleanly** into your fork
and the full build (KaTeX + Mermaid) is **green**.

- Vetted merge is on branch \`${SYNC_BRANCH}\` in worktree: \`${WORKTREE}\`
- Build log: \`${BUILD_LOG}\`

**Land it:**
\`\`\`bash
bash ${REPO}/scripts/upstream-land.sh
\`\`\`
That fast-forwards \`main\` to the vetted merge, then hands off to the
\`scotty:markedit-preview-ship\` skill to build, version, deploy, and reload.

_Prepared $(date '+%b %-d, %Y · %-I:%M %p %Z') · upstream ${UP_SHA:0:8}_
EOF
    log "READY: clean + builds green"
    notify "MarkEdit upstream ${UP_TAG} ready to land" "clean merge, build green — ${BEHIND} commit(s)"
  else
    cat > "$STATUS" <<EOF
# MarkEdit upstream sync — CLEAN MERGE, BUILD FAILED ⚠️

Upstream **${UP_TAG}** (${BEHIND} new commit(s)) merges cleanly, but the full
build **failed** — likely a dependency change or an API break upstream.

- Merge is on branch \`${SYNC_BRANCH}\` in worktree: \`${WORKTREE}\`
- **Build log (start here):** \`${BUILD_LOG}\`

This needs you: open the worktree, \`yarn install\` if deps changed, fix the build,
then run \`bash ${REPO}/scripts/upstream-land.sh\`.

_Prepared $(date '+%b %-d, %Y · %-I:%M %p %Z') · upstream ${UP_SHA:0:8}_
EOF
    log "CLEAN MERGE but BUILD FAILED (rc=$BUILD_RC)"
    notify "MarkEdit upstream ${UP_TAG}: build failed" "merges clean but won't build — needs you"
  fi
else
  # ── conflicts → leave them staged for resolution ─────────────────────────────
  # Separate real source conflicts from generated dist/* artifacts (the build
  # regenerates those, so they're noise you resolve by rebuilding).
  CONFLICTS="$("${GIT_NOHOOKS[@]}" -C "$WORKTREE" diff --name-only --diff-filter=U)"
  SRC_CONFLICTS="$(printf '%s\n' "$CONFLICTS" | grep -v '^dist/' || true)"
  DIST_CONFLICTS="$(printf '%s\n' "$CONFLICTS" | grep '^dist/' || true)"
  N_SRC="$(printf '%s' "$SRC_CONFLICTS" | grep -c . || true)"
  N_DIST="$(printf '%s' "$DIST_CONFLICTS" | grep -c . || true)"

  {
    echo "# MarkEdit upstream sync — CONFLICTS, NEEDS YOU ⚠️"
    echo
    echo "Upstream **${UP_TAG}** (${BEHIND} new commit(s)) does not merge cleanly."
    echo "The merge is left **in progress** in an isolated worktree so you can resolve"
    echo "it without re-fetching or re-merging."
    echo
    echo "- Worktree: \`${WORKTREE}\`  (branch \`${SYNC_BRANCH}\`)"
    echo "- ${N_SRC} source file(s) need you:"
    printf '%s\n' "$SRC_CONFLICTS" | sed 's/^/    - /'
    if [ "$N_DIST" -gt 0 ]; then
      echo "- ${N_DIST} generated \`dist/\` artifact(s) also conflict — ignore; the build regenerates them."
    fi
    echo
    echo "**Resolve, then land:**"
    echo '```bash'
    echo "cd ${WORKTREE}"
    echo "# resolve the source conflicts above (git status), then:"
    echo "git checkout --theirs dist/ 2>/dev/null; git add -A && git commit --no-verify --no-edit"
    echo "bash ${REPO}/scripts/upstream-land.sh"
    echo '```'
    echo
    echo "_Prepared $(date '+%b %-d, %Y · %-I:%M %p %Z') · upstream ${UP_SHA:0:8}_"
  } > "$STATUS"
  log "CONFLICTS: ${N_SRC} source, ${N_DIST} dist — left in worktree"
  notify "MarkEdit upstream ${UP_TAG}: ${N_SRC} conflict(s)" "merge left in worktree — needs you"
fi

# ── 5. record so we don't re-fire for this same upstream head ──────────────────
echo "$UP_SHA" > "$LAST_NOTIFIED"
log "done — status at $CLICK_STATUS"
