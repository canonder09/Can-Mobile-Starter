import { darkColors, lightColors, type ColorToken, type ColorTokens } from './colors';
import { duration, easeOut, opacity, press, sheetSpring, spring, springSoft } from './motion';
import { radius, type RadiusKey } from './radius';
import { float, shadows, type ShadowKey } from './shadows';
import { hit, screenPad, sectionGap, space, type SpaceKey } from './spacing';
import { fonts, inputFontSize, typeRoles, type FontKey, type TypeRole, type TypeVariant } from './typography';

/** Scheme-independent tokens (everything except colors). */
export const tokens = {
  space,
  screenPad,
  sectionGap,
  hit,
  radius,
  shadows,
  float,
  fonts,
  type: typeRoles,
  inputFontSize,
  motion: { duration, easeOut, spring, springSoft, sheetSpring, press, opacity },
} as const;

export type Tokens = typeof tokens;

export { lightColors, darkColors };
export type {
  ColorToken,
  ColorTokens,
  FontKey,
  RadiusKey,
  ShadowKey,
  SpaceKey,
  TypeRole,
  TypeVariant,
};
