import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

/**
 * Guard against the failure mode that silently broke Quick Look once already.
 *
 * The Quick Look host has no `require`, so `src/quicklook/shim.ts` supplies one.
 * The bundle is evaluated as a whole there, which means module-scope code for
 * features Quick Look never displays still runs — `src/sourceToolbar.ts` builds
 * a `new Compartment()` and a `Prec.highest(keymap.of(...))` at module scope.
 * If the shim is missing any of those names, module evaluation throws and the
 * ENTIRE bundle dies before `setUpQuickLook()` is reached. Quick Look then
 * falls back to the extension's own plain-source view, so markdown previews as
 * raw text with no error surfaced anywhere — which reads as a preference, not
 * a crash, and can go unnoticed indefinitely.
 *
 * So this test doesn't check the names someone remembered to list; it scans the
 * source tree for every runtime (non-type) import from a stubbed module and
 * requires the shim to cover each one. Adding a new CodeMirror value import
 * without extending the shim fails here instead of in Quick Look.
 */

const repoRoot = fileURLToPath(new URL('..', import.meta.url));
const SHIMMED_MODULES = ['@codemirror/state', '@codemirror/view', 'markedit-api'];

function sourceFiles(): string[] {
  const out: string[] = [join(repoRoot, 'main.ts')];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) { walk(full); } else if (extname(entry.name) === '.ts') { out.push(full); }
    }
  };
  walk(join(repoRoot, 'src'));
  return out;
}

/** Runtime (non-type) named imports per module, across the whole source tree. */
function requiredNames(): Map<string, Set<string>> {
  const found = new Map<string, Set<string>>(SHIMMED_MODULES.map(m => [m, new Set<string>()]));

  for (const file of sourceFiles()) {
    const code = readFileSync(file, 'utf8');
    const importRe = /import\s+(type\s+)?\{([\s\S]*?)\}\s*from\s*['"]([^'"]+)['"]/g;
    let match: RegExpExecArray | null;

    while ((match = importRe.exec(code)) !== null) {
      const [, typeOnly, clause, moduleId] = match;
      if (typeOnly !== undefined || !found.has(moduleId)) { continue; }

      for (const raw of clause.split(',')) {
        const spec = raw.trim();
        // Skip inline type specifiers (`type Foo`) and empty trailing entries.
        if (spec === '' || /^type\s/.test(spec)) { continue; }
        const name = spec.split(/\s+as\s+/)[0].trim();
        if (name !== '') { found.get(moduleId)?.add(name); }
      }
    }
  }

  return found;
}

/** Execute the compiled shim against a host with no `require`, and return it. */
function loadShim(): (id: string) => Record<string, unknown> {
  const shimSource = readFileSync(join(repoRoot, 'src/quicklook/shim.ts'), 'utf8');
  const { code } = transformSync(shimSource, {
    loader: 'ts',
    format: 'iife',
    target: 'es2020',
    sourcefile: 'shim.ts',
  });

  const host = globalThis as unknown as { require?: unknown };
  const previous = host.require;
  try {
    host.require = undefined;
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function(code)();
    const installed = host.require;
    expect(typeof installed).toBe('function');
    return installed as (id: string) => Record<string, unknown>;
  } finally {
    host.require = previous;
  }
}

describe('quick look require shim', () => {
  it('finds the runtime imports it is supposed to cover', () => {
    const names = requiredNames();
    // Sanity-check the scanner itself: if this ever goes empty the test below
    // would vacuously pass and stop guarding anything.
    expect(names.get('@codemirror/state')?.size ?? 0).toBeGreaterThan(0);
    expect(names.get('@codemirror/view')?.size ?? 0).toBeGreaterThan(0);
    expect([...(names.get('@codemirror/state') ?? [])]).toContain('Compartment');
  });

  it.each(SHIMMED_MODULES)('stubs every runtime import from %s', moduleId => {
    const shimRequire = loadShim();
    const stub = shimRequire(moduleId);
    const missing = [...(requiredNames().get(moduleId) ?? [])].filter(name => stub[name] === undefined);

    expect(
      missing,
      `${moduleId} imports are used at runtime but missing from src/quicklook/shim.ts: ${missing.join(', ')}. ` +
      'Anything evaluated at module scope will throw in Quick Look and kill the whole bundle.',
    ).toEqual([]);
  });

  it('exposes a constructible Compartment with of/reconfigure', () => {
    const state = loadShim()('@codemirror/state');
    const Compartment = state.Compartment as new () => { of: (x: unknown) => unknown; reconfigure: (x: unknown) => unknown };
    const instance = new Compartment();
    expect(typeof instance.of).toBe('function');
    expect(typeof instance.reconfigure).toBe('function');
    expect(() => instance.of([])).not.toThrow();
  });

  it('passes values through Prec so module-scope keymaps evaluate', () => {
    const state = loadShim()('@codemirror/state');
    const view = loadShim()('@codemirror/view');
    const Prec = state.Prec as { highest: <T>(x: T) => T };
    const keymap = view.keymap as { of: (x: unknown) => unknown };
    expect(() => Prec.highest(keymap.of([]))).not.toThrow();
  });

  it('returns an empty object for modules it does not stub', () => {
    expect(loadShim()('some/unstubbed/module')).toEqual({});
  });
});
