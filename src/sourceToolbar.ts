/**
 * Source-pane (CodeMirror/Markdown-text) formatting actions and keyboard
 * shortcuts. No toolbar DOM lives here — unifiedToolbar.ts routes to
 * `sourceActionsFor(view)` when the source pane has focus. This module keeps
 * only the action implementations, the always-on keymap (keydown is
 * inherently focus-scoped, so it can't be unified), and a spacer panel that
 * reserves the same vertical space the fixed unified toolbar occupies —
 * CodeMirror's own `showPanel` extension is the correct tool for that, even
 * though the panel's content here is just an empty div, not real buttons.
 */

import { keymap, showPanel } from '@codemirror/view';
import type { EditorView, KeyBinding, Panel } from '@codemirror/view';
import { Compartment, Prec } from '@codemirror/state';
import type { Extension, TransactionSpec } from '@codemirror/state';
import { MarkEdit } from 'markedit-api';
import { TOOLBAR_BUTTONS } from './shared/formatSpecs';
import { pickAlertType } from './shared/alertPicker';
import {
  computeWrapTransaction,
  computeHeadingTransaction,
  computeCodeBlockTransaction,
  computeHorizontalRuleTransaction,
  computeBlockquoteTransaction,
  computeUnorderedListTransaction,
  computeOrderedListTransaction,
  computeAlertTransaction,
  computeFootnoteTransaction,
} from './sourceFormat';

const spacerCompartment = new Compartment();

function dispatch(view: EditorView, spec: TransactionSpec): void {
  view.dispatch(spec);
  view.focus();
}

/** The source pane's formatting actions, bound to a specific EditorView. */
export function sourceActionsFor(view: EditorView): Record<string, () => void> {
  return {
    h1: () => dispatch(view, computeHeadingTransaction(view.state, 1)),
    h2: () => dispatch(view, computeHeadingTransaction(view.state, 2)),
    h3: () => dispatch(view, computeHeadingTransaction(view.state, 3)),
    bold: () => dispatch(view, computeWrapTransaction(view.state, '**')),
    italic: () => dispatch(view, computeWrapTransaction(view.state, '*')),
    strike: () => dispatch(view, computeWrapTransaction(view.state, '~~')),
    code: () => dispatch(view, computeWrapTransaction(view.state, '`')),
    codeblock: () => dispatch(view, computeCodeBlockTransaction(view.state)),
    blockquote: () => dispatch(view, computeBlockquoteTransaction(view.state)),
    ul: () => dispatch(view, computeUnorderedListTransaction(view.state)),
    ol: () => dispatch(view, computeOrderedListTransaction(view.state)),
    link: () => void insertLink(view),
    image: () => void insertImage(view),
    hr: () => dispatch(view, computeHorizontalRuleTransaction(view.state)),
    alert: () => void insertAlert(view),
    footnote: () => dispatch(view, computeFootnoteTransaction(view.state)),
  };
}

async function insertLink(view: EditorView): Promise<void> {
  const url = await MarkEdit.showTextBox({
    title: 'Insert Link',
    placeholder: 'https://example.com',
  });
  if (url === undefined || url.trim() === '') {return;}
  dispatch(view, computeWrapTransaction(view.state, '[', `](${url.trim()})`));
}

async function insertImage(view: EditorView): Promise<void> {
  const url = await MarkEdit.showTextBox({
    title: 'Insert Image',
    placeholder: 'https://example.com/image.png',
  });
  if (url === undefined || url.trim() === '') {return;}
  dispatch(view, computeWrapTransaction(view.state, '![', `](${url.trim()})`));
}

async function insertAlert(view: EditorView): Promise<void> {
  const alertType = await pickAlertType();
  if (alertType === undefined) {return;}
  dispatch(view, computeAlertTransaction(view.state, alertType));
}

const sourceKeymap: Extension = Prec.highest(keymap.of((() => {
  const bindings: KeyBinding[] = [];
  for (const btn of TOOLBAR_BUTTONS) {
    if (btn.shortcut === undefined) {continue;}
    const cmKey = btn.shortcut.cmKey;
    bindings.push({
      key: cmKey,
      run: (view: EditorView) => {
        sourceActionsFor(view)[btn.id]();
        return true;
      },
    });
  }
  return bindings;
})()));

function createSpacerPanel(height: number) {
  return (): Panel => {
    const dom = document.createElement('div');
    dom.style.height = `${height}px`;
    return { top: true, dom };
  };
}

/**
 * Registered once at startup via MarkEdit.addExtension. The spacer
 * compartment starts empty — unifiedToolbar.ts's show/hide toggles it via
 * showSourceSpacer/hideSourceSpacer, sized to match the fixed toolbar's
 * measured height. The keymap is always active: source shortcuts should
 * work regardless of whether the toolbar itself is visible.
 */
export function sourceExtensions(): Extension {
  return [spacerCompartment.of([]), sourceKeymap];
}

export function showSourceSpacer(view: EditorView, height: number): void {
  view.dispatch({ effects: spacerCompartment.reconfigure(showPanel.of(createSpacerPanel(height))) });
}

export function hideSourceSpacer(view: EditorView): void {
  view.dispatch({ effects: spacerCompartment.reconfigure([]) });
}
