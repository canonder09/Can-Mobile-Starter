/** 4pt base scale. Use `space[n]`, never arbitrary numbers, in layout code. */
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32,
  8: 40,
  9: 56,
} as const;

export type SpaceKey = keyof typeof space;

/** Horizontal screen edge padding — the same everywhere. */
export const screenPad = space[5];

/** Minimum touch target (Apple HIG / Material). */
export const hit = 44;

/** Vertical rhythm between major sections of a screen. */
export const sectionGap = space[7];
