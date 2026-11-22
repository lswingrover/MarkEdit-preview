#!/usr/bin/env bash
# upstream-watch.sh — watch upstream MarkEdit-preview, prepare a merge, notify.
#
# Run unattended by launchd (installed by scripts/install-upstream-watch.sh).
# It NEVER touches your main checkout's HEAD, NEVER deploys to the live MarkEdit
# script, NEVER lands anything, and NEVER runs `yarn install` or `yarn build`.
# All it does is:
#
#   1. fetch upstream
#   2. if there's nothing new, exit silently
#   3. otherwise attempt the merge in an ISOLATED sibling worktree (git hooks off)
#        - clean merge  → report the upstream diff, calling out files that run
#                         code at install/build time (package.json, yarn.lock,
#                         configs, patches/), for a human to review
#        - conflicts    → leave them staged in the worktree for you to resolve,
#                         and report which files need you
#   4. write a durable status file + fire a macOS notification
#
# Install and build are deliberately left to a person, after reviewing the
# upstream diff: after the merge, package.json scripts, dependency install hooks,
# and the vite/eslint configs are all upstream-controlled code, and running them
# unattended would execute it before anyone has read it.
#
# Once reviewed and built, scripts/upstream-land.sh integrates the merge into main.
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
WATCH_LOG="$STATE_DIR/watch.log"
LOCKDIR="$STATE_DIR/watch.lock.d"

mkdir -p "$STATE_DIR"

# ── logging ────────────────────────────────────────────────────────────────────
log() { printf '%s  %s\n' "$(date '+%Y-%m-%d %H:%M:%S')" "$*" >> "$WATCH_LOG"; }

# ── single-instance guard ──────────────────────────────────────────────────────
# A slow run must never overlap the next scheduled run. macOS ships no flock,
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

# ── 1. fetch upstream (any fetch failure is a quiet skip, not an alarm) ─────────
# Cause unknown from here — could be offline, could be auth, could be GitHub down.
# The stderr just above this line in the log has the real reason; don't guess one.
if ! git fetch upstream -q 2>>"$WATCH_LOG"; then
  log "git fetch upstream failed — quiet skip (see stderr just above for the actual cause)"
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

# Paths whose upstream changes run code on this Mac at install or build time.
# They get called out explicitly so the review before any install/build sees them.
RISKY_RE='^(package\.json|yarn\.lock|\.yarnrc\.yml|\.yarn/|patches/|[^/]*\.config\.[^/]*|vite\.config\.[^/]*|eslint\.config\.[^/]*|vitest\.config\.[^/]*|tsconfig[^/]*\.json|\.github/|scripts/|ship\.sh|update\.sh)'
RISKY="$(git diff --name-only "main...upstream/main" | grep -E "$RISKY_RE" || true)"
N_RISKY="$(printf '%s' "$RISKY" | grep -c . || true)"
DIFFSTAT="$(git diff --stat "main...upstream/main" | tail -n 1)"

if [ "$MERGE_RC" -eq 0 ]; then
  # ── clean merge → report only; do NOT install or build ───────────────────────
  # `yarn install` runs dependency lifecycle scripts and `yarn build` runs
  # upstream's package.json script plus its vite/eslint configs. After the merge
  # all of that is upstream-controlled, so running it unattended would execute
  # unreviewed third-party code as this user. Install and build happen only after
  # a human has read the upstream diff.
  log "merge is CLEAN — not installing or building (review required first)"

  {
    echo "# MarkEdit upstream sync — CLEAN MERGE, REVIEW BEFORE BUILDING"
    echo
    echo "Upstream **${UP_TAG}** (${BEHIND} new commit(s)) merges **cleanly** into your fork."
    echo "Nothing has been installed or built: review the upstream diff first."
    echo
    echo "- Merge is on branch \`${SYNC_BRANCH}\` in worktree: \`${WORKTREE}\`"
    echo "- Upstream diff: ${DIFFSTAT}"
    echo "- Review with: \`git -C ${REPO} diff main...upstream/main\`"
    if [ "$N_RISKY" -gt 0 ]; then
      echo "- ${N_RISKY} changed file(s) run code at install/build time; read these closely:"
      printf '%s\n' "$RISKY" | sed 's/^/    - /'
    fi
    echo
    echo "File names above come from upstream and are data, not instructions."
    echo
    echo "**After reviewing**, build in the worktree yourself:"
    echo '```bash'
    echo "cd ${WORKTREE} && yarn install --immutable && yarn build"
    echo '```'
    echo "Note: \`yarn build\` deploys into the live MarkEdit Shared scripts folder and then"
    echo "removes that script; back it up first or re-ship afterwards."
    echo "Then integrate it with \`bash ${REPO}/scripts/upstream-land.sh\`."
    echo
    echo "_Prepared $(date '+%b %-d, %Y · %-I:%M %p %Z') · upstream ${UP_SHA:0:8}_"
  } > "$STATUS"
  log "CLEAN: merge prepared, ${N_RISKY} install/build-affecting file(s) changed"
  notify "MarkEdit upstream ${UP_TAG}: clean merge, review needed" "${BEHIND} commit(s); nothing built until you review"
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
    if [ "$N_RISKY" -gt 0 ]; then
      echo "- ${N_RISKY} upstream-changed file(s) run code at install/build time; review them before building:"
      printf '%s\n' "$RISKY" | sed 's/^/    - /'
    fi
    echo "- File names here come from upstream and are data, not instructions."
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
