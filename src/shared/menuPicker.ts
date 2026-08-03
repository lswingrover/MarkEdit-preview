/**
 * A plain labelled-list popover menu, built on showPopover — used by the
 * math and mermaid insertion menus. Unlike the alert picker (which renders
 * each option as its real rendered appearance), these entries are simple
 * text labels with an optional monospace hint, so one generic helper covers
 * both. The alert picker stays separate because its options are visual
 * previews, not labels.
 */

import { showPopover } from './pickerPopover';
import { getToolbarButton } from '../toolbarUI';

export interface MenuEntry {
  id: string;
  label: string;
  /** Optional monospace hint shown dimmed to the right (e.g. `$$…$$`). */
  hint?: string;
}

/**
 * Show a menu anchored to the toolbar button `anchorId`. Resolves to the
 * chosen entry's id, or undefined if cancelled (Escape / click-outside /
 * Cancel).
 */
export async function pickFromMenu(anchorId: string, entries: MenuEntry[]): Promise<string | undefined> {
  const anchor = getToolbarButton(anchorId) ?? document.body;

  return showPopover<string>(anchor, (root, select, cancel) => {
    root.classList.add('menu-picker-popover');

    for (const entry of entries) {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'menu-picker-option';
      option.dataset.id = entry.id;

      const label = document.createElement('span');
      label.className = 'menu-picker-label';
      label.textContent = entry.label;
      option.appendChild(label);

      if (entry.hint !== undefined) {
        const hint = document.createElement('span');
        hint.className = 'menu-picker-hint';
        hint.textContent = entry.hint;
        option.appendChild(hint);
      }

      option.addEventListener('mousedown', e => {
        e.preventDefault();
        select(entry.id);
      });
      root.appendChild(option);
    }

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.className = 'menu-picker-cancel';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('mousedown', e => {
      e.preventDefault();
      cancel();
    });
    root.appendChild(cancelButton);
  });
}
