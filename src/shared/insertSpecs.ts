/**
 * Single source of truth for the math (KaTeX) and mermaid insertion menus.
 * Both the preview toolbar (contentEditable) and the source toolbar
 * (CodeMirror) render their menus from these lists and insert the same
 * template bodies, so the two panes can never drift apart on what a given
 * menu entry produces.
 *
 * Delimiters: KaTeX math uses `$…$` (inline) / `$$…$$` (display), the
 * markedit-katex default and by far the most common MarkEdit configuration.
 * Mermaid uses a fenced ```mermaid block, which render.ts turns into a
 * `.mermaid` div on full builds (see the fence renderer rule there).
 */

export interface MathTemplate {
  /** Stable id, used as the picker option's data-id. */
  id: string;
  /** Human-readable menu label. */
  label: string;
  /** The LaTeX body, without delimiters. Also the selected placeholder. */
  latex: string;
  /** Display (`$$…$$`, block) vs inline (`$…$`). */
  display: boolean;
}

export const MATH_TEMPLATES: MathTemplate[] = [
  { id: 'inline', label: 'Inline math', latex: 'a^2 + b^2 = c^2', display: false },
  { id: 'display', label: 'Display math', latex: 'a^2 + b^2 = c^2', display: true },
  { id: 'fraction', label: 'Fraction', latex: '\\frac{a}{b}', display: true },
  { id: 'sqrt', label: 'Square root', latex: '\\sqrt{x}', display: true },
  { id: 'sum', label: 'Summation', latex: '\\sum_{i=1}^{n} i', display: true },
  { id: 'integral', label: 'Integral', latex: '\\int_{a}^{b} f(x)\\,dx', display: true },
  { id: 'matrix', label: 'Matrix', latex: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}', display: true },
];

export interface MermaidTemplate {
  id: string;
  label: string;
  /** The diagram body that goes inside the ```mermaid fence. */
  code: string;
}

export const MERMAID_TEMPLATES: MermaidTemplate[] = [
  {
    id: 'flowchart',
    label: 'Flowchart',
    code: ['graph TD', '  A[Start] --> B{Decision}', '  B -->|Yes| C[OK]', '  B -->|No| D[Stop]'].join('\n'),
  },
  {
    id: 'sequence',
    label: 'Sequence',
    code: ['sequenceDiagram', '  Alice->>Bob: Hello Bob', '  Bob-->>Alice: Hi Alice'].join('\n'),
  },
  {
    id: 'class',
    label: 'Class',
    code: ['classDiagram', '  class Animal {', '    +String name', '    +eat()', '  }', '  Animal <|-- Dog'].join('\n'),
  },
  {
    id: 'state',
    label: 'State',
    code: ['stateDiagram-v2', '  [*] --> Idle', '  Idle --> Running: start', '  Running --> [*]: stop'].join('\n'),
  },
  {
    id: 'er',
    label: 'Entity relationship',
    code: ['erDiagram', '  CUSTOMER ||--o{ ORDER : places', '  ORDER ||--|{ LINE_ITEM : contains'].join('\n'),
  },
  {
    id: 'gantt',
    label: 'Gantt',
    code: ['gantt', '  title Project', '  dateFormat YYYY-MM-DD', '  section Phase', '  Task A :a1, 2026-01-01, 7d'].join('\n'),
  },
  {
    id: 'pie',
    label: 'Pie chart',
    code: ['pie title Share', '  "A" : 40', '  "B" : 35', '  "C" : 25'].join('\n'),
  },
];

/** The full `$…$` / `$$…$$` string for a chosen math template body. */
export function mathMarkdown(latex: string, display: boolean): string {
  return display ? `$$${latex}$$` : `$${latex}$`;
}

/** The full ```mermaid fenced block for a chosen diagram body. */
export function mermaidMarkdown(code: string): string {
  return '```mermaid\n' + code + '\n```';
}
