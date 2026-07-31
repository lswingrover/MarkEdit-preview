/**
 * A single formatting toolbar spanning the full window width, fixed above
 * both panes in side-by-side mode (and above whichever single pane is
 * visible in edit-only/preview-only mode). Each button's action routes to
 * the source pane (CodeMirror) or the preview pane (contentEditable) based
 * on which currently has focus — the two panes no longer carry their own
 * embedded toolbars.
 */

import { MarkEdit } from 'markedit-api';
import { TOOLBAR_BUTTONS } from './shared/formatSpecs';
import { buildToolbarElement } from './toolbarUI';
import { previewActionsById } from './toolbar';
import { sourceActionsFor, showSourceSpacer, hideSourceSpacer } from './sourceToolbar';

const TOOLBAR_HEIGHT_VAR = '--markedit-toolbar-height';
const ACTIVE_CLASS = 'markedit-unified-toolbar-active';

let toolbarEl: HTMLElement | null = null;

function isSourceFocused(): boolean {
  return MarkEdit.editorView.hasFocus;
}

function routedActionsById(): Record<string, () => void> {
  const routed: Record<string, () => void> = {};
  for (const btn of TOOLBAR_BUTTONS) {
    if (btn.isSep === true) {continue;}
    routed[btn.id] = () => {
      const actions = isSourceFocused() ? sourceActionsFor(MarkEdit.editorView) : previewActionsById;
      actions[btn.id]?.();
    };
  }
  return routed;
}

function createToolbar(): HTMLElement {
  toolbarEl ??= buildToolbarElement('unified-toolbar', routedActionsById());
  return toolbarEl;
}

/** Registered once at startup — builds the (initially hidden) toolbar element. */
export function installUnifiedToolbar(): void {
  const el = createToolbar();
  el.style.display = 'none';
  document.body.appendChild(el);
}

export function showUnifiedToolbar(): void {
  const el = createToolbar();
  el.style.display = '';
  const height = el.getBoundingClientRect().height;
  document.documentElement.style.setProperty(TOOLBAR_HEIGHT_VAR, `${height}px`);
  document.body.classList.add(ACTIVE_CLASS);
  showSourceSpacer(MarkEdit.editorView, height);
}

export function hideUnifiedToolbar(): void {
  if (toolbarEl !== null) {toolbarEl.style.display = 'none';}
  document.body.classList.remove(ACTIVE_CLASS);
  document.documentElement.style.removeProperty(TOOLBAR_HEIGHT_VAR);
  hideSourceSpacer(MarkEdit.editorView);
}
