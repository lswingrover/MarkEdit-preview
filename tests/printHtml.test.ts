import { describe, it, expect } from 'vitest';
import { buildPrintHtml, createNonce, printContentSecurityPolicy } from '../src/features/printHtml';

const nonce = 'abc123';

function styled(body: string, withMermaid = true) {
  const parts = [
    '<!doctype html><html lang="en"><head><meta charset="UTF-8" /></head><body>',
    `<div class="markdown-body">\n${body}\n</div>`,
    '<style>p{}</style>',
    '</body></html>',
  ];
  if (withMermaid) {
    parts.push('<script type="module">\n  import mermaid from "x";\n</script>');
  }
  return parts.join('\n');
}

describe('buildPrintHtml', () => {
  it('puts the CSP meta in the head before any document content', () => {
    const out = buildPrintHtml(styled('<p>hi</p>'), nonce);
    const cspIndex = out.indexOf('http-equiv="Content-Security-Policy"');
    expect(cspIndex).toBeGreaterThan(out.indexOf('<head>'));
    expect(cspIndex).toBeLessThan(out.indexOf('markdown-body'));
    expect(out).toContain(printContentSecurityPolicy(nonce));
  });

  it('nonces only the generator scripts, never scripts from the document', () => {
    const doc = '<script>alert(1)</script><script type="module">evil()</script></body>';
    const out = buildPrintHtml(styled(doc), nonce);
    const nonced = out.match(/<script[^>]*nonce="abc123"[^>]*>/g) ?? [];
    expect(nonced).toHaveLength(2); // auto-print + trailing Mermaid loader
    expect(out).toContain('<script>alert(1)</script>');
    expect(out).toContain('<script type="module">evil()</script>');
    expect(out.trimEnd().endsWith('import mermaid from "x";\n</script>')).toBe(true);
    // the print script lands before the generator's own closing body tag
    expect(out.indexOf('window.print()')).toBeGreaterThan(out.indexOf('<style>p{}</style>'));
  });

  it('works without the Mermaid loader (lite builds)', () => {
    const out = buildPrintHtml(styled('<p>x</p>', false), nonce);
    expect((out.match(/nonce="abc123"/g) ?? [])).toHaveLength(1);
  });
});

describe('printContentSecurityPolicy', () => {
  it('blocks scripts by default and allows only the nonce and the Mermaid CDN', () => {
    const csp = printContentSecurityPolicy(nonce);
    expect(csp).toContain("default-src 'none'");
    expect(csp).toContain("script-src 'nonce-abc123' https://cdn.jsdelivr.net/npm/mermaid@11/");
    expect(csp).not.toContain('unsafe-inline\'; script');
    expect(csp).not.toMatch(/script-src[^;]*unsafe/);
  });
});

describe('createNonce', () => {
  it('returns distinct 32-char hex values', () => {
    const a = createNonce();
    expect(a).toMatch(/^[0-9a-f]{32}$/);
    expect(createNonce()).not.toBe(a);
  });
});
