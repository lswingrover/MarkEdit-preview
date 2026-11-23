/**
 * Build the page that "Print Rendered" opens in the default browser.
 *
 * The rendered document can carry raw HTML from the Markdown source, and the
 * page runs in a full browser tab from a file:// URL, so it is locked down with
 * a Content-Security-Policy: only scripts carrying this run's nonce (the
 * auto-print snippet and the styled-HTML Mermaid loader) and the pinned Mermaid
 * CDN path may execute. Scripts, inline event handlers, and javascript: URLs
 * embedded in the document are blocked, as are frames, plugins, form posts, and
 * fetch/XHR.
 */

const mermaidCdn = 'https://cdn.jsdelivr.net/npm/mermaid@11/';

export function createNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

export function printContentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'none'",
    `script-src 'nonce-${nonce}' ${mermaidCdn}`,
    "style-src 'unsafe-inline'",
    'img-src * data: blob: file:',
    'font-src * data: file:',
    'media-src * data: blob: file:',
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
}

/**
 * @param styledHtml Output of `applyStyles`, which starts with its own
 * `<head><meta charset="UTF-8" />` and ends with its own `</body>` and, in full
 * builds, a trailing `<script type="module">` Mermaid loader. Document content
 * sits in between, so the trusted markers are located from the edges (first
 * head, last body/script) and never inside the document.
 */
export function buildPrintHtml(styledHtml: string, nonce: string): string {
  const printScript = `<script nonce="${nonce}">window.addEventListener("load",()=>{window.print();});window.addEventListener("afterprint",()=>{window.close();});</script>`;

  let html = styledHtml;

  // Trust only the generator's own trailing Mermaid loader.
  const moduleTag = '<script type="module">';
  const moduleIndex = html.lastIndexOf(moduleTag);
  const bodyEndIndex = html.lastIndexOf('</body>');
  if (moduleIndex !== -1 && moduleIndex > bodyEndIndex) {
    html = html.slice(0, moduleIndex) + `<script type="module" nonce="${nonce}">` + html.slice(moduleIndex + moduleTag.length);
  }

  // Auto-print + self-close, before the generator's own closing </body>.
  const closeIndex = html.lastIndexOf('</body>');
  html = closeIndex === -1
    ? html + printScript
    : html.slice(0, closeIndex) + printScript + html.slice(closeIndex);

  // The CSP must precede every piece of document content.
  const csp = `<meta http-equiv="Content-Security-Policy" content="${printContentSecurityPolicy(nonce)}">`;
  const headIndex = html.indexOf('<head>');
  return headIndex === -1
    ? csp + html
    : html.slice(0, headIndex + 6) + csp + html.slice(headIndex + 6);
}
