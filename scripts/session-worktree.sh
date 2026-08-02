#!/usr/bin/env bash
# session-worktree.sh — create a session-scoped git worktree so a Cowork/Claude
# session never builds or commits in a working tree another session owns.
#
# Why: concurrent sessions in one checkout race each other — parallel rebuilds,
# clobbered uncommitted work, HEAD moving underneath. A worktree gives this session
# its own working dir + index + HEAD while sharing the object store. See
# dev-policy.md §2 (Session isolation) and
# ~/Documents/Claude/preferences/operating-principles.md § Branch-state discipline.
#
# This is the FULL bootstrap: it doesn't just `git worktree add`, it makes the new
# worktree immediately runnable — copies the untracked essentials git leaves behind
# (.env etc.) and installs project dependencies. A fresh worktree that won't build is
# the #1 reason worktree discipline gets abandoned.
#
# Usage:
#   bash scripts/session-worktree.sh <branch> [options]
#
# Options:
#   --ref <git-ref>   Base for a NEW branch (default: origin/<branch> if it exists,
#                     else the remote default branch — origin/HEAD).
#   --tmp             Put the worktree in /tmp (ephemeral, build-only) instead of
#                     the persistent sibling dir ../<repo>-wt-<branch>.
#   --no-deps         Skip dependency installation (just worktree + env copy).
#   --link-deps       Symlink large dep dirs (node_modules) from the root checkout
#                     instead of installing fresh, to save disk. Best-effort.
#   -h | --help       Show this help.
#
# Convention: persistent worktrees live at ../<repo>-wt-<branch> (slashes->dashes).
# Teardown is handled at session close, or manually:
#   git worktree remove <dest>
#
# Discipline: set -euo pipefail; idempotent (no-op if the worktree already exists);
# loud on every step; dependency install is best-effort (warns, never aborts the run).
set -euo pipefail

die() { echo "session-worktree: $*" >&2; exit 1; }
note() { echo "session-worktree: $*"; }

# Print the worktree path that currently has <branch> checked out, if any.
# git allows a branch in only ONE worktree — this lets us fail friendly instead of
# dumping a raw `fatal: '<branch>' is already used by worktree at ...`.
existing_wt_for_branch() {
  git -C "$ROOT" worktree list --porcelain | awk -v b="refs/heads/$1" '
    /^worktree /{w=$2} /^branch /{if ($2==b) print w}'
}

BRANCH=""
REF=""
USE_TMP=0
DO_DEPS=1
LINK_DEPS=0

while [ $# -gt 0 ]; do
  case "$1" in
    --ref)        REF="${2:-}"; shift 2 ;;
    --tmp)        USE_TMP=1; shift ;;
    --no-deps)    DO_DEPS=0; shift ;;
    --link-deps)  LINK_DEPS=1; shift ;;
    -h|--help)    sed -n '2,40p' "$0"; exit 0 ;;
    -*)           die "unknown option: $1" ;;
    *)            if [ -z "$BRANCH" ]; then BRANCH="$1"; else die "unexpected arg: $1"; fi; shift ;;
  esac
done

[ -n "$BRANCH" ] || die "usage: session-worktree.sh <branch> [--ref REF] [--tmp] [--no-deps] [--link-deps]"

ROOT=$(git rev-parse --show-toplevel) || die "not inside a git repository"
NAME=$(basename "$ROOT")
SBR=$(printf '%s' "$BRANCH" | tr '/' '-')

# --- Resolve this repo's integration branch as a remote-tracking ref (origin/<branch>) ---
# origin/HEAD is the WRONG signal on this fleet: it mirrors the remote's DEFAULT branch (main),
# but dev-first repos integrate on 'dev'. Resolve, in order: (1) explicit
# override git config ag.integrationBranch; (2) first EXISTING of origin/dev, origin/staging
# (exact refs); (3) origin/HEAD. Kept byte-identical to new-session.sh — resolve once, both paths.
resolve_base_ref() {
  local d="${1:-.}" cfg cand def
  cfg=$(git -C "$d" config --get ag.integrationBranch 2>/dev/null || true)
  if [ -n "$cfg" ] && git -C "$d" show-ref --verify --quiet "refs/remotes/origin/$cfg"; then
    printf 'origin/%s\n' "$cfg"; return 0
  fi
  for cand in dev staging; do
    if git -C "$d" show-ref --verify --quiet "refs/remotes/origin/$cand"; then
      printf 'origin/%s\n' "$cand"; return 0
    fi
  done
  def=$(git -C "$d" symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's#^refs/remotes/##') || def=""
  [ -n "$def" ] && { printf '%s\n' "$def"; return 0; }
  return 1
}


if [ "$USE_TMP" -eq 1 ]; then
  DEST="/tmp/${NAME}-${SBR}-$(date '+%H%M%S')"
else
  DEST="$(dirname "$ROOT")/${NAME}-wt-${SBR}"
fi

# Idempotent: if a worktree already lives at DEST, report and stop.
if git -C "$ROOT" worktree list --porcelain | grep -qx "worktree $DEST"; then
  note "worktree already exists at $DEST — nothing to do"
  echo "WORKTREE: $DEST"
  exit 0
fi
[ -e "$DEST" ] && die "destination $DEST already exists but is not a registered worktree — refusing to clobber"

# Does the branch already exist (local or remote)?
BRANCH_EXISTS=0
if git -C "$ROOT" show-ref --verify --quiet "refs/heads/$BRANCH" \
   || git -C "$ROOT" ls-remote --exit-code --heads origin "$BRANCH" >/dev/null 2>&1; then
  BRANCH_EXISTS=1
fi

note "root=$ROOT  branch=$BRANCH  dest=$DEST  exists=$BRANCH_EXISTS"

if [ "$BRANCH_EXISTS" -eq 1 ]; then
  INUSE=$(existing_wt_for_branch "$BRANCH" || true)
  [ -n "$INUSE" ] && die "branch '$BRANCH' is already checked out at $INUSE — git allows a branch in only one worktree. cd there, or choose another branch."
  note "fetching origin/$BRANCH"
  git -C "$ROOT" fetch origin "$BRANCH" >/dev/null 2>&1 || note "fetch failed (offline?) — using local ref"
  git -C "$ROOT" worktree add "$DEST" "$BRANCH"
else
  # New branch: base it on --ref, else origin/<branch> (won't exist here), else the
  # resolved integration branch (resolve_base_ref: dev-first->dev, ent-d->staging, else origin/HEAD).
  if [ -z "$REF" ]; then
    DEFREF=$(resolve_base_ref "$ROOT" || echo "origin/main")
    REF="$DEFREF"
  fi
  note "fetching base ref $REF"
  git -C "$ROOT" fetch origin "${REF#origin/}" >/dev/null 2>&1 || note "fetch failed (offline?) — using local $REF"
  note "creating new branch $BRANCH from $REF"
  git -C "$ROOT" worktree add "$DEST" -b "$BRANCH" "$REF"
fi

# --- Copy untracked essentials git deliberately leaves behind (never committed) ---
COPIED=""
for f in .env .env.local .env.development.local .env.production.local config.env .dev.vars; do
  if [ -f "$ROOT/$f" ] && [ ! -e "$DEST/$f" ]; then
    cp "$ROOT/$f" "$DEST/$f" && COPIED="$COPIED $f"
  fi
done
[ -n "$COPIED" ] && note "copied untracked essentials:$COPIED" || note "no untracked .env/config files to copy"

# --- Optional: symlink large dependency dirs to save disk ---
if [ "$LINK_DEPS" -eq 1 ]; then
  if [ -d "$ROOT/node_modules" ] && [ ! -e "$DEST/node_modules" ]; then
    ln -s "$ROOT/node_modules" "$DEST/node_modules" && note "symlinked node_modules from root (skip install)"
    DO_DEPS=0
  fi
fi

# --- Best-effort dependency bootstrap (loud, NEVER aborts the run) ---
if [ "$DO_DEPS" -eq 1 ]; then
  deps() {
    if [ -f "$DEST/package.json" ]; then
      note "node project — installing deps"
      # Pick the package manager from the lockfile that's actually present, in precedence
      # order — NOT from package-lock.json alone. A Yarn/pnpm project that also carries a
      # stale package-lock.json (easy to acquire: one stray `npm install` years ago) would
      # otherwise get `npm ci`, which fails hard the moment that lockfile is out of sync
      # with package.json, and the worktree lands with no node_modules at all. Lived in
      # markedit-preview, twice in one session (#133).
      pm=npm-nolock
      if   [ -f "$DEST/yarn.lock" ];                                then pm=yarn
      elif [ -f "$DEST/pnpm-lock.yaml" ];                           then pm=pnpm
      elif [ -f "$DEST/bun.lockb" ] || [ -f "$DEST/bun.lock" ];     then pm=bun
      elif [ -f "$DEST/package-lock.json" ];                        then pm=npm
      fi
      # A lockfile whose tool isn't installed is worse than no lockfile — fall back rather
      # than fail, since this whole block is best-effort and must never abort the run.
      case "$pm" in
        yarn|pnpm|bun)
          command -v "$pm" >/dev/null 2>&1 || {
            note "  ${pm}.lock present but ${pm} is not installed — falling back to npm install"
            pm=npm-nolock
          } ;;
      esac
      case "$pm" in
        yarn)       note "  yarn.lock → yarn install"
                    ( cd "$DEST" && { yarn install --frozen-lockfile || yarn install; } ) ;;
        pnpm)       note "  pnpm-lock.yaml → pnpm install"
                    ( cd "$DEST" && { pnpm install --frozen-lockfile || pnpm install; } ) ;;
        bun)        note "  bun lockfile → bun install"
                    ( cd "$DEST" && bun install ) ;;
        npm)        note "  package-lock.json → npm ci"
                    ( cd "$DEST" && npm ci ) ;;
        npm-nolock) note "  no usable lockfile → npm install"
                    ( cd "$DEST" && npm install ) ;;
      esac
    elif [ -f "$DEST/pyproject.toml" ] || [ -f "$DEST/requirements.txt" ]; then
      note "python project — creating .venv + installing"
      ( cd "$DEST" && python3 -m venv .venv \
        && ( [ -f requirements.txt ] && ./.venv/bin/pip install -q -r requirements.txt || ./.venv/bin/pip install -q -e . ) )
    elif [ -f "$DEST/Cargo.toml" ]; then
      note "rust project — cargo fetch"; ( cd "$DEST" && cargo fetch )
    elif [ -f "$DEST/go.mod" ]; then
      note "go project — go mod download"; ( cd "$DEST" && go mod download )
    else
      note "no recognized dependency manifest — skipping install"
    fi
  }
  if deps; then note "dependency bootstrap complete"; else note "WARNING: dependency bootstrap failed — run the install manually in $DEST"; fi
fi

echo
echo "WORKTREE: $DEST"
echo "  branch:   $BRANCH"
echo "  cd there: cd $DEST"
echo "  teardown: git -C \"$ROOT\" worktree remove $DEST"
