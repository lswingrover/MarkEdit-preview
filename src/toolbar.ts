/**
 * Preview-pane (contentEditable/execCommand) formatting actions. No toolbar
 * DOM lives here anymore — that's unifiedToolbar.ts, which routes to
 * `previewActionsById` when the preview pane has focus. This module keeps
 * only the action implementations and the preview-pane keyboard shortcut
 * listener (keydown is inherently focus-scoped, so it can't be unified).
 */

import { MarkEdit } from 'markedit-api';
import { TOOLBAR_BUTTONS, matchesShortcut } from './shared/formatSpecs';
import { pickAlertType } from './shared/alertPicker';
import { pickMathTemplate } from './shared/mathPicker';
import { pickMermaidTemplate } from './shared/mermaidPicker';
import { mathMarkdown } from './shared/insertSpecs';
import { nextFootnoteNumber } from './sourceFormat';

let keydownListener: ((event: KeyboardEvent) => void) | undefined;

export const previewActionsById: Record<string, () => void> = {
  h1: () => fmt('h1'),
  h2: () => fmt('h2'),
  h3: () => fmt('h3'),
  bold: () => exec('bold'),
  italic: () => exec('italic'),
  strike: () => exec('strikeThrough'),
  code: insertInlineCode,
  codeblock: insertCodeBlock,
  blockquote: () => fmt('blockquote'),
  ul: () => exec('insertUnorderedList'),
  ol: () => exec('insertOrderedList'),
  link: () => void insertLink(),
  image: () => void insertImage(),
  hr: () => exec('insertHorizontalRule'),
  alert: () => void insertAlert(),
  footnote: insertFootnote,
  math: () => void insertMath(),
  mermaid: () => void insertMermaid(),
};

/** Attach the keyboard-shortcut listener, scoped to the preview pane so it only
 * fires while the user is actually editing there. */
export function installPreviewShortcuts(preview: HTMLElement): void {
  if (keydownListener !== undefined) {return;}
  keydownListener = event => {
    const btn = TOOLBAR_BUTTONS.find(b => b.shortcut !== undefined && matchesShortcut(event, b.shortcut));
    if (btn === undefined) {return;}
    const action = previewActionsById[btn.id];
    if (action === undefined) {return;}
    event.preventDefault();
    action();
  };
  preview.addEventListener('keydown', keydownListener);
}

export function removePreviewShortcuts(preview: HTMLElement): void {
  if (keydownListener === undefined) {return;}
  preview.removeEventListener('keydown', keydownListener);
  keydownListener = undefined;
}

// ── Formatting helpers ────────────────────────────────────────────────────────

function exec(command: string, value?: string): void {
  document.execCommand(command, false, value);
  fireInput();
}

function fmt(tag: string): void {
  document.execCommand('formatBlock', false, tag);
  fireInput();
}

/** Dispatch an input event on the preview pane so wysiwyg.ts syncs the source. */
function fireInput(): void {
  document.querySelector('.markdown-body')?.dispatchEvent(
    new Event('input', { bubbles: true }),
  );
}

/** Text that must survive the HTML→Markdown round-trip verbatim — see the
 * `rawMarkdown` Turndown rule in wysiwyg.ts. */
function rawMarkdownSpan(text: string): HTMLElement {
  const span = document.createElement('span');
  span.className = 'raw-markdown';
  span.textContent = text;
  return span;
}

function insertInlineCode(): void {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0);
  const code = document.createElement('code');
  code.textContent = range.toString() || 'code';
  range.deleteContents();
  range.insertNode(code);
  range.setStartAfter(code);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

function insertCodeBlock(): void {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0);
  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.textContent = range.toString() || 'code block';
  pre.appendChild(code);
  range.deleteContents();
  range.insertNode(pre);
  range.setStartAfter(pre);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

async function insertLink(): Promise<void> {
  const url = await MarkEdit.showTextBox({
    title: 'Insert Link',
    placeholder: 'https://example.com',
  });
  if (url === undefined || url.trim() === '') {return;}
  exec('createLink', url.trim());
}

async function insertImage(): Promise<void> {
  const url = await MarkEdit.showTextBox({
    title: 'Insert Image',
    placeholder: 'https://example.com/image.png',
  });
  if (url === undefined || url.trim() === '') {return;}

  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0);
  const img = document.createElement('img');
  img.src = url.trim();
  img.alt = range.toString() || 'image';
  range.deleteContents();
  range.insertNode(img);
  range.setStartAfter(img);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

/**
 * Insert a GitHub-style alert/callout. Builds it as plain text + <br>, not a
 * special HTML structure — Turndown has no rule for this renderer's alert
 * markup, so round-tripping through real alert HTML wouldn't survive the
 * HTML→Markdown conversion. The "[!TYPE]" marker is wrapped in a raw-markdown
 * span so Turndown emits it verbatim instead of escaping the brackets. Not a
 * toggle, matching the source pane's alert action (see
 * computeAlertTransaction's doc comment).
 *
 * The range is captured BEFORE opening the picker, not re-read from
 * window.getSelection() after — the picker popover's own option button gets
 * removed from the DOM while its own mousedown is still dispatching (finish()
 * calls popover.remove() synchronously inside the click handler), which
 * clears the page's selection as a side effect. Re-querying the selection
 * after that await silently returns nothing, no-oping the whole action.
 */
async function insertAlert(): Promise<void> {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0).cloneRange();

  const alertType = await pickAlertType();
  if (alertType === undefined) {return;}

  const content = range.toString() || 'Useful information.';
  const blockquote = document.createElement('blockquote');
  blockquote.appendChild(rawMarkdownSpan(`[!${alertType}]`));
  blockquote.appendChild(document.createElement('br'));
  blockquote.appendChild(document.createTextNode(content));
  range.deleteContents();
  range.insertNode(blockquote);
  range.setStartAfter(blockquote);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

/**
 * Insert KaTeX math at the cursor. The math string is emitted verbatim via a
 * raw-markdown span (LaTeX is dense with `\`, `_`, `^`, `{` that Turndown
 * would otherwise escape). Display math uses single-line `$$…$$` rather than
 * the source pane's multi-line block form: a multi-line body inside an inline
 * span would get its newlines collapsed on the HTML→Markdown round-trip, and
 * `$$…$$` on one line still renders as display math.
 *
 * Like insertAlert, the range is captured BEFORE opening the picker — the
 * popover removes its own option button synchronously during the click, which
 * clears the page selection as a side effect.
 */
async function insertMath(): Promise<void> {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0).cloneRange();

  const template = await pickMathTemplate();
  if (template === undefined) {return;}

  const body = range.toString() || template.latex;
  const node = rawMarkdownSpan(mathMarkdown(body, template.display));
  range.deleteContents();
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

/**
 * Insert a Mermaid diagram as a real `<pre><code class="language-mermaid">`
 * block — Turndown's GFM fenced-code rule reads the language off that class,
 * so it round-trips to a ```mermaid fence, which the renderer turns back into
 * a diagram. Range captured before the picker for the same reason as
 * insertMath/insertAlert.
 */
async function insertMermaid(): Promise<void> {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const range = sel.getRangeAt(0).cloneRange();

  const template = await pickMermaidTemplate();
  if (template === undefined) {return;}

  const pre = document.createElement('pre');
  const code = document.createElement('code');
  code.className = 'language-mermaid';
  code.textContent = range.toString() || template.code;
  pre.appendChild(code);
  range.deleteContents();
  range.insertNode(pre);
  range.setStartAfter(pre);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  fireInput();
}

/**
 * Insert a footnote reference at the cursor and its (empty) definition as a
 * new paragraph at the end of the preview pane. Both markers are wrapped in a
 * raw-markdown span (see rawMarkdownSpan) so Turndown emits "[^N]"/"[^N]: "
 * verbatim instead of escaping the brackets — that escaping used to also
 * break next-number detection, since the escaped form no longer matched
 * nextFootnoteNumber()'s regex. The cursor stays right after the inserted
 * reference, not the definition — parking it in the definition meant a
 * second insertion of anything, fired without repositioning, landed in the
 * footnote zone instead of the main text.
 */
function insertFootnote(): void {
  const sel = window.getSelection();
  if (sel === null || sel.rangeCount === 0) {return;}
  const preview = document.querySelector<HTMLElement>('.markdown-body');
  if (preview === null) {return;}

  const n = nextFootnoteNumber(MarkEdit.editorAPI.getText());
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const refNode = rawMarkdownSpan(`[^${n}]`);
  range.insertNode(refNode);

  const definition = document.createElement('p');
  definition.appendChild(rawMarkdownSpan(`[^${n}]: `));
  preview.appendChild(definition);

  const cursorRange = document.createRange();
  cursorRange.setStartAfter(refNode);
  cursorRange.collapse(true);
  sel.removeAllRanges();
  sel.addRange(cursorRange);
  fireInput();
}
