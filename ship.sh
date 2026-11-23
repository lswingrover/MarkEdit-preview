#!/bin/bash
# ship.sh — Build and deploy markedit-preview, optionally commit + tag + push
#
# Usage:
#   bash ship.sh                        # FULL build (lint + katex/mermaid) + deploy, no version change
#   bash ship.sh --lite                 # fast lite build (skips lint) — NO katex/mermaid; must ask for it
#   bash ship.sh --push                 # + auto patch-bump, git commit + tag + push
#   bash ship.sh --push --minor         # push with a minor bump instead of patch
#   bash ship.sh --push --major         # push with a major bump
#   bash ship.sh --push --version=1.9.1 # push with an explicit version (skips auto-bump)
#   bash ship.sh --no-reload            # deploy but DON'T restart MarkEdit
#
# Reload is ON by default: after every deploy MarkEdit is restarted so the new
# bundle is actually live. A running MarkEdit won't pick up a re-deployed bundle
# until it relaunches, which reads as "my extensions didn't change" — reloading
# by default closes that gap. Pass --no-reload for a quiet local build that
# leaves your current MarkEdit session untouched. (--reload is still accepted as
# a no-op, since reload is now the default.)
#
# Version is only ever touched on a --push run — a plain build:deploy for
# local testing never rewrites package.json.
#
# --push ships COMMITTED work only. Commit your changes first; --push then adds
# a single ship commit holding just the version bump, CHANGELOG.md, and the
# rebuilt dist/ bundles. It refuses to start if the working tree has untracked
# files or uncommitted edits to tracked files.
#
# --push also needs a changelog helper: set MARKEDIT_CHANGELOG_SCRIPT to a
# script that accepts `--repo <dir> --version <X.Y.Z>` and updates CHANGELOG.md.
# To ship without a changelog entry on purpose, set MARKEDIT_SKIP_CHANGELOG=1.

set -euo pipefail

if [ -z "${MARKEDIT_SHIP_VIA_SKILL:-}" ] && [ -z "${MARKEDIT_SHIP_DIRECT:-}" ]; then
  echo "DOCTRINE VIOLATION: Do not call ship.sh directly."
  echo "    Use the maintainer's ship wrapper, which sets MARKEDIT_SHIP_VIA_SKILL."
  echo "    To bypass: MARKEDIT_SHIP_DIRECT=1 bash ship.sh [args]"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH

# ── Yarn Berry bootstrap ────────────────────────────────────────────────────
# This is a Yarn Berry project (package.json packageManager: yarn@4.x). The
# ambient `yarn` is Volta's classic 1.x, which REFUSES to run against a
# packageManager pin ("Corepack must currently be enabled"). Point every yarn
# call in this script — and the nested `yarn lint` inside the build script — at
# corepack's Berry shim by putting it first on PATH. corepack ships with node
# but Volta doesn't expose it, so find it in the active node's image bin dir.
if ! yarn --version >/dev/null 2>&1 || [ "$(yarn --version 2>/dev/null | cut -d. -f1)" = "1" ]; then
  COREPACK=""
  for c in "$(command -v corepack 2>/dev/null)" \
           "$HOME/.volta/tools/image/node/$(node -v 2>/dev/null | tr -d v)/bin/corepack" \
           $(ls -t "$HOME"/.volta/tools/image/node/*/bin/corepack 2>/dev/null); do
    [ -n "$c" ] && [ -x "$c" ] && { COREPACK="$c"; break; }
  done
  if [ -n "$COREPACK" ]; then
    CP_SHIM="$(mktemp -d)"
    trap 'rm -rf "$CP_SHIM"' EXIT   # don't leave a corepack shim dir behind per run
    "$COREPACK" enable --install-directory "$CP_SHIM" yarn >/dev/null 2>&1 || true
    export PATH="$CP_SHIM:$PATH"
  fi
  if ! yarn --version >/dev/null 2>&1 || [ "$(yarn --version 2>/dev/null | cut -d. -f1)" = "1" ]; then
    echo "❌ Could not activate Yarn Berry (need corepack). Run 'corepack enable' and retry." >&2
    exit 1
  fi
fi

# FULL build is the default: it carries KaTeX + Mermaid. The lite build strips
# them, so it must be asked for explicitly (--lite) — a plain run can no longer
# silently downgrade a full deployment to lite (that footgun bit on 2026-08-01
# and again 2026-09-03).
FULL_BUILD=true
DO_PUSH=false
DO_RELOAD=true   # reload MarkEdit after deploy by default; --no-reload opts out
BUMP_KIND="patch"
EXPLICIT_VERSION=""

for arg in "$@"; do
  case "$arg" in
    --full)       FULL_BUILD=true ;;   # no-op now (full is the default); kept for back-compat
    --lite)       FULL_BUILD=false ;;  # opt IN to the stripped build (no KaTeX/Mermaid)
    --push)       DO_PUSH=true ;;
    --reload)     DO_RELOAD=true ;;   # no-op now (reload is the default); kept for back-compat
    --no-reload)  DO_RELOAD=false ;;
    --minor)      BUMP_KIND="minor" ;;
    --major)      BUMP_KIND="major" ;;
    --version=*)  EXPLICIT_VERSION="${arg#--version=}" ;;
  esac
done

# ── 0. Branch guard ────────────────────────────────────────────────────────────
# Mirrors the wolfgar-chat ship convention: only bump/push from a clean main.
# A --push from elsewhere still commits + tags + pushes current HEAD (useful for
# a hotfix branch), it just never touches the version number.
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
ON_MAIN=false
if [ "$CURRENT_BRANCH" = "main" ]; then
  ON_MAIN=true
fi
if $DO_PUSH && ! $ON_MAIN; then
  echo "⚠️  On branch '${CURRENT_BRANCH}', not main — shipping current HEAD as-is, no version bump."
fi

# A --push commits and publishes. Refuse if there are untracked (non-ignored)
# files: they are not part of a ship and would otherwise risk being swept into
# a public commit. Commit, delete, or ignore them first.
if $DO_PUSH; then
  UNTRACKED="$(git ls-files --others --exclude-standard)"
  if [ -n "$UNTRACKED" ]; then
    echo "❌ Untracked files present; refusing to --push. Commit, remove, or ignore them first:" >&2
    printf '%s\n' "$UNTRACKED" | sed 's/^/    /' >&2
    echo "    --push ships committed work only; it adds just the version bump, changelog, and bundles." >&2
    exit 1
  fi
  # Likewise refuse uncommitted edits to tracked files: an unrelated or debug
  # change would otherwise be built into dist/ and published under the ship.
  if ! git diff --quiet HEAD --; then
    echo "❌ Uncommitted changes to tracked files; refusing to --push:" >&2
    git diff --name-only HEAD -- | sed 's/^/    /' >&2
    echo "    --push ships committed work only. Commit the work you want to ship (or stash" >&2
    echo "    what you don't), then re-run; the ship commit adds just the version bump," >&2
    echo "    CHANGELOG.md, and the rebuilt dist/ bundles." >&2
    exit 1
  fi
  # A ship without a changelog entry must be a deliberate choice, not the quiet
  # result of a wrapper that forgot to configure the helper.
  CHANGELOG_SCRIPT="${MARKEDIT_CHANGELOG_SCRIPT:-}"
  if [ "${MARKEDIT_SKIP_CHANGELOG:-}" != "1" ]; then
    if [ -z "$CHANGELOG_SCRIPT" ] || [ ! -f "$CHANGELOG_SCRIPT" ]; then
      echo "❌ No changelog helper; refusing to --push." >&2
      echo "    Set MARKEDIT_CHANGELOG_SCRIPT to a script that accepts" >&2
      echo "    '--repo <dir> --version <X.Y.Z>' and updates CHANGELOG.md," >&2
      echo "    or set MARKEDIT_SKIP_CHANGELOG=1 to ship without a changelog entry." >&2
      exit 1
    fi
  fi
fi

# ── 1. Version ─────────────────────────────────────────────────────────────────
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Work out the version first and write package.json only after the tag check
# below, so a refused ship leaves the working tree untouched.
if [ -n "$EXPLICIT_VERSION" ]; then
  VERSION="$EXPLICIT_VERSION"
elif $DO_PUSH && $ON_MAIN; then
  VERSION=$(node -e "
    const [ma, mi, pa] = require('./package.json').version.split('.').map(Number);
    if ('${BUMP_KIND}' === 'major') { console.log((ma + 1) + '.0.0'); }
    else if ('${BUMP_KIND}' === 'minor') { console.log(ma + '.' + (mi + 1) + '.0'); }
    else { console.log(ma + '.' + mi + '.' + (pa + 1)); }
  ")
else
  VERSION="$CURRENT_VERSION"
fi

# Published release tags are never moved. A --push that would create a new
# release (on main, or with --version) stops here, before building, if its tag
# already exists. A --push from another branch without --version ships HEAD
# under the current version; if that version is already tagged, the commit is
# pushed untagged.
CREATE_TAG=false
if $DO_PUSH; then
  if git rev-parse -q --verify "refs/tags/v${VERSION}" >/dev/null; then
    if $ON_MAIN || [ -n "$EXPLICIT_VERSION" ]; then
      echo "❌ Tag v${VERSION} already exists; refusing to --push. Pick another version (--version=X.Y.Z)." >&2
      exit 1
    fi
    echo "⚠️  Tag v${VERSION} already exists; this ship's commit will be pushed untagged."
  else
    CREATE_TAG=true
  fi
fi

if [ "$VERSION" != "$CURRENT_VERSION" ]; then
  node -e "
    const fs = require('fs');
    const p = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    p.version = process.argv[1];
    fs.writeFileSync('package.json', JSON.stringify(p, null, 2) + '\n');
  " "$VERSION"
fi

# ── 1.5 Sync node_modules to the lockfile ──────────────────────────────────────
# A ship must build against exactly the committed lockfile. After an upstream land
# (package.json + yarn.lock changed) node_modules is stale, and vite will happily
# bundle new source against old deps and report success — 2026-09-06 v1.11.1 went
# out that way (5.33 MB stale-dep bundle vs the correct 5.07 MB). --immutable also
# refuses if the lockfile would change, so lockfile/manifest drift fails loudly.
echo "📦 yarn install --immutable (node_modules must match yarn.lock)..."
if ! yarn install --immutable >/dev/null 2>&1; then
  echo "❌ yarn install --immutable failed — node_modules/lockfile drift. Run 'yarn install', commit yarn.lock if it changed, and retry." >&2
  exit 1
fi

# ── 2. Build ───────────────────────────────────────────────────────────────────
echo ""
echo "🚀 Building markedit-preview v${VERSION}..."

if $FULL_BUILD; then
  BUILT_JS="dist/markedit-preview.js"
else
  BUILT_JS="dist/lite/markedit-preview.js"
fi

# Captured before the build so the freshness check below can't pass on a stale
# leftover from a previous run — this is exactly the bug class that bit this
# repo twice: a lite ship silently deploying a stale full-build artifact, and
# Vite's emptyOutDir wiping one mode's output when the other mode built.
PRE_BUILD_EPOCH=$(date +%s)

# Size of what is CURRENTLY deployed, captured before the build for the same reason.
# The build itself deploys: markedit-vite's `markedit-copy-dist-file` plugin writes the
# artifact into the Shared scripts folder as part of `vite build`, so by the time the
# deploy section below runs, the old file is already gone. Reading it there compares the
# new artifact against itself and the variant guard can never fire.
PRE_BUILD_DEPLOYED_BYTES=0
if [ -f "$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts/markedit-preview.js" ]; then
  PRE_BUILD_DEPLOYED_BYTES=$(wc -c < "$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts/markedit-preview.js" | tr -d ' ')
fi

if $FULL_BUILD; then
  echo "  (full build with lint)"
  yarn build
else
  echo "  (lite build — skip lint)"
  yarn build:lite
fi

# ── 3. Verify the build actually produced fresh output ────────────────────────
if [ ! -f "$BUILT_JS" ]; then
  echo "❌ VERIFY FAILED: ${BUILT_JS} does not exist after build."
  exit 1
fi
BUILT_JS_EPOCH=$(date -r "$BUILT_JS" +%s)
if [ "$BUILT_JS_EPOCH" -lt "$PRE_BUILD_EPOCH" ]; then
  echo "❌ VERIFY FAILED: ${BUILT_JS} has a stale mtime — this build did not regenerate it. Refusing to deploy stale content."
  exit 1
fi

# Sibling-artifact sentinel: the OTHER build mode's output should still exist
# too (Vite's default emptyOutDir wipes it otherwise — see vite.config.mts's
# emptyOutDir:false comment). Soft warning, not fatal: a fresh clone that's
# never run the other mode legitimately won't have it yet.
if $FULL_BUILD; then
  SIBLING_JS="dist/lite/markedit-preview.js"
else
  SIBLING_JS="dist/markedit-preview.js"
fi
if [ ! -f "$SIBLING_JS" ]; then
  echo "⚠️  ${SIBLING_JS} is missing — if it existed before this build, Vite's emptyOutDir may have regressed (check vite.config.mts)."
fi

# ── 4. Deploy ──────────────────────────────────────────────────────────────────
SHARED="$HOME/Library/Group Containers/group.app.cyan.markedit/Shared/scripts"
PRIVATE="$HOME/Library/Containers/app.cyan.markedit/Data/Documents/scripts"
mkdir -p "$SHARED"

# Variant-change guard. The byte-match check below only proves the deployed file
# equals the build THIS run produced — it says nothing about whether that build is
# the same VARIANT as what was already installed. So a plain `bash ship.sh` (lite)
# run against a machine carrying the full build silently replaces ~5.0 MB with
# ~315 KB and strips KaTeX + Mermaid, reporting success the whole way. That
# happened on 2026-08-01 and was caught only by eyeballing the file size.
# Compares against PRE_BUILD_DEPLOYED_BYTES, captured before the build — the build
# deploys as a side effect, so reading the file here would compare it to itself.
# Loud warning, not a hard failure: switching variants on purpose is legitimate.
OLD_BYTES="$PRE_BUILD_DEPLOYED_BYTES"
NEW_BYTES=$(wc -c < "$BUILT_JS" | tr -d ' ')
# The two variants differ by ~16x; anything past 2x is a variant change, not drift.
if [ "$OLD_BYTES" -gt 0 ] && { [ $(( NEW_BYTES * 2 )) -lt "$OLD_BYTES" ] || [ $(( OLD_BYTES * 2 )) -lt "$NEW_BYTES" ]; }; then
  if $FULL_BUILD; then DIRECTION="lite → FULL (gaining KaTeX + Mermaid)"; else DIRECTION="FULL → lite (LOSING KaTeX + Mermaid)"; fi
  echo ""
  echo "⚠️  BUILD VARIANT CHANGE: deployed ${OLD_BYTES} bytes → shipping ${NEW_BYTES} bytes — ${DIRECTION}"
  echo "    If that wasn't intended, re-run with the other flag (--full for the full build)."
  echo ""
fi

cp "$BUILT_JS" "$SHARED/markedit-preview.js"
if [ -d "$PRIVATE" ]; then
  cp "$BUILT_JS" "$PRIVATE/markedit-preview.js"
fi

if ! cmp -s "$BUILT_JS" "$SHARED/markedit-preview.js"; then
  echo "❌ VERIFY FAILED: deployed Shared script does not byte-match ${BUILT_JS}."
  exit 1
fi
if [ -d "$PRIVATE" ] && ! cmp -s "$BUILT_JS" "$PRIVATE/markedit-preview.js"; then
  echo "❌ VERIFY FAILED: deployed Private script does not byte-match ${BUILT_JS}."
  exit 1
fi

echo "✅ Verified: deployed script matches ${BUILT_JS} (built fresh this run)"
echo "✅  Build complete — deployed to MarkEdit scripts folder"

# ── 5. Changelog ───────────────────────────────────────────────────────────────
# Must run before `git tag` below — the shared helper looks up the most
# recent existing tag to know what's new, and would just find this ship's
# own tag if called after it. Prefers a hand-written ## [X.Y.Z] entry if one
# already exists; otherwise auto-generates one from commit subjects since
# the last tag. Never blocks the ship either way.
if $DO_PUSH; then
  echo ""
  echo "📝 Changelog..."
  # External changelog helper from MARKEDIT_CHANGELOG_SCRIPT (checked before
  # the build). MARKEDIT_SKIP_CHANGELOG=1 skips it on purpose.
  if [ "${MARKEDIT_SKIP_CHANGELOG:-}" = "1" ]; then
    echo "  (MARKEDIT_SKIP_CHANGELOG=1; no changelog entry for this ship)"
  elif CHANGELOG_NOTES=$(python3 "$CHANGELOG_SCRIPT" --repo . --version "$VERSION"); then
    echo "$CHANGELOG_NOTES" | sed 's/^/  /'
  else
    echo "  ⚠️  changelog helper failed; shipping without a new CHANGELOG.md entry"
  fi
fi

# ── 6. Git commit + tag + push ─────────────────────────────────────────────────
if $DO_PUSH; then
  echo ""
  echo "📦 Committing and pushing v${VERSION}..."
  # Stage only the files a ship produces (version bump, changelog, rebuilt
  # bundles). Other edits were refused above; naming the paths keeps anything
  # else out of the public commit regardless.
  git add -- package.json CHANGELOG.md dist/markedit-preview.js dist/lite/markedit-preview.js
  git commit -m "ship markedit-preview v${VERSION}" 2>/dev/null || echo "  (nothing to commit)"
  git push 2>/dev/null || echo "  (no remote configured)"
  # Existing tags were checked before the build; only a new tag is created and
  # pushed, never moved or forced.
  if $CREATE_TAG; then
    git tag "v${VERSION}"
    git push origin "refs/tags/v${VERSION}" 2>/dev/null || echo "  (tag push failed or no remote)"
    echo "✅  Pushed v${VERSION}"
  else
    echo "✅  Pushed (untagged; v${VERSION} already exists)"
  fi
fi

# ── 7. Reload MarkEdit ──────────────────────────────────────────────────────────
if $DO_RELOAD; then
  echo ""
  echo "🔄 Reloading MarkEdit..."
  yarn reload 2>/dev/null || osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'
  echo "✅  MarkEdit reloaded"
fi

echo ""
echo "Done. markedit-preview v${VERSION} is live."
