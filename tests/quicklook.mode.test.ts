// @vitest-environment happy-dom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const ModeCacheKey = 'ui.quicklook-mode';

// happy-dom 20.9.0 exposes `localStorage` as a bare object with no methods at
// all — not even getItem — so relying on the environment's own implementation
// made every test in this file throw in beforeEach. These are unit tests for
// mode.ts's logic, not for happy-dom's storage, so install a minimal in-memory
// Storage ourselves and stay independent of what the DOM shim does this week.
function installMemoryStorage() {
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => (map.has(key) ? (map.get(key) as string) : null),
    setItem: (key: string, value: string) => { map.set(key, String(value)); },
    removeItem: (key: string) => { map.delete(key); },
    clear: () => { map.clear(); },
    key: (index: number) => Array.from(map.keys())[index] ?? null,
    get length() { return map.size; },
  };

  for (const target of [globalThis, globalThis.window]) {
    if (target !== undefined && target !== null) {
      Object.defineProperty(target, 'localStorage', { configurable: true, value: storage });
    }
  }
}

beforeEach(() => {
  installMemoryStorage();
  localStorage.clear();
  vi.resetModules();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('currentMode', () => {
  // Fork behavior: the default is 'preview', inverting upstream's 'source'.
  // The Quick Look WebView has no persistent localStorage, so the stored value
  // is absent on essentially every real preview — which makes this default the
  // mode users actually get. See src/quicklook/mode.ts.
  it('returns "preview" by default', async () => {
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('preview');
  });

  it('returns "source" when localStorage explicitly holds "source"', async () => {
    localStorage.setItem(ModeCacheKey, 'source');
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('source');
  });

  it('returns "preview" when localStorage holds "preview"', async () => {
    localStorage.setItem(ModeCacheKey, 'preview');
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('preview');
  });

  it('treats any non-"source" value as "preview"', async () => {
    localStorage.setItem(ModeCacheKey, 'garbage');
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('preview');
  });

  it('caches the first read; later localStorage mutations are ignored', async () => {
    const { currentMode } = await import('../src/quicklook/mode');
    expect(currentMode()).toBe('preview');
    localStorage.setItem(ModeCacheKey, 'source');
    expect(currentMode()).toBe('preview');
  });

  it('falls back to "preview" when localStorage.getItem throws', async () => {
    const original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => { throw new Error('denied'); },
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
    });

    try {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { currentMode } = await import('../src/quicklook/mode');
      expect(currentMode()).toBe('preview');
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'localStorage', { configurable: true, value: original });
    }
  });
});

describe('saveMode', () => {
  it('updates the cache so subsequent currentMode() reflects it', async () => {
    const { currentMode, saveMode } = await import('../src/quicklook/mode');
    saveMode('preview');
    expect(currentMode()).toBe('preview');
  });

  it('persists the value to localStorage', async () => {
    const { saveMode } = await import('../src/quicklook/mode');
    saveMode('preview');
    expect(localStorage.getItem(ModeCacheKey)).toBe('preview');
  });

  it('updates the cache even when localStorage.setItem throws', async () => {
    const original = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      value: {
        getItem: () => null,
        setItem: () => { throw new Error('quota'); },
        removeItem: () => {},
        clear: () => {},
        key: () => null,
        length: 0,
      },
    });

    try {
      const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { currentMode, saveMode } = await import('../src/quicklook/mode');
      saveMode('preview');
      expect(currentMode()).toBe('preview');
      expect(errorSpy).toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, 'localStorage', { configurable: true, value: original });
    }
  });
});
