# MarkEdit-preview (lswingrover fork)

A fork of [MarkEdit-app/MarkEdit-preview](https://github.com/MarkEdit-app/MarkEdit-preview) that adds two features the upstream maintainer chose not to include: **WYSIWYG editing** and **bidirectional scroll sync**.

These aren't oversights. The upstream maintainer doesn't use WYSIWYG and doesn't want to maintain code he'll never need. Bidirectional scroll is intentionally absent — it's theoretically imperfect, and he edits more than he reads. Both are the right calls for the upstream project. This fork exists for users who want the features anyway.

Everything else — rendering, themes, math, mermaid, settings — is identical to upstream.

---

## What this fork adds

### WYSIWYG editing

Adds a toggleable WYSIWYG mode that makes the preview pane directly editable, with a sticky formatting toolbar at the top.

**Toolbar actions:** H1 / H2 / H3, Bold, Italic, Strikethrough, Inline code, Code block, Blockquote, Unordered list, Ordered list, Link, Horizontal rule

**Toggle:** Extensions → Markdown Preview → WYSIWYG Editing

**How it works:**

1. The preview pane becomes `contentEditable`
2. On every edit, [Turndown](https://github.com/mixmark-io/turndown) (+ GFM plugin) converts the HTML back to Markdown and pushes it to the CodeMirror source via `MarkEdit.editorAPI.setText()`
3. A 600ms render lock suppresses the standard re-render cycle while typing, preventing cursor position from being destroyed by `innerHTML` replacement

The source editor stays canonical. WYSIWYG is a convenient input layer, not a replacement.

**Design decisions:**

- **`execCommand` for formatting** — Deprecated in spec but fully functional in WebKit, which is what MarkEdit uses. Avoids complex Range manipulation for common operations.
- **Turndown for HTML→MD** — Battle-tested and GFM-aware. Round-trip isn't perfect for complex tables and footnotes, but handles common formatting cleanly.
- **Render lock over DOM diffing** — The 600ms lock is simpler than morphdom or similar and sufficient, since `renderHtmlPreview` already has a 500ms debounce. Lock (600ms) > debounce (500ms), so renders are always suppressed during active typing.
- **No core changes** — Everything lives in the extension layer using `markedit-api` as designed.

**Known limitations:**
- Complex tables and footnotes may not round-trip cleanly through Turndown
- Undo history accumulates one entry per keystroke in WYSIWYG mode

---

### Bidirectional scroll sync + hot path optimizations

Upstream syncs editor→preview only. This fork adds the reverse direction, plus several scroll performance improvements.

**Bidirectional sync** — A `requestAnimationFrame`-based listener on the preview pane syncs back to the editor when you scroll the preview side. Uses a `ScrollSource` lock with a 150ms reset to prevent feedback loops between the two listeners.

A note on approach: `scrollend` only fires after momentum fully stops, so during a fast trackpad swipe the preview sits frozen until you lift off. This fork uses `scroll` + RAF for real-time frame-by-frame tracking instead. The final position is the same; the feel is significantly more responsive.

**`{ passive: true }` on all listeners** — Without this flag, the browser must wait for JS to return before committing each scroll frame. One flag, measurable difference.

**Pre-parsed `BlockEntry` index** — `querySelectorAll('[data-line-from]')` and `parseInt(dataset.lineFrom)` previously ran on every scroll frame. This fork builds a typed `BlockEntry[]` index once after each render, caches it, and invalidates it when `innerHTML` is replaced. Eliminates repeated DOM traversal and string parsing from the hot path.

**Binary search for block lookup** — `proposeTargetBlock` previously used a linear `Array.find`. Since blocks are ordered by `data-line-from`, a binary search is O(log n) with no behavioral change.

**CodeMirror internal metrics in `getScrollProgress`** — The previous implementation called `editor.domAtPos()` → `getClosestLine()` → two `getBoundingClientRect()` calls per frame. `editor.lineBlockAtHeight()` already returns `block.top` and `block.height` — using those directly gives the same fractional progress with zero DOM reads or forced reflows.

---

## Installation

Copy [`dist/markedit-preview.js`](dist/markedit-preview.js?raw=true) to `~/Library/Containers/app.cyan.markedit/Data/Documents/scripts/`. Restart MarkEdit.

## Everything else

Settings, themes, building, styling, math, mermaid — see the [upstream README](https://github.com/MarkEdit-app/MarkEdit-preview#readme).
