import { TOOLBAR_BUTTONS } from './shared/formatSpecs';

/** Build a toolbar element from the shared button spec, wiring each button's `id` to an action. */
export function buildToolbarElement(className: string, actionsById: Record<string, () => void>): HTMLElement {
  const el = document.createElement('div');
  el.className = className;
  el.setAttribute('role', 'toolbar');
  el.setAttribute('aria-label', 'Formatting toolbar');

  for (const btn of TOOLBAR_BUTTONS) {
    if (btn.isSep === true) {
      const sep = document.createElement('span');
      sep.className = 'wysiwyg-sep';
      sep.setAttribute('aria-hidden', 'true');
      el.appendChild(sep);
      continue;
    }

    const action = actionsById[btn.id];
    if (action === undefined) {continue;}

    const button = document.createElement('button');
    button.className = 'wysiwyg-btn';
    button.dataset.id = btn.id;
    button.title = btn.shortcut !== undefined ? `${btn.title} (${btn.shortcut.display})` : btn.title;
    button.innerHTML = btn.label;
    button.type = 'button';
    // mousedown fires before blur, preserving focus on whichever pane owns the selection
    button.addEventListener('mousedown', e => {
      e.preventDefault();
      action();
    });
    el.appendChild(button);
  }

  return el;
}

/**
 * Look up a toolbar button's element by id, e.g. to anchor a picker popover
 * to it. Only the unified toolbar renders buttons now, so this hardcodes
 * that class name rather than taking a container param everywhere a picker
 * might fire from (keyboard shortcuts have no clicked element to anchor to).
 */
export function getToolbarButton(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`.unified-toolbar [data-id="${id}"]`);
}
