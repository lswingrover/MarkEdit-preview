// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { showPopover } from '../src/shared/pickerPopover';

beforeEach(() => {
  document.body.innerHTML = '';
});

function anchorEl(): HTMLElement {
  const el = document.createElement('button');
  document.body.appendChild(el);
  return el;
}

describe('showPopover', () => {
  it('appends a dialog to the document and resolves with the selected value', async () => {
    const promise = showPopover<string>(anchorEl(), (root, select) => {
      const btn = document.createElement('button');
      btn.textContent = 'pick me';
      btn.addEventListener('mousedown', () => select('chosen'));
      root.appendChild(btn);
    });

    expect(document.querySelector('.formatting-picker-popover')).not.toBeNull();
    document.querySelector('button:last-child')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(await promise).toBe('chosen');
    expect(document.querySelector('.formatting-picker-popover')).toBeNull();
  });

  it('resolves undefined and removes the popover on Escape', async () => {
    const promise = showPopover<string>(anchorEl(), () => {});

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(await promise).toBeUndefined();
    expect(document.querySelector('.formatting-picker-popover')).toBeNull();
  });

  it('resolves undefined when the caller calls cancel()', async () => {
    const promise = showPopover<string>(anchorEl(), (root, _select, cancel) => {
      const btn = document.createElement('button');
      btn.textContent = 'Cancel';
      btn.addEventListener('mousedown', () => cancel());
      root.appendChild(btn);
    });

    document.querySelector('button:last-child')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(await promise).toBeUndefined();
  });

  it('resolves undefined on an outside click, but not a click inside the popover', async () => {
    const promise = showPopover<string>(anchorEl(), (root, select) => {
      const btn = document.createElement('button');
      btn.textContent = 'inside';
      // Deliberately no select() call — this listener only proves an inside
      // click doesn't trigger the outside-click cancel path.
      root.appendChild(btn);
      void select;
    });

    // The outside-click listener is attached on a deferred microtask/rAF —
    // flush it before dispatching.
    await new Promise(resolve => requestAnimationFrame(resolve));

    document.querySelector('.formatting-picker-popover button')
      ?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(document.querySelector('.formatting-picker-popover')).not.toBeNull();

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(await promise).toBeUndefined();
  });

  it('closes a previously-open popover when a second one opens', async () => {
    const first = showPopover<string>(anchorEl(), () => {});
    const second = showPopover<string>(anchorEl(), () => {});

    expect(await first).toBeUndefined();
    expect(document.querySelectorAll('.formatting-picker-popover').length).toBe(1);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(await second).toBeUndefined();
  });
});
