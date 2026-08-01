/**
 * Stub `require` for hosts that don't provide one (Quick Look, `@light`).
 * Compiled to an IIFE and injected as the Rollup banner so it runs before the
 * bundle's top-level `require(...)` calls.
 *
 * ── Why this must cover EVERY runtime import, not just the ones Quick Look uses ──
 *
 * The Quick Look host evaluates the whole bundle. Module-level code runs even
 * for features Quick Look never shows — `src/sourceToolbar.ts` builds a
 * `new Compartment()` and a `Prec.highest(keymap.of(...))` at module scope for
 * the source pane's toolbar. A missing stub there is not a degraded feature,
 * it's a `TypeError` during module evaluation that kills the ENTIRE bundle
 * before `main.ts` ever calls `setUpQuickLook()`. The visible symptom is
 * silent and easy to misread: Quick Look falls back to the extension's own
 * plain source view, so `.md` files preview as raw markdown forever with no
 * error shown anywhere. That regression shipped with the unified-toolbar work
 * and went unnoticed precisely because it looks like "a setting", not a crash.
 *
 * So: any value (non-type) import from a stubbed module anywhere in the source
 * tree needs an entry here, whether or not Quick Look exercises it. The stubs
 * only have to *evaluate*; they never have to work.
 * `tests/quicklook.shim.test.ts` enforces this by scanning the source tree.
 */

import type { MarkEdit as RealMarkEdit } from 'markedit-api';

type Globals = {
  MarkEdit?: RealMarkEdit;
  require?: (id: string) => unknown;
};

const host = globalThis as unknown as Globals;
if (typeof host.require === 'undefined') {
  // An extension value that any CodeMirror `.of()`/`.reconfigure()` can return.
  const noopExtension = () => ({});

  const markeditApi = {
    MarkEdit: host.MarkEdit ?? (Object.freeze({}) as RealMarkEdit),
  };

  const codemirrorView = {
    EditorView: {
      updateListener: { of: noopExtension },
    },
    // sourceToolbar.ts — evaluated at module scope via Prec.highest(keymap.of(...))
    keymap: { of: noopExtension },
    // sourceToolbar.ts — spacer panel, only called from the full host
    showPanel: { of: noopExtension },
  };

  const codemirrorState = {
    Annotation: {
      define: () => ({ of: noopExtension }),
    },
    // sourceToolbar.ts:31 — `new Compartment()` at module scope. Without this the
    // whole bundle throws in Quick Look. Must be constructible.
    Compartment: class {
      of = noopExtension;
      reconfigure = noopExtension;
      get = () => undefined;
    },
    // sourceToolbar.ts — Prec.highest(...) at module scope; pass the value through.
    Prec: {
      highest: <T>(x: T) => x,
      high: <T>(x: T) => x,
      default: <T>(x: T) => x,
      low: <T>(x: T) => x,
      lowest: <T>(x: T) => x,
    },
    // sourceFormat.ts — only called from the full host, but must exist to evaluate.
    EditorSelection: {
      cursor: (pos: number) => ({ from: pos, to: pos }),
      range: (from: number, to: number) => ({ from, to }),
      single: (from: number, to: number) => ({ from, to }),
      create: () => ({}),
    },
  };

  const stubs: Record<string, unknown> = {
    'markedit-api': markeditApi,
    '@codemirror/view': codemirrorView,
    '@codemirror/state': codemirrorState,
  };

  host.require = (id: string) => stubs[id] ?? {};
}
