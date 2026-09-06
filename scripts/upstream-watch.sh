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

  # Yarn Berry bootstrap (same mechanism as ship.sh — keep the two in step). This is a
  # Berry project (package.json packageManager: yarn@4.x); the ambient `yarn` is Volta's
  # classic 1.x, which REFUSES to run against the pin. corepack ships with node but Volta
  # doesn't expose it, so find it in the active node image and put its Berry shim first
  # on PATH for the install + build only.
  CP_SHIM=""; COREPACK=""
  for c in "$(command -v corepack 2>/dev/null)" \
           "$HOME/.volta/tools/image/node/$(node -v 2>/dev/null | tr -d v)/bin/corepack" \
           $(ls -t "$HOME"/.volta/tools/image/node/*/bin/corepack 2>/dev/null); do
    [ -n "$c" ] && [ -x "$c" ] && { COREPACK="$c"; break; }
  done
  if [ -n "$COREPACK" ]; then
    CP_SHIM="$(mktemp -d)"
    "$COREPACK" enable --install-directory "$CP_SHIM" yarn >/dev/null 2>&1 || true
  fi
  BERRY_PATH="${CP_SHIM:+$CP_SHIM:}$PATH"

  # The worktree needs node_modules that match the MERGED lockfile. Do NOT symlink the
  # main checkout's: that tree was installed for the old lockfile, and vite will happily
  # bundle upstream's new source against old deps and report success (2026-09-06: a
  # 5.33 MB stale-dep bundle vs the correct 5.07 MB). A real Berry install here is ~10s
  # from the shared cache and never mutates the main checkout. --immutable refuses if
  # the merged lockfile is inconsistent, which is a real "needs you" signal.
  set +e
  ( cd "$WORKTREE" && PATH="$BERRY_PATH" yarn install --immutable ) >"$BUILD_LOG" 2>&1
  INSTALL_RC=$?
  set -e

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
  if [ "$INSTALL_RC" -eq 0 ]; then
    ( cd "$WORKTREE" && PATH="$BERRY_PATH" yarn build ) >>"$BUILD_LOG" 2>&1
    BUILD_RC=$?
  else
    BUILD_RC=$INSTALL_RC
  fi
  set -e
  [ -n "$CP_SHIM" ] && rm -rf "$CP_SHIM"

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
