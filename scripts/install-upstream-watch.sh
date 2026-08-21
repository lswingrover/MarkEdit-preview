#!/usr/bin/env bash
# install-upstream-watch.sh — install (or refresh) the launchd job that runs
# upstream-watch.sh once a day at a quiet hour.
#
# Generates the plist from $HOME at install time (no hardcoded username in the
# repo — the generated plist lives outside it, in ~/Library/LaunchAgents), then
# (re)loads it. Idempotent: safe to re-run after editing the watcher.
#
#   bash scripts/install-upstream-watch.sh          # install / refresh
#   bash scripts/install-upstream-watch.sh --off     # unload + remove the job

set -euo pipefail

LABEL="com.markedit-preview.upstream-watch"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLIST="$HOME/Library/LaunchAgents/${LABEL}.plist"
STATE_DIR="$HOME/.markedit-upstream-sync"
GUI_DOMAIN="gui/$(id -u)"

if [ "${1:-}" = "--off" ]; then
  launchctl bootout "$GUI_DOMAIN/$LABEL" 2>/dev/null || true
  rm -f "$PLIST"
  echo "✅ Uninstalled ${LABEL}."
  exit 0
fi

mkdir -p "$STATE_DIR" "$(dirname "$PLIST")"

cat > "$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>            <string>${LABEL}</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/bash</string>
    <string>${REPO}/scripts/upstream-watch.sh</string>
  </array>
  <!-- Once a day at 03:30. If the Mac is asleep then, launchd runs it on wake.
       The build (clean-merge path only) transiently rewrites the live MarkEdit
       script and restores it; a quiet hour keeps that window off your editing. -->
  <key>StartCalendarInterval</key>
  <dict>
    <key>Hour</key>    <integer>3</integer>
    <key>Minute</key>  <integer>30</integer>
  </dict>
  <key>StandardOutPath</key>  <string>${STATE_DIR}/launchd.out.log</string>
  <key>StandardErrorPath</key><string>${STATE_DIR}/launchd.err.log</string>
  <key>ProcessType</key>      <string>Background</string>
</dict>
</plist>
EOF

# Reload cleanly (bootout the old instance first; ignore "not loaded").
launchctl bootout "$GUI_DOMAIN/$LABEL" 2>/dev/null || true
launchctl bootstrap "$GUI_DOMAIN" "$PLIST"
launchctl enable "$GUI_DOMAIN/$LABEL" 2>/dev/null || true

echo "✅ Installed ${LABEL} — runs daily at 03:30."
echo "   Plist:  ${PLIST}"
echo "   State:  ${STATE_DIR}/  (status.md, watch.log, build.log)"
echo "   Test now:  bash ${REPO}/scripts/upstream-watch.sh"
