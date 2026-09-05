import { Easing } from 'react-native-reanimated';

/**
 * Motion tokens. Few, consistent movements — nothing decorative.
 * Respect `useReducedMotion()`: transforms → opacity only, `duration.fast`.
 */
export const duration = {
  fast: 140,
  base: 240,
  slow: 380,
} as const;

/** "Out-expo" feel for enter/exit. */
export const easeOut = Easing.bezier(0.22, 1, 0.36, 1);

/** Press / release. */
export const spring = { damping: 18, stiffness: 220, mass: 0.9 } as const;

/** Layout changes, sheet settle. */
export const springSoft = { damping: 22, stiffness: 140 } as const;

/** Bottom sheet open. Tuned so the panel lands without overshoot. */
export const sheetSpring = { damping: 28, stiffness: 320, mass: 0.78 } as const;

/** Touch feedback values used by pressables. */
export const press = {
  /** Buttons, cards, chips. */
  scale: 0.97,
  /** Full-width list rows (scaling a wide row looks wrong). */
  rowOpacity: 0.85,
  /** Icon-only buttons. */
  iconOpacity: 0.7,
} as const;

export const opacity = {
  disabled: 0.45,
  dimmed: 0.65,
} as const;
