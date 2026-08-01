export type Mode = 'source' | 'preview';

export function currentMode(): Mode {
  if (cachedMode !== undefined) {
    return cachedMode;
  }

  try {
    // Default to 'preview', inverting upstream's default of 'source'.
    //
    // Upstream opens Quick Look on the raw source and relies on localStorage to
    // remember a toggle to the rendered view. But the Quick Look extension's
    // WebView gets no persistent localStorage — its store is empty on disk and
    // stays that way, so every write is silently dropped and every read misses.
    // Under upstream's default that means Quick Look shows unrendered markdown
    // on every preview, forever, and clicking Preview never sticks past the
    // window closing. Rendered markdown is the whole point of previewing a
    // `.md` file, so it's the default here; only an explicit stored 'source'
    // opts out (and still works within a session via the in-memory cache).
    cachedMode = localStorage.getItem(ModeCacheKey) === 'source' ? 'source' : 'preview';
  } catch {
    console.error('Failed to read quick look mode from localStorage');
    cachedMode = 'preview';
  }

  return cachedMode;
}

export function saveMode(mode: Mode) {
  cachedMode = mode;
  try {
    localStorage.setItem(ModeCacheKey, mode);
  } catch {
    console.error('Failed to write quick look mode to localStorage');
  }
}

let cachedMode: Mode | undefined;
const ModeCacheKey = 'ui.quicklook-mode';
