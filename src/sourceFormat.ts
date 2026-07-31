/**
 * Markdown-text formatting for the raw source (CodeMirror) pane — the
 * source-side counterpart to the preview pane's execCommand-based toolbar.js
 *
 * Every function here is a pure `EditorState -> TransactionSpec` computation
 * (no DOM, no EditorView) so it can be unit tested by applying the returned
 * spec to a state and inspecting the resulting doc/selection directly.
 */

import type { EditorState, TransactionSpec } from '@codemirror/state';
import { EditorSelection } from '@codemirror/state';

/** Wrap or unwrap every selection range with `before`/`after` markers (bold, italic, inline code, ...). */
export function computeWrapTransaction(state: EditorState, before: string, after: string = before): TransactionSpec {
  return state.changeByRange(range => {
    const { from, to } = range;
    const doc = state.doc;
    const beforeText = doc.sliceString(Math.max(0, from - before.length), from);
    const afterText = doc.sliceString(to, Math.min(doc.length, to + after.length));

    if (beforeText === before && afterText === after) {
      return {
        changes: [
          { from: from - before.length, to: from, insert: '' },
          { from: to, to: to + after.length, insert: '' },
        ],
        range: EditorSelection.range(from - before.length, to - before.length),
      };
    }

    return {
      changes: [
        { from, to: from, insert: before },
        { from: to, to, insert: after },
      ],
      range: from === to
        ? EditorSelection.cursor(from + before.length)
        : EditorSelection.range(from + before.length, to + before.length),
    };
  });
}

/** Set (or, if already at that level, clear) a heading marker on the line under each range's head. */
export function computeHeadingTransaction(state: EditorState, level: number): TransactionSpec {
  const marker = '#'.repeat(level) + ' ';
  return state.changeByRange(range => {
    const line = state.doc.lineAt(range.head);
    const alreadyThisLevel = line.text.startsWith(marker);
    const stripped = line.text.replace(/^#{1,6}\s+/, '');
    const newText = alreadyThisLevel ? stripped : marker + stripped;

    return {
      changes: { from: line.from, to: line.to, insert: newText },
      range: EditorSelection.cursor(line.from + newText.length),
    };
  });
}

/** Insert a fenced code block around the selection (or a placeholder). Not a toggle — matches the preview button. */
export function computeCodeBlockTransaction(state: EditorState): TransactionSpec {
  return state.changeByRange(range => {
    const { from, to } = range;
    const selected = state.doc.sliceString(from, to) || 'code block';
    const before = '```\n';
    const after = '\n```';

    return {
      changes: { from, to, insert: before + selected + after },
      range: EditorSelection.range(from + before.length, from + before.length + selected.length),
    };
  });
}

/**
 * Wrap the selected lines as a GitHub-style alert/callout (`> [!NOTE]` + quoted
 * body). Not a toggle — matches the code block button's "always insert" behavior,
 * since the marker line makes reliable toggle-detection more trouble than it's worth.
 */
export function computeAlertTransaction(state: EditorState, alertType = 'NOTE'): TransactionSpec {
  return state.changeByRange(range => {
    const doc = state.doc;
    const startLine = doc.lineAt(range.from);
    const endLine = doc.lineAt(range.to);
    const lines = [];
    for (let n = startLine.number; n <= endLine.number; n++) {
      lines.push(doc.line(n));
    }

    const contentLines = lines.filter(l => l.text.trim() !== '');
    const body = contentLines.length > 0
      ? contentLines.map(l => `> ${l.text}`).join('\n')
      : '> ';
    const insert = `> [!${alertType}]\n${body}`;

    return {
      changes: { from: startLine.from, to: endLine.to, insert },
      range: EditorSelection.cursor(startLine.from + insert.length),
    };
  });
}

/** Find the next unused footnote number (`[^N]`) in the document, starting from 1. */
export function nextFootnoteNumber(docText: string): number {
  const used = new Set<number>();
  for (const match of docText.matchAll(/\[\^(\d+)\]/g)) {
    used.add(Number(match[1]));
  }
  let n = 1;
  while (used.has(n)) {n++;}
  return n;
}

/**
 * Insert a footnote reference (`[^N]`) at the cursor and append its (empty)
 * definition (`[^N]: `) to the end of the document. The cursor stays right
 * after the inserted reference (not jumping to the definition) — parking it
 * in the definition meant a second insertion of anything, done without first
 * clicking back into the main text, landed in the footnote zone instead of
 * where the user actually continues editing. Only single-selection use is
 * exercised — multiple simultaneous cursors would all append at the same
 * original document end and aren't handled correctly (an accepted edge case).
 */
export function computeFootnoteTransaction(state: EditorState): TransactionSpec {
  let nextN = nextFootnoteNumber(state.doc.toString());
  const docEnd = state.doc.length;
  const trailingChar = docEnd > 0 ? state.doc.sliceString(docEnd - 1, docEnd) : '';
  const needsLeadingNewline = trailingChar !== '' && trailingChar !== '\n';

  return state.changeByRange(range => {
    const n = nextN++;
    const ref = `[^${n}]`;
    const definition = `${needsLeadingNewline ? '\n\n' : ''}[^${n}]: `;

    return {
      changes: [
        { from: range.from, to: range.to, insert: ref },
        { from: docEnd, to: docEnd, insert: definition },
      ],
      range: EditorSelection.cursor(range.from + ref.length),
    };
  });
}

/** Insert a Markdown horizontal rule, adding blank lines around it if needed so it actually renders as one. */
export function computeHorizontalRuleTransaction(state: EditorState): TransactionSpec {
  return state.changeByRange(range => {
    const { from, to } = range;
    const line = state.doc.lineAt(from);
    const needsLeadingNewline = line.text.trim() !== '';
    const insert = (needsLeadingNewline ? '\n\n' : '') + '---\n\n';

    return {
      changes: { from, to, insert },
      range: EditorSelection.cursor(from + insert.length),
    };
  });
}

export function computeBlockquoteTransaction(state: EditorState): TransactionSpec {
  return toggleLinePrefix(state, () => '> ', /^>\s?/);
}

export function computeUnorderedListTransaction(state: EditorState): TransactionSpec {
  return toggleLinePrefix(state, () => '- ', /^[-*+]\s+/);
}

export function computeOrderedListTransaction(state: EditorState): TransactionSpec {
  return toggleLinePrefix(state, index => `${index + 1}. `, /^\d+[.)]\s+/);
}

/**
 * Toggle a per-line prefix (blockquote, list markers) across every non-blank
 * line spanned by a selection range. If every content line already carries
 * the prefix, it's stripped from all of them; otherwise it's added to all.
 */
function toggleLinePrefix(
  state: EditorState,
  addPrefix: (indexAmongContentLines: number) => string,
  hasPrefixRe: RegExp,
): TransactionSpec {
  return state.changeByRange(range => {
    const doc = state.doc;
    const startLine = doc.lineAt(range.from);
    const endLine = doc.lineAt(range.to);
    const lines = [];
    for (let n = startLine.number; n <= endLine.number; n++) {
      lines.push(doc.line(n));
    }

    const contentLines = lines.filter(l => l.text.trim() !== '');
    const allPrefixed = contentLines.length > 0 && contentLines.every(l => hasPrefixRe.test(l.text));

    const changes = contentLines.map((l, index) => {
      const stripped = l.text.replace(hasPrefixRe, '');
      const insert = allPrefixed ? stripped : addPrefix(index) + stripped;
      return { from: l.from, to: l.to, insert };
    });

    const delta = changes.reduce((sum, c) => sum + (c.insert.length - (c.to - c.from)), 0);
    return {
      changes,
      range: EditorSelection.range(startLine.from, endLine.to + delta),
    };
  });
}
