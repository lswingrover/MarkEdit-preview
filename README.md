# MarkEdit-preview (lswingrover fork)

A downstream fork of [MarkEdit-app/MarkEdit-preview](https://github.com/MarkEdit-app/MarkEdit-preview) that adds two features the upstream intentionally omits:

- **Lock-step scroll sync** — editor and preview track each other in real time, every animation frame, using RAF. No lag, no post-scroll drift. Upstream uses `scrollend` (fires after momentum stops); this fires on every `scroll` event.
- **WYSIWYG editing** — the preview pane becomes directly editable with a sticky formatting toolbar. Edits convert back to Markdown via Turndown (GFM-aware) and sync to the CodeMirror source. Active by default.

These are deliberate upstream non-features, not oversights. This fork exists for users who want them anyway.

---

## What this adds

### Lock-step scroll sync

| | Upstream | This fork |
|---|---|---|
| Trigger | `scrollend` (after momentum stops) | `scroll` + `requestAnimationFrame` (every frame) |
| Direction | Editor → Preview only | Editor → Preview only |
| Performance | O(n) querySelectorAll per event | Pre-computed `BlockEntry` index; zero DOM reads during scroll |
| Gap handling | None | Interpolates across blank lines and non-block content |

**Block cache:** `[data-line-from]` elements are indexed once after each render — line ranges, top offsets, and heights pre-computed. The cache is invalidated and rebuilt via `MutationObserver` after every `renderHtmlPreview()` call.

### WYSIWYG editing

The preview pane becomes `contentEditable`. A sticky formatting toolbar floats at the top of the pane.

**Toolbar actions:** H1 / H2 / H3, Bold, Italic, Strikethrough, Inline code, Code block, Blockquote, Unordered list, Ordered list, Link, Horizontal rule

**Sync:** [Turndown](https://github.com/mixmark-io/turndown) (+ GFM plugin) converts HTML → Markdown on each edit. A 600ms edit-lock suppresses `renderHtmlPreview()` after each keystroke so the source update doesn't immediately re-render and destroy the cursor position.

**Default state:** WYSIWYG is enabled on every launch. Toggle via **Extensions → View Mode → WYSIWYG Editing** (checkmark indicates active).

---

## Installation

```bash
# 1. Clone the fork
git clone git@github.com:lswingrover/MarkEdit-preview.git
cd MarkEdit-preview

# 2. Install dependencies
yarn install

# 3. Build
LITE_BUILD=true yarn vite build

# 4. Deploy to MarkEdit
cp dist/lite/markedit-preview.js \
  ~/Library/Group\ Containers/group.app.cyan.markedit/Shared/scripts/markedit-preview.js

# 5. Restart MarkEdit
osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'
```

> **Note:** `LITE_BUILD=true` skips KaTeX and Mermaid due to a broken `markedit-katex` package install (`src/index.ts` missing). The lite build includes all core markdown features plus scroll sync and WYSIWYG. If you need math rendering, fix the `markedit-katex` dependency and run `yarn vite build` without the env var.

The version is pinned at `1.8.1` (upstream is `1.8.0`) to prevent MarkEdit's built-in auto-updater from overwriting the fork with the upstream build.

---

## Updating when upstream ships

The extension checks for upstream releases on every MarkEdit launch. When a new version is detected, a native alert appears once with update instructions.

To update manually:

```bash
cd ~/Developer/MarkEdit-preview
bash update.sh
```

`update.sh` does the full cycle: `git fetch upstream` → merge → `LITE_BUILD=true yarn vite build` → copy to scripts folder → restart MarkEdit.

If the merge has conflicts (most likely in `src/scroll.ts` or `main.ts`), resolve them, then continue with `git merge --continue` before running the build step.

---

## Architecture

```
MarkEdit.app (native Swift/AppKit)
└── WKWebView
    └── markedit-preview.js  ← this fork, loaded from scripts folder
        ├── main.ts           ← entry: onEditorReady, menu items, update check
        ├── src/view.ts       ← layout: previewPane div, view modes, render
        ├── src/scroll.ts     ← BlockEntry index, RAF sync, startObserving()
        ├── src/wysiwyg.ts    ← contentEditable, Turndown sync, edit lock
        └── src/toolbar.ts    ← toolbar DOM + formatting commands
```

`startObserving(editorPane, previewPane)` is called in `onEditorReady`. It adds a `scroll` listener (passive) to `MarkEdit.editorView.scrollDOM`. On each scroll event, a RAF callback calls `syncScrollProgress()` which maps the editor's CodeMirror line position to a preview scroll position using the pre-built `BlockEntry` index.

---

## Fork maintenance

**Modified files vs upstream:**

| File | Change |
|------|--------|
| `main.ts` | Auto-enable WYSIWYG; `checkForkUpstream()` update alert |
| `src/scroll.ts` | RAF-based `startObserving()`; `BlockEntry` cache with `warmBlockCache()` / `invalidateBlockCache()` |
| `src/wysiwyg.ts` | WYSIWYG mode; sticky toolbar fix (`top: 0px`) |
| `src/toolbar.ts` | Toolbar DOM + CSS (new file); `top: 0` sticky CSS |
| `package.json` | Version bumped to `1.8.1` |
| `vite.config.mts` | `markedit-katex` alias for Yarn 1 + Vite 7 compat |

**Upstream remote** is wired as `upstream`. Pull updates with:

```bash
git fetch upstream
git merge upstream/main
```

The scroll and WYSIWYG changes are isolated to the four files above and are unlikely to conflict with most upstream changes.

---

## Requirements

- [MarkEdit](https://github.com/MarkEdit-app/MarkEdit) 1.24.0+
- Node.js, Yarn 1.x
- macOS (tested on Sonoma / Sequoia)

---

## Credits

Built on top of [MarkEdit-app/MarkEdit-preview](https://github.com/MarkEdit-app/MarkEdit-preview) by [@cyanzhong](https://github.com/cyanzhong). All core markdown rendering, QuickLook, task lists, themes, and search are upstream's work.

Turndown + turndown-plugin-gfm handle HTML → Markdown conversion in WYSIWYG mode.
