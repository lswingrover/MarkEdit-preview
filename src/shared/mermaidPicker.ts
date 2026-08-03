/**
 * Mermaid diagram insertion menu — anchored to the toolbar's mermaid button.
 * Resolves to the chosen MermaidTemplate, or undefined if cancelled. Used by
 * both the preview and source mermaid actions so the choice behaves
 * identically on either pane.
 */

import { pickFromMenu, type MenuEntry } from './menuPicker';
import { MERMAID_TEMPLATES, type MermaidTemplate } from './insertSpecs';

export async function pickMermaidTemplate(): Promise<MermaidTemplate | undefined> {
  const entries: MenuEntry[] = MERMAID_TEMPLATES.map(t => ({ id: t.id, label: t.label }));

  const id = await pickFromMenu('mermaid', entries);
  if (id === undefined) {return undefined;}
  return MERMAID_TEMPLATES.find(t => t.id === id);
}
