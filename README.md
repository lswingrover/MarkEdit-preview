# MarkEdit-preview (lswingrover fork)

A downstream fork of [MarkEdit-app/MarkEdit-preview](https://github.com/MarkEdit-app/MarkEdit-preview) that adds features the upstream intentionally omits:

- **Lock-step scroll sync** — editor and preview track each other in real time, every animation frame, using RAF. No lag, no post-scroll drift. Upstream uses `scrollend` (fires after momentum stops); this fires on every `scroll` event.
- **WYSIWYG editing** — the preview pane becomes directly editable with a sticky formatting toolbar. Edits convert back to Markdown via Turndown (GFM-aware) and sync to the CodeMirror source. Active by default.
- **Print Rendered…** — prints the styled preview HTML (not raw Markdown) via the system print dialog. Available in the preview toolbar menu. Writes a temporary `~/.markedit-print.html` dotfile, opens it in the default browser, which shows the print dialog immediately on load and auto-closes the tab when done.
- **Quick Look opens rendered** — pressing Space on a `.md` file in Finder shows formatted markdown, not raw source. Upstream opens on source and remembers a toggle in `localStorage`; the Quick Look WebView has no persistent `localStorage`, so that toggle never sticks.

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

### Print Rendered'''...

**Toolbar menu:** Extensions → (preview toolbar) → Print Rendered'''...

Generates the same styled HTML as *Save Styled HTML* but instead of saving a file, it:

1. Injects `window.print()` on `load` and `window.close()` on `afterprint` into the document
2. Writes the result to `~/.markedit-print.html` (a hidden dotfile — never clutters your filesystem)
3. Opens it in your default browser via `runService('Open URL', ...)`

The browser shows the macOS print dialog immediately. When you dismiss it (print or cancel), the tab closes automatically.

**Fallback:** if writing the dotfile fails (permissions edge case), the standard Save panel appears instead so you can save and print manually.

---

### Quick Look opens rendered

Pressing Space on a `.md` file in Finder shows **formatted markdown**. The segmented control in the Quick Look toolbar still switches to source (`#`) and back (eye) for the life of that window.

Upstream defaults to source mode and persists your choice in `localStorage` — but the Quick Look extension's WebView has no persistent `localStorage` (its on-disk store stays empty), so every write is dropped and every read misses. Under upstream's default that means Quick Look shows raw markdown on every preview, forever, and the toggle never survives closing the window. Rendered markdown is the point of previewing a `.md` file, so it's the default here; only an explicit stored `'source'` opts out.

> [!IMPORTANT]
>
> **The Quick Look host evaluates the whole bundle**, including module-scope code for features Quick Look never displays — `src/sourceToolbar.ts` builds a `new Compartment()` and a `Prec.highest(keymap.of(...))` at module scope. That host provides no `require`, so `src/quicklook/shim.ts` supplies one.
>
> **Any value (non-type) import from a shimmed module needs an entry in that shim**, whether or not Quick Look exercises it. A missing stub is not a degraded feature — it's a `TypeError` during module evaluation that kills the *entire* bundle before `main.ts` reaches `setUpQuickLook()`, and Quick Look silently falls back to the extension's own plain-source view. The symptom reads as a preference rather than a crash, which is exactly how it went unnoticed once already.
>
> `tests/quicklook.shim.test.ts` enforces this by scanning the source tree, so a new import fails the test run instead of Quick Look.

**Testing it:** `qlmanage -t` and Finder's column-preview pane both use the *thumbnail* extension point, which this extension doesn't implement — they show plain text no matter what. Use the Space-bar panel or `qlmanage -p <file>.md`.

---

### WYSIWYG editing

The preview pane becomes `contentEditable`.

**Sync:** [Turndown](https://github.com/mixmark-io/turndown) (+ GFM plugin) converts HTML → Markdown on each edit. A 600ms edit-lock suppresses `renderHtmlPreview()` after each keystroke so the source update doesn't immediately re-render and destroy the cursor position.

**Default state:** WYSIWYG is enabled on every launch. Toggle via **Extensions → View Mode → WYSIWYG Editing** (checkmark indicates active).

### Unified formatting toolbar + shortcuts

One toolbar spans the full window width, fixed above whichever pane(s) are visible — both panes in side-by-side mode, or the single visible pane in edit-only/preview-only mode — rather than each pane carrying its own embedded toolbar. Buttons, order, labels, and shortcuts are all defined once in `src/shared/formatSpecs.ts`.

**Action routing:** each button click checks which pane currently has focus (`MarkEdit.editorView.hasFocus`) and dispatches to that pane's implementation — Markdown-text CodeMirror transactions (`src/sourceFormat.ts`, via `src/sourceToolbar.ts`) for the source pane, `execCommand`/DOM edits (`src/toolbar.ts`) for the preview pane. Keyboard shortcuts work the same way but can't be unified into one listener, since a keydown event is inherently scoped to whichever element has focus — a CodeMirror `keymap` extension (always active) covers the source pane, a `keydown` listener on the preview pane (active only while WYSIWYG is on) covers the other.

**Toolbar actions:** H1 / H2 / H3, Bold, Italic, Strikethrough, Inline code, Code block, Blockquote, Unordered list, Ordered list, Link, Image, Horizontal rule, Alert/callout, Footnote, Math (KaTeX), Diagram (Mermaid)

**Toggle-aware:** Bold/Italic/Strikethrough/Inline-code and Blockquote/lists remove their own markup if applied again, on both panes. Code block and Alert/callout are not toggles (always insert fresh) — reliable toggle-detection for a construct with its own marker/fence line isn't worth the complexity.

**Shortcuts** (work in whichever pane has focus, same combos on both):

| Action | Shortcut | Action | Shortcut |
|---|---|---|---|
| Heading 1/2/3 | ⌘1 / ⌘2 / ⌘3 | Insert link | ⌘K |
| Bold | ⌘B | Insert image | ⇧⌘K |
| Italic | ⌘I | Horizontal rule | ⇧⌘− |
| Strikethrough | ⇧⌘X | Alert / callout | ⌥⌘A |
| Inline code | ⌘E | Footnote | ⌥⌘F |
| Code block | ⌥⌘C | Blockquote | ⇧⌘. |
| Unordered list | ⇧⌘8 | Ordered list | ⇧⌘7 |

**Alert/callout** opens a popover (`src/shared/alertPicker.ts`, built on the reusable `src/shared/pickerPopover.ts`) showing all five [GitHub alert types](https://github.com/orgs/community/discussions/16925) — Note / Tip / Important / Warning / Caution — each as its actual rendered appearance (same `.markdown-alert-*` CSS classes and octicon SVGs `markdown-it-github-alerts` itself produces, not plain text labels), plus a Cancel button. Escape or clicking outside also cancels. Picking one inserts `> [!TYPE]`.

**Footnote** inserts `[^N]` at the cursor (N = next unused number) and appends `[^N]: ` at the end of the document. The cursor stays right after the inserted reference, not the definition — scroll down when you're ready to write it. (Parking the cursor in the definition seemed convenient at first, but meant a second footnote/anything, done without clicking back into the main text first, landed in the footnote zone instead — see the `computeFootnoteTransaction` doc comment.)

**Math (KaTeX)** and **Diagram (Mermaid)** open template menus (`src/shared/mathPicker.ts` / `src/shared/mermaidPicker.ts`, both built on the reusable `src/shared/menuPicker.ts` labelled-list popover). Math offers Inline / Display / Fraction / Square root / Summation / Integral / Matrix, inserting `$…$` or `$$…$$`; Mermaid offers Flowchart / Sequence / Class / State / ER / Gantt / Pie, inserting a ` ```mermaid ` fenced block. Both menus draw from one shared spec (`src/shared/insertSpecs.ts`) so the source and preview panes insert identical bodies. A live selection becomes the body; otherwise a starter template is inserted and left selected to type over. As menu buttons they carry no keyboard shortcut. On the preview side, math is emitted through a `raw-markdown` span (LaTeX verbatim) and Mermaid through a `<pre><code class="language-mermaid">` that Turndown round-trips to a fence — only the full build renders either.

Both preview-side alert/footnote actions insert their markdown-syntax markers (`[!TYPE]`, `[^N]`, `[^N]: `) wrapped in a `raw-markdown`-tagged span, with a matching Turndown rule (in `wysiwyg.ts`) that emits them verbatim. Turndown otherwise escapes markdown-special characters in ordinary text by default (so a user literally typing `[x]` doesn't accidentally produce a link) — which previously corrupted our deliberately-inserted syntax into `\[^N\]`, breaking both the footnote and the next-footnote-number detection downstream.

**Space reservation:** the toolbar is `position: fixed` and doesn't push anything down on its own. The source pane reserves space via an empty CodeMirror `showPanel` spacer sized to the toolbar's measured height; the preview pane gets a `padding-top`/`top` CSS override (two variants — one for side-by-side, one for the full-preview overlay) driven by a `--markedit-toolbar-height` CSS variable set from that same measurement. See `src/unifiedToolbar.ts`.

Toggling **Extensions → View Mode → WYSIWYG Editing** shows/hides the toolbar and enables/disables the preview pane's shortcut listener (since the preview pane isn't editable at all with WYSIWYG off). The source pane's keyboard shortcuts stay active regardless of the WYSIWYG toggle — editing raw Markdown doesn't depend on it.

---

## Installation

```bash
# 1. Clone the fork
git clone git@github.com:lswingrover/MarkEdit-preview.git
cd MarkEdit-preview

# 2. Install dependencies
yarn install

# 3. Build (full — includes KaTeX + Mermaid)
yarn build

# 4. Deploy to MarkEdit
cp dist/markedit-preview.js \
  ~/Library/Group\ Containers/group.app.cyan.markedit/Shared/scripts/markedit-preview.js

# 5. Restart MarkEdit
osascript -e 'quit app "MarkEdit"' -e 'delay 1' -e 'launch app "MarkEdit"'
```

> **Note:** there are two build variants and **the full build is the one that ships here.** `yarn build` produces `dist/markedit-preview.js` (~5.0 MB) with KaTeX and Mermaid; `yarn build:lite` produces `dist/lite/markedit-preview.js` (~315 KB) without them. Both include all core markdown features plus scroll sync, WYSIWYG, and Quick Look.
>
> An earlier version of this note claimed the lite build was *required* because of a broken `markedit-katex` install (`src/index.ts` missing). That's no longer true — `vite.config.mts` carries an alias resolving `markedit-katex` straight to its TypeScript source, and the full build completes cleanly. Prefer `yarn build` unless you specifically want the smaller artifact.
>
> ⚠️ **Don't cross the variants when deploying.** The two builds write to different paths, and copying the wrong one silently strips math and diagram rendering. `ship.sh` picks the right path for you and warns if a ship would change the deployed variant — see [Fork maintenance](#fork-maintenance).

The version is pinned ahead of upstream to prevent MarkEdit's built-in auto-updater from overwriting the fork with the upstream build.

> [!TIP]
>
> In MarkEdit 1.33.0 or later, this extension also provides preview support in [Quick Look](https://github.com/MarkEdit-app/MarkEdit/wiki/Manual#quick-look-extension) — the deploy step above is what installs it, since Quick Look loads the script straight out of the Group Container. In this fork it opens [rendered rather than on source](#quick-look-opens-rendered).
>
> To add menu items to the toolbar, see MarkEdit [Customization](https://github.com/MarkEdit-app/MarkEdit/wiki/Customization#editorcustomtoolbaritems) wiki.

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
    └── markedit-preview.js            ← this fork, loaded from scripts folder
        ├── main.ts                    ← entry: onEditorReady, menu items, update check
        ├── src/view.ts                ← layout: previewPane div, view modes, render
        ├── src/scroll.ts              ← BlockEntry index, RAF sync, startObserving()
        ├── src/wysiwyg.ts             ← contentEditable, Turndown sync, edit lock
        ├── src/unifiedToolbar.ts      ← the one toolbar's DOM + focus-based action routing
        ├── src/toolbar.ts             ← preview-pane actions (execCommand/DOM) + shortcut listener
        ├── src/sourceToolbar.ts       ← source-pane actions (CodeMirror transactions) + keymap + spacer panel
        ├── src/sourceFormat.ts        ← pure Markdown-text transaction logic (unit tested)
        ├── src/toolbarUI.ts           ← shared button-DOM builder
        ├── src/shared/formatSpecs.ts  ← single source of truth: buttons, labels, shortcuts
        ├── src/shared/alertPicker.ts  ← shared alert-type picker (Note/Tip/Important/Warning/Caution)
        ├── src/shared/insertSpecs.ts  ← math/mermaid templates (shared by both panes)
        ├── src/shared/menuPicker.ts   ← reusable labelled-list popover menu
        ├── src/shared/mathPicker.ts   ← math (KaTeX) template menu
        ├── src/shared/mermaidPicker.ts ← mermaid diagram template menu
        └── src/shared/pickerPopover.ts ← reusable anchored popover: Escape/outside-click/Cancel all resolve undefined
```

`startObserving(editorPane, previewPane)` is called in `onEditorReady`. It adds a `scroll` listener (passive) to `MarkEdit.editorView.scrollDOM`. On each scroll event, a RAF callback calls `syncScrollProgress()` which maps the editor's CodeMirror line position to a preview scroll position using the pre-built `BlockEntry` index.

---

## Fork maintenance

**Modified files vs upstream:**

| File | Change |
|------|--------|
| `main.ts` | Auto-enable WYSIWYG; `checkForkUpstream()` update alert; Print Rendered menu item |
| `src/view.ts` | `printRendered()` — writes styled HTML dotfile + opens browser to print |
| `src/shared/strings.ts` | `printRendered` locale strings (EN / zh-Hans / zh-Hant) |
| `src/scroll.ts` | RAF-based `startObserving()`; `BlockEntry` cache with `warmBlockCache()` / `invalidateBlockCache()` |
| `src/wysiwyg.ts` | WYSIWYG mode; wires the unified toolbar's show/hide + preview shortcut listener into the enable/disable lifecycle |
| `src/unifiedToolbar.ts` | The one toolbar's DOM + focus-based routing between source/preview actions (new file) |
| `src/toolbar.ts` | Preview-pane actions (execCommand/DOM), no toolbar DOM of its own (new file); preview-pane keyboard shortcut listener |
| `src/sourceToolbar.ts` | Source-pane actions (CodeMirror transactions), no toolbar DOM of its own; always-on `keymap`; empty `showPanel` spacer sized to the unified toolbar's height (new file). **Its module-scope `Compartment`/`Prec` usage is why `src/quicklook/shim.ts` must stay complete** |
| `src/quicklook/shim.ts` | Stubs every runtime import from the shimmed modules — `Compartment`, `Prec`, `keymap`, `showPanel`, `EditorSelection` — not just the ones Quick Look uses. Guarded by `tests/quicklook.shim.test.ts` |
| `src/quicklook/mode.ts` | Quick Look defaults to `'preview'` instead of upstream's `'source'`; only an explicit stored `'source'` opts out |
| `src/sourceFormat.ts` | Pure Markdown-text transaction functions for the source pane (new file, unit tested in `tests/sourceFormat.test.ts`) |
| `src/toolbarUI.ts` | Shared toolbar button DOM builder (new file) |
| `src/shared/formatSpecs.ts` | Shared button/shortcut spec — single source of truth for the toolbar (new file) |
| `src/shared/alertPicker.ts` | Shared alert-type picker — renders each type's real appearance via the reused `.markdown-alert-*` classes (new file) |
| `src/shared/pickerPopover.ts` | Reusable anchored popover: Escape/outside-click/explicit Cancel all resolve `undefined` (new file) |
| `src/view.ts` (again) | `appendStyle(alertsCss())` — theme-independent alert styling was never applied to the live document at all before this (only to the standalone HTML export path); needed so alerts render correctly under non-`github` preview themes, and so the alert picker's popover preview (outside `.markdown-body`) has any alert styling to pick up |
| `package.json` | Version bumped to `1.9.0` |
| `vite.config.mts` | `markedit-katex` alias for Yarn 1 + Vite 7 compat; `emptyOutDir: false` — full/lite builds share `dist/`, and Vite's default cleanup would otherwise wipe one build's tracked output whenever the other mode runs |

**Upstream remote** is wired as `upstream`. Pull updates with:

```bash
git fetch upstream
git merge upstream/main
```

The scroll, WYSIWYG, and toolbar changes are isolated to the files above (all new files, or narrowly-scoped edits to `main.ts`/`wysiwyg.ts`) and are unlikely to conflict with most upstream changes.

**History note — the abandoned `markedit-wysiwyg` standalone repo:** on 2026-06-02, the scroll engine and WYSIWYG editing already living in this fork (`src/scroll.ts`, `src/wysiwyg.ts`, both dating to 2026-05-31) were ported into a separate repo, [lswingrover/markedit-wysiwyg](https://github.com/lswingrover/markedit-wysiwyg), as an experiment to see whether the same features could work as an externally-injected companion script instead of requiring a fork. That experiment was abandoned the same day and the repo archived — this fork's native implementation continued as the only maintained one (fixes as late as 2026-07-06). **Do not deploy `markedit-wysiwyg.js` alongside this extension** — it duplicates the same toolbar/contentEditable/scroll-sync behavior and the two will fight over the same preview pane. If WYSIWYG or scroll-sync behavior needs changing, edit `src/wysiwyg.ts` / `src/scroll.ts` here, not the archived companion repo.

---

## Requirements

- [MarkEdit](https://github.com/MarkEdit-app/MarkEdit) 1.24.0+
- Node.js, Yarn 1.x
- macOS (tested on Sonoma / Sequoia)

---

## Credits

Built on top of [MarkEdit-app/MarkEdit-preview](https://github.com/MarkEdit-app/MarkEdit-preview) by [@cyanzhong](https://github.com/cyanzhong). All core markdown rendering, QuickLook, task lists, themes, and search are upstream's work.

Turndown + turndown-plugin-gfm handle HTML → Markdown conversion in WYSIWYG mode.
