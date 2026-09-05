/**
 * Typography roles.
 *
 * Three families, each with one job:
 *  - display: a tight, poster-like grotesk for headlines only (>= 22pt, 700)
 *  - ui:      a neutral, highly legible grotesk for everything else
 *  - mono:    numbers/codes/timestamps only, never prose
 *
 * To swap fonts: change `fonts` here AND the loaded assets in `fonts.ts`.
 */
export const fonts = {
  display: 'Archivo_700Bold',
  ui: 'Inter_400Regular',
  uiMedium: 'Inter_500Medium',
  uiSemibold: 'Inter_600SemiBold',
  mono: 'JetBrainsMono_500Medium',
} as const;

export type FontKey = keyof typeof fonts;

export type TypeVariant =
  | 'display'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body'
  | 'bodyMedium'
  | 'sub'
  | 'caption'
  | 'monoLarge'
  | 'monoSmall';

export type TypeRole = {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export const typeRoles: Record<TypeVariant, TypeRole> = {
  /** Screen title, e.g. the tab root headline. */
  display: { fontFamily: fonts.display, fontSize: 32, lineHeight: 34, letterSpacing: -0.9 },
  /** Detail-screen title. */
  title1: { fontFamily: fonts.display, fontSize: 24, lineHeight: 28, letterSpacing: -0.6 },
  /** Card title, sheet title. */
  title2: { fontFamily: fonts.uiSemibold, fontSize: 18, lineHeight: 23, letterSpacing: -0.3 },
  /** Row title, section title, empty-state title. */
  title3: { fontFamily: fonts.uiSemibold, fontSize: 16, lineHeight: 21, letterSpacing: -0.2 },
  body: { fontFamily: fonts.ui, fontSize: 15, lineHeight: 22, letterSpacing: 0 },
  /** Button label, emphasized body. */
  bodyMedium: { fontFamily: fonts.uiMedium, fontSize: 15, lineHeight: 20, letterSpacing: 0 },
  /** Meta text, chip label, secondary row line. */
  sub: { fontFamily: fonts.uiMedium, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
  /** Eyebrow labels, badges, form labels — usually uppercase. */
  caption: { fontFamily: fonts.uiSemibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.4 },
  /** Big numerals (stats, codes). Line height is generous on purpose. */
  monoLarge: { fontFamily: fonts.mono, fontSize: 26, lineHeight: 34, letterSpacing: -0.5 },
  /** Small mono labels (units, counters). */
  monoSmall: { fontFamily: fonts.mono, fontSize: 10, lineHeight: 12, letterSpacing: 1 },
};

/** Input text is slightly larger than body to avoid iOS auto-zoom on focus. */
export const inputFontSize = 16;
