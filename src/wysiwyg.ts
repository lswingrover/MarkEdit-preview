/**
 * WYSIWYG editing mode for MarkEdit-preview.
 *
 * When active, the preview pane becomes contentEditable. User edits are
 * converted from HTML back to Markdown via Turndown and pushed to the
 * CodeMirror source editor through MarkEdit.editorAPI.setText().
 *
 * Anti-loop: the WYSIWYG lock suppresses renderHtmlPreview() for 600ms
 * after each edit so the source-editor update listener does not immediately
 * re-render the preview and destroy the user cursor position.
 */

import TurndownService from 'turndown';
// @ts-expect-error no bundled types; @types/turndown covers TurndownService only
import { gfm } from 'turndown-plugin-gfm';
import { MarkEdit } from 'markedit-api';
import { getPreviewPane, setWysiwygEditLock, renderHtmlPreview } from './view';
import { invalidateBlockCache } from './scroll';
import { installPreviewShortcuts, removePreviewShortcuts } from './toolbar';
import { showUnifiedToolbar, hideUnifiedToolbar } from './unifiedToolbar';

// Turndown instance configured for GFM-compliant markdown output
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  fence: '```',
  emDelimiter: '*',
  strongDelimiter: '**',
  linkStyle: 'inlined',
});
turndown.use(gfm);

/**
 * Turndown escapes markdown-special characters in ordinary text (so a user
 * literally typing "[x]" doesn't accidentally produce a link/footnote). That
 * breaks the footnote/alert actions, which deliberately insert real "[^1]" /
 * "[!NOTE]" syntax as plain text — Turndown turned it into "\[^1\]", which
 * isn't a footnote anymore and also broke next-number detection downstream.
 * Any element tagged with the `raw-markdown` class is emitted verbatim
 * instead. See insertFootnote()/insertAlert() in toolbar.ts.
 */
turndown.addRule('rawMarkdown', {
  filter: node => node.nodeName === 'SPAN' && node.classList.contains('raw-markdown'),
  replacement: (_content, node) => node.textContent ?? '',
});

let isWysiwygActive = false;
let editLockTimer: ReturnType<typeof setTimeout> | undefined;

export function isWysiwyg(): boolean {
  return isWysiwygActive;
}

export function enableWysiwyg(): void {
  if (isWysiwygActive) {return;}
  isWysiwygActive = true;
  const preview = getPreviewPane();
  preview.contentEditable = 'true';
  preview.spellcheck = true;
  preview.classList.add('wysiwyg-active');
  preview.addEventListener('input', onPreviewInput);
  installPreviewShortcuts(preview);
  showUnifiedToolbar();
  invalidateBlockCache(); // the toolbar reserves space at the top, shifting block offsetTops
  preview.focus();
}

export function disableWysiwyg(): void {
  if (!isWysiwygActive) {return;}
  isWysiwygActive = false;
  if (editLockTimer !== undefined) {
    clearTimeout(editLockTimer);
    editLockTimer = undefined;
  }
  setWysiwygEditLock(false);
  const preview = getPreviewPane();
  preview.contentEditable = 'false';
  preview.classList.remove('wysiwyg-active');
  preview.removeEventListener('input', onPreviewInput);
  removePreviewShortcuts(preview);
  hideUnifiedToolbar();
  invalidateBlockCache();
  renderHtmlPreview();
}

function onPreviewInput(): void {
  if (editLockTimer !== undefined) {clearTimeout(editLockTimer);}
  setWysiwygEditLock(true);
  editLockTimer = setTimeout(() => {
    setWysiwygEditLock(false);
    editLockTimer = undefined;
  }, 600);
  MarkEdit.editorAPI.setText(htmlToMarkdown());
}

function htmlToMarkdown(): string {
  const preview = getPreviewPane();
  const clone = preview.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('[data-line-from],[data-line-to]').forEach(el => {
    el.removeAttribute('data-line-from');
    el.removeAttribute('data-line-to');
  });
  return turndown.turndown(clone.innerHTML);
}
