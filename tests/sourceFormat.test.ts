import { describe, it, expect } from 'vitest';
import { EditorState, EditorSelection } from '@codemirror/state';
import {
  computeWrapTransaction,
  computeHeadingTransaction,
  computeCodeBlockTransaction,
  computeHorizontalRuleTransaction,
  computeBlockquoteTransaction,
  computeUnorderedListTransaction,
  computeOrderedListTransaction,
  computeAlertTransaction,
  nextFootnoteNumber,
  computeFootnoteTransaction,
  computeMathTransaction,
  computeMermaidTransaction,
} from '../src/sourceFormat';

function stateFor(doc: string, from: number, to = from): EditorState {
  return EditorState.create({ doc, selection: EditorSelection.single(from, to) });
}

describe('computeWrapTransaction', () => {
  it('wraps a selection', () => {
    const state = stateFor('hello world', 0, 5);
    const next = state.update(computeWrapTransaction(state, '**')).state;
    expect(next.doc.toString()).toBe('**hello** world');
    expect(next.selection.main.from).toBe(2);
    expect(next.selection.main.to).toBe(7);
  });

  it('unwraps an already-wrapped selection (toggle)', () => {
    const state = stateFor('**hello** world', 2, 7);
    const next = state.update(computeWrapTransaction(state, '**')).state;
    expect(next.doc.toString()).toBe('hello world');
  });

  it('wraps a collapsed cursor and places it between the markers', () => {
    const state = stateFor('hello world', 5); // cursor right before the space
    const next = state.update(computeWrapTransaction(state, '*')).state;
    expect(next.doc.toString()).toBe('hello** world');
    expect(next.selection.main.from).toBe(6);
    expect(next.selection.main.to).toBe(6);
  });

  it('supports asymmetric markers (link brackets)', () => {
    const state = stateFor('click here', 0, 10);
    const next = state.update(computeWrapTransaction(state, '[', '](https://example.com)')).state;
    expect(next.doc.toString()).toBe('[click here](https://example.com)');
  });
});

describe('computeHeadingTransaction', () => {
  it('adds a heading marker', () => {
    const state = stateFor('Title', 2);
    const next = state.update(computeHeadingTransaction(state, 1)).state;
    expect(next.doc.toString()).toBe('# Title');
  });

  it('replaces an existing heading level with a different one', () => {
    const state = stateFor('## Title', 2);
    const next = state.update(computeHeadingTransaction(state, 3)).state;
    expect(next.doc.toString()).toBe('### Title');
  });

  it('toggles off when re-applying the same level', () => {
    const state = stateFor('### Title', 2);
    const next = state.update(computeHeadingTransaction(state, 3)).state;
    expect(next.doc.toString()).toBe('Title');
  });

  it('operates on the line under the selection head within a multi-line doc', () => {
    const doc = 'line one\nline two\nline three';
    const from = doc.indexOf('two');
    const state = stateFor(doc, from);
    const next = state.update(computeHeadingTransaction(state, 2)).state;
    expect(next.doc.toString()).toBe('line one\n## line two\nline three');
  });
});

describe('computeCodeBlockTransaction', () => {
  it('wraps the selection in a fenced code block', () => {
    const state = stateFor('const x = 1;', 0, 12);
    const next = state.update(computeCodeBlockTransaction(state)).state;
    expect(next.doc.toString()).toBe('```\nconst x = 1;\n```');
  });

  it('inserts a placeholder when there is no selection', () => {
    const state = stateFor('', 0);
    const next = state.update(computeCodeBlockTransaction(state)).state;
    expect(next.doc.toString()).toBe('```\ncode block\n```');
  });
});

describe('computeHorizontalRuleTransaction', () => {
  it('inserts blank lines around the rule when the cursor is on a non-blank line', () => {
    const state = stateFor('some text', 9);
    const next = state.update(computeHorizontalRuleTransaction(state)).state;
    expect(next.doc.toString()).toBe('some text\n\n---\n\n');
  });

  it('does not add a leading blank line when already on a blank line', () => {
    const state = stateFor('', 0);
    const next = state.update(computeHorizontalRuleTransaction(state)).state;
    expect(next.doc.toString()).toBe('---\n\n');
  });
});

describe('computeBlockquoteTransaction', () => {
  it('adds a blockquote marker to a single line', () => {
    const state = stateFor('a quote', 3);
    const next = state.update(computeBlockquoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('> a quote');
  });

  it('removes the marker when already blockquoted (toggle)', () => {
    const state = stateFor('> a quote', 3);
    const next = state.update(computeBlockquoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('a quote');
  });

  it('applies to every non-blank line spanned by the selection', () => {
    const doc = 'first\nsecond\n\nthird';
    const state = stateFor(doc, 0, doc.length);
    const next = state.update(computeBlockquoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('> first\n> second\n\n> third');
  });
});

describe('computeUnorderedListTransaction', () => {
  it('adds a bullet to a single line', () => {
    const state = stateFor('item', 0);
    const next = state.update(computeUnorderedListTransaction(state)).state;
    expect(next.doc.toString()).toBe('- item');
  });

  it('toggles bullets off across a multi-line selection', () => {
    const doc = '- one\n- two';
    const state = stateFor(doc, 0, doc.length);
    const next = state.update(computeUnorderedListTransaction(state)).state;
    expect(next.doc.toString()).toBe('one\ntwo');
  });
});

describe('computeOrderedListTransaction', () => {
  it('numbers every non-blank line sequentially starting at 1', () => {
    const doc = 'one\ntwo\nthree';
    const state = stateFor(doc, 0, doc.length);
    const next = state.update(computeOrderedListTransaction(state)).state;
    expect(next.doc.toString()).toBe('1. one\n2. two\n3. three');
  });

  it('renumbers from 1 even when the selection starts mid-list', () => {
    const doc = 'a\nb\nc';
    const state = stateFor(doc, doc.indexOf('b'), doc.length);
    const next = state.update(computeOrderedListTransaction(state)).state;
    expect(next.doc.toString()).toBe('a\n1. b\n2. c');
  });

  it('strips existing numbering on toggle-off', () => {
    const doc = '1. one\n2. two';
    const state = stateFor(doc, 0, doc.length);
    const next = state.update(computeOrderedListTransaction(state)).state;
    expect(next.doc.toString()).toBe('one\ntwo');
  });
});

describe('computeAlertTransaction', () => {
  it('wraps a single line as a NOTE alert by default', () => {
    const state = stateFor('Useful info', 0);
    const next = state.update(computeAlertTransaction(state)).state;
    expect(next.doc.toString()).toBe('> [!NOTE]\n> Useful info');
  });

  it('supports other alert types', () => {
    const state = stateFor('Be careful', 0);
    const next = state.update(computeAlertTransaction(state, 'WARNING')).state;
    expect(next.doc.toString()).toBe('> [!WARNING]\n> Be careful');
  });

  it('wraps every non-blank line spanned by the selection', () => {
    const doc = 'first\nsecond';
    const state = stateFor(doc, 0, doc.length);
    const next = state.update(computeAlertTransaction(state)).state;
    expect(next.doc.toString()).toBe('> [!NOTE]\n> first\n> second');
  });

  it('does not toggle off on repeated application (matches code block behavior) — it nests instead', () => {
    const state = stateFor('> [!NOTE]\n> already here', 0, 9);
    const next = state.update(computeAlertTransaction(state)).state;
    expect(next.doc.toString()).toBe('> [!NOTE]\n> > [!NOTE]\n> already here');
  });
});

describe('nextFootnoteNumber', () => {
  it('returns 1 for a document with no footnotes', () => {
    expect(nextFootnoteNumber('no footnotes here')).toBe(1);
  });

  it('returns one past the highest existing number', () => {
    expect(nextFootnoteNumber('a[^1] b[^2]')).toBe(3);
  });

  it('fills the first gap-free number even if refs are out of order', () => {
    expect(nextFootnoteNumber('a[^3] b[^1]')).toBe(2);
  });
});

describe('computeFootnoteTransaction', () => {
  it('inserts a reference at the cursor and a definition at the end', () => {
    const state = stateFor('some text', 4);
    const next = state.update(computeFootnoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('some[^1] text\n\n[^1]: ');
  });

  it('places the cursor right after the inserted reference, not in the appended definition', () => {
    const state = stateFor('some text', 4);
    const next = state.update(computeFootnoteTransaction(state)).state;
    // 'some' (4) + '[^1]' (4) = 8, i.e. right before ' text', nowhere near doc end.
    expect(next.selection.main.from).toBe(8);
    expect(next.selection.main.from).not.toBe(next.doc.length);
  });

  it('a second footnote inserted right after the first does not land inside its definition', () => {
    // Regression test: leaving the cursor in the definition after insertion #1
    // meant insertion #2 (fired with no repositioning) landed there instead of
    // the main text, corrupting "[^1]: " into "[^1]: [^2]".
    let state = stateFor('some text', 4);
    state = state.update(computeFootnoteTransaction(state)).state;
    state = state.update(computeFootnoteTransaction(state)).state;
    expect(state.doc.toString()).toBe('some[^1][^2] text\n\n[^1]: \n\n[^2]: ');
  });

  it('does not add a leading blank line when the doc already ends with a newline', () => {
    const state = stateFor('some text\n', 4);
    const next = state.update(computeFootnoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('some[^1] text\n[^1]: ');
  });

  it('numbers past existing footnotes', () => {
    const doc = 'first[^1]';
    const state = stateFor(doc, doc.length);
    const next = state.update(computeFootnoteTransaction(state)).state;
    expect(next.doc.toString()).toBe('first[^1][^2]\n\n[^2]: ');
  });
});

describe('computeMathTransaction', () => {
  it('inserts inline math and selects the placeholder body', () => {
    const state = stateFor('', 0);
    const next = state.update(computeMathTransaction(state, 'x', false)).state;
    expect(next.doc.toString()).toBe('$x$');
    expect(next.selection.main.from).toBe(1);
    expect(next.selection.main.to).toBe(2);
  });

  it('wraps an existing selection as inline math', () => {
    const state = stateFor('a=b', 0, 3);
    const next = state.update(computeMathTransaction(state, 'PLACEHOLDER', false)).state;
    expect(next.doc.toString()).toBe('$a=b$');
    expect(next.selection.main.from).toBe(1);
    expect(next.selection.main.to).toBe(4);
  });

  it('inserts display math as its own block at line start', () => {
    const state = stateFor('', 0);
    const next = state.update(computeMathTransaction(state, 'E=mc^2', true)).state;
    expect(next.doc.toString()).toBe('$$\nE=mc^2\n$$\n');
    // body selected
    expect(next.doc.sliceString(next.selection.main.from, next.selection.main.to)).toBe('E=mc^2');
  });

  it('adds a leading blank line for display math mid-line', () => {
    const state = stateFor('text', 4);
    const next = state.update(computeMathTransaction(state, 'y', true)).state;
    expect(next.doc.toString()).toBe('text\n\n$$\ny\n$$\n');
  });
});

describe('computeMermaidTransaction', () => {
  it('inserts a fenced mermaid block and selects the body', () => {
    const state = stateFor('', 0);
    const next = state.update(computeMermaidTransaction(state, 'graph TD')).state;
    expect(next.doc.toString()).toBe('```mermaid\ngraph TD\n```\n');
    expect(next.doc.sliceString(next.selection.main.from, next.selection.main.to)).toBe('graph TD');
  });

  it('uses the selection as the diagram body when present', () => {
    const state = stateFor('pie showData', 0, 12);
    const next = state.update(computeMermaidTransaction(state, 'TEMPLATE')).state;
    expect(next.doc.toString()).toBe('```mermaid\npie showData\n```\n');
  });

  it('adds a leading blank line mid-line', () => {
    const state = stateFor('x', 1);
    const next = state.update(computeMermaidTransaction(state, 'graph TD')).state;
    expect(next.doc.toString()).toBe('x\n\n```mermaid\ngraph TD\n```\n');
  });
});
