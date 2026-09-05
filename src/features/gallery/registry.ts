import type { ComponentType } from 'react';
import { ButtonsSection } from './sections/ButtonsSection';
import { CardsSection } from './sections/CardsSection';
import { ColorsSection } from './sections/ColorsSection';
import { IdentitySection } from './sections/IdentitySection';
import { InputsSection } from './sections/InputsSection';
import { ListsSection } from './sections/ListsSection';
import { OverlaysSection } from './sections/OverlaysSection';
import { StatesSection } from './sections/StatesSection';
import { TypographySection } from './sections/TypographySection';

export type GallerySection = {
  key: string;
  title: string;
  description: string;
  Component: ComponentType;
  /** Render inside a keyboard-aware scroll view (sections with inputs). */
  keyboard?: boolean;
};

/**
 * Development-only reference gallery. Keep one entry per design-system area;
 * add an example whenever a primitive gains a variant.
 */
export const gallerySections: GallerySection[] = [
  { key: 'typography', title: 'Typography', description: 'Type roles, families, sizes', Component: TypographySection },
  { key: 'colors', title: 'Colors', description: 'Semantic tokens in the current scheme', Component: ColorsSection },
  { key: 'buttons', title: 'Buttons', description: 'Button variants, sizes, icon buttons', Component: ButtonsSection },
  { key: 'inputs', title: 'Inputs', description: 'Text fields, search, filter chips', Component: InputsSection, keyboard: true },
  { key: 'cards', title: 'Cards & surfaces', description: 'Card variants, media cards, surfaces', Component: CardsSection },
  { key: 'identity', title: 'Avatars, badges, chips', description: 'Small identity and status elements', Component: IdentitySection },
  { key: 'lists', title: 'Lists', description: 'List rows, dividers, section headers', Component: ListsSection },
  { key: 'states', title: 'States', description: 'Loading, empty, error, progress', Component: StatesSection },
  { key: 'overlays', title: 'Overlays', description: 'Modal, bottom sheet, toast, sticky footer', Component: OverlaysSection, keyboard: true },
];

export function getGallerySection(key: string | undefined): GallerySection | undefined {
  return gallerySections.find((s) => s.key === key);
}
