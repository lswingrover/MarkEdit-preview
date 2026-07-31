/**
 * Generic anchored popover for pickers that need real visual content (not
 * just plain-text buttons) — the alert-type picker uses it now, the
 * upcoming table-size picker will too. Handles positioning near an anchor
 * element, Escape-to-cancel, and click-outside-to-cancel; the caller
 * supplies the content and decides what counts as "select" vs "cancel".
 */

let openPopover: { finish: (result: unknown) => void } | undefined;

/**
 * Show a popover anchored below `anchor`. `render` receives the popover's
 * root element plus `select`/`cancel` callbacks — call `select(result)` when
 * the user picks something, `cancel()` for an explicit Cancel affordance.
 * Escape and clicking outside the popover always cancel. Resolves to the
 * selected value, or undefined if cancelled by any path.
 */
export function showPopover<T>(
  anchor: HTMLElement,
  render: (root: HTMLElement, select: (result: T) => void, cancel: () => void) => void,
): Promise<T | undefined> {
  openPopover?.finish(undefined);

  return new Promise(resolve => {
    let resolved = false;
    const popover = document.createElement('div');
    popover.className = 'formatting-picker-popover';
    popover.setAttribute('role', 'dialog');

    const rect = anchor.getBoundingClientRect();
    popover.style.position = 'fixed';
    popover.style.top = `${rect.bottom + 6}px`;
    popover.style.left = `${rect.left}px`;

    function finish(result: T | undefined): void {
      if (resolved) {return;}
      resolved = true;
      openPopover = undefined;
      popover.remove();
      document.removeEventListener('keydown', onKeyDown, true);
      document.removeEventListener('mousedown', onOutsideClick, true);
      resolve(result);
    }

    function onKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        event.preventDefault();
        finish(undefined);
      }
    }

    function onOutsideClick(event: MouseEvent): void {
      if (!popover.contains(event.target as Node)) {
        finish(undefined);
      }
    }

    openPopover = { finish };
    render(popover, finish, () => finish(undefined));

    document.body.appendChild(popover);
    // Keep the popover on-screen if the anchor is near the right/bottom edge.
    const popoverRect = popover.getBoundingClientRect();
    if (popoverRect.right > window.innerWidth) {
      popover.style.left = `${Math.max(0, window.innerWidth - popoverRect.width - 8)}px`;
    }
    if (popoverRect.bottom > window.innerHeight) {
      popover.style.top = `${Math.max(0, rect.top - popoverRect.height - 6)}px`;
    }

    document.addEventListener('keydown', onKeyDown, true);
    // Deferred: the mousedown that triggered this picker (a toolbar button
    // click) shouldn't itself register as an "outside click" closing it.
    requestAnimationFrame(() => document.addEventListener('mousedown', onOutsideClick, true));
  });
}
