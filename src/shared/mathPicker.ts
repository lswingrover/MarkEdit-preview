/**
 * Math (KaTeX) insertion menu — anchored to the toolbar's math button.
 * Resolves to the chosen MathTemplate, or undefined if cancelled. Used by
 * both the preview and source math actions so the choice behaves
 * identically on either pane.
 */

import { pickFromMenu, type MenuEntry } from './menuPicker';
import { MATH_TEMPLATES, mathMarkdown, type MathTemplate } from './insertSpecs';

export async function pickMathTemplate(): Promise<MathTemplate | undefined> {
  const entries: MenuEntry[] = MATH_TEMPLATES.map(t => ({
    id: t.id,
    label: t.label,
    hint: mathMarkdown(t.latex, t.display),
  }));

  const id = await pickFromMenu('math', entries);
  if (id === undefined) {return undefined;}
  return MATH_TEMPLATES.find(t => t.id === id);
}
