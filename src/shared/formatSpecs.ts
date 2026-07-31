/**
 * Single source of truth for the formatting toolbar's buttons and keyboard
 * shortcuts. Both the preview toolbar (HTML/execCommand) and the source
 * toolbar (CodeMirror/Markdown text) render from this same list so the two
 * panes can never drift out of sync on labels, order, or shortcuts.
 */

export interface ShortcutSpec {
  /** DOM KeyboardEvent.key value (lowercase), used by the preview pane's keydown listener. */
  domKey: string;
  /** CodeMirror key-name string (e.g. "Mod-b"), used by the source pane's keymap. */
  cmKey: string;
  shift?: boolean;
  alt?: boolean;
  /** Human-readable shortcut suffix appended to the button's tooltip. */
  display: string;
}

export interface ToolbarSpec {
  id: string;
  label: string;
  title: string;
  shortcut?: ShortcutSpec;
  isSep?: boolean;
}

export const TOOLBAR_BUTTONS: ToolbarSpec[] = [
  { id: 'h1', label: 'H1', title: 'Heading 1', shortcut: { domKey: '1', cmKey: 'Mod-1', display: '⌘1' } },
  { id: 'h2', label: 'H2', title: 'Heading 2', shortcut: { domKey: '2', cmKey: 'Mod-2', display: '⌘2' } },
  { id: 'h3', label: 'H3', title: 'Heading 3', shortcut: { domKey: '3', cmKey: 'Mod-3', display: '⌘3' } },
  { id: 'sep1', label: '', title: '', isSep: true },
  { id: 'bold', label: '<b>B</b>', title: 'Bold', shortcut: { domKey: 'b', cmKey: 'Mod-b', display: '⌘B' } },
  { id: 'italic', label: '<i>I</i>', title: 'Italic', shortcut: { domKey: 'i', cmKey: 'Mod-i', display: '⌘I' } },
  { id: 'strike', label: '<s>S</s>', title: 'Strikethrough', shortcut: { domKey: 'x', cmKey: 'Mod-Shift-x', shift: true, display: '⇧⌘X' } },
  { id: 'code', label: '&#x60;&#x60;', title: 'Inline code', shortcut: { domKey: 'e', cmKey: 'Mod-e', display: '⌘E' } },
  { id: 'codeblock', label: '&#x60;&#x60;&#x60;', title: 'Code block', shortcut: { domKey: 'c', cmKey: 'Mod-Alt-c', alt: true, display: '⌥⌘C' } },
  { id: 'sep2', label: '', title: '', isSep: true },
  { id: 'blockquote', label: '&#8220;', title: 'Blockquote', shortcut: { domKey: '.', cmKey: 'Mod-Shift-.', shift: true, display: '⇧⌘.' } },
  { id: 'ul', label: '&bull;', title: 'Unordered list', shortcut: { domKey: '8', cmKey: 'Mod-Shift-8', shift: true, display: '⇧⌘8' } },
  { id: 'ol', label: '1.', title: 'Ordered list', shortcut: { domKey: '7', cmKey: 'Mod-Shift-7', shift: true, display: '⇧⌘7' } },
  { id: 'sep3', label: '', title: '', isSep: true },
  { id: 'link', label: '&#128279;', title: 'Insert link', shortcut: { domKey: 'k', cmKey: 'Mod-k', display: '⌘K' } },
  { id: 'image', label: '&#128247;', title: 'Insert image', shortcut: { domKey: 'k', cmKey: 'Mod-Shift-k', shift: true, display: '⇧⌘K' } },
  { id: 'hr', label: '&#8212;', title: 'Horizontal rule', shortcut: { domKey: '-', cmKey: 'Mod-Shift--', shift: true, display: '⇧⌘−' } },
  { id: 'sep4', label: '', title: '', isSep: true },
  { id: 'alert', label: '&#9888;', title: 'Alert / callout (always inserts a NOTE — edit the word to change type)', shortcut: { domKey: 'a', cmKey: 'Mod-Alt-a', alt: true, display: '⌥⌘A' } },
  { id: 'footnote', label: '[^]', title: 'Insert footnote', shortcut: { domKey: 'f', cmKey: 'Mod-Alt-f', alt: true, display: '⌥⌘F' } },
];

/** Does this DOM KeyboardEvent match the given shortcut? Cmd (Mod) is always required. */
export function matchesShortcut(event: KeyboardEvent, shortcut: ShortcutSpec): boolean {
  return (event.metaKey || event.ctrlKey)
    && event.key.toLowerCase() === shortcut.domKey
    && event.shiftKey === (shortcut.shift ?? false)
    && event.altKey === (shortcut.alt ?? false);
}
