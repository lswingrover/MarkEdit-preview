// @vitest-environment happy-dom
import { describe, it, expect, beforeEach } from 'vitest';
import { pickAlertType, ALERT_TYPES } from '../src/shared/alertPicker';

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('pickAlertType', () => {
  it('renders one option per alert type plus a Cancel button', () => {
    void pickAlertType();
    const options = document.querySelectorAll('.alert-picker-option');
    expect(options.length).toBe(ALERT_TYPES.length);
    expect(document.querySelector('.alert-picker-cancel')).not.toBeNull();
  });

  it('renders each option using the real .markdown-alert-* classes and title text', () => {
    void pickAlertType();
    const previews = document.querySelectorAll('.alert-picker-preview');
    const classes = Array.from(previews).map(el => el.className);
    for (const type of ALERT_TYPES) {
      expect(classes.some(c => c.includes(`markdown-alert-${type.toLowerCase()}`))).toBe(true);
    }
    expect(document.querySelector('.alert-picker-preview .markdown-alert-title')?.textContent).toContain('Note');
  });

  it('resolves the clicked type', async () => {
    const promise = pickAlertType();
    const options = document.querySelectorAll<HTMLElement>('.alert-picker-option');
    const tipOption = Array.from(options).find(el => el.textContent?.includes('Tip'));
    tipOption?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(await promise).toBe('TIP');
  });

  it('resolves undefined when Cancel is clicked', async () => {
    const promise = pickAlertType();
    document.querySelector('.alert-picker-cancel')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(await promise).toBeUndefined();
  });

  it('resolves undefined on Escape', async () => {
    const promise = pickAlertType();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(await promise).toBeUndefined();
  });
});
