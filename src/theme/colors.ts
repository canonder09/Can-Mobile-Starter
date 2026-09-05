import { brand, primaryFollowsAccent, type BrandColors } from './brand';

/**
 * Semantic color tokens. Components use these names only — never raw hex.
 *
 * Neutral values are intentionally cool-grey and low-contrast between layers:
 * the UI stays quiet so content (photos, posters, data) carries the color.
 */
export type ColorTokens = {
  // Surfaces
  background: string;
  surface: string;
  surfaceSecondary: string;
  overlay: string;
  /** Translucent fill under blur views (glass discs, glass chrome). */
  glass: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  /** Text/icon on top of a `primary` fill. */
  onPrimary: string;
  // Borders
  border: string;
  borderStrong: string;
  // Primary action fill (ink by default, accent if `primaryFollowsAccent`)
  primary: string;
  primaryPressed: string;
  // Brand accent (see brand.ts)
  accent: string;
  accentPressed: string;
  accentMuted: string;
  accentStrong: string;
  onAccent: string;
  // Status
  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  danger: string;
  dangerMuted: string;
};

export type ColorToken = keyof ColorTokens;

type NeutralPalette = Omit<
  ColorTokens,
  keyof BrandColors | 'primary' | 'primaryPressed'
>;

const lightNeutral: NeutralPalette = {
  background: '#F6F6F7',
  surface: '#FFFFFF',
  surfaceSecondary: '#F0F0F2',
  overlay: 'rgba(10,10,14,0.45)',
  glass: 'rgba(255,255,255,0.72)',
  textPrimary: '#101014',
  textSecondary: '#63636E',
  textTertiary: '#9C9CA6',
  onPrimary: '#FFFFFF',
  border: '#E7E7EA',
  borderStrong: '#D6D6DB',
  success: '#127A4B',
  successMuted: '#E6F5EE',
  warning: '#B26A00',
  warningMuted: '#FFF3E0',
  danger: '#C0271E',
  dangerMuted: '#FDECEA',
};

const darkNeutral: NeutralPalette = {
  background: '#0B0B0E',
  surface: '#17171B',
  surfaceSecondary: '#212127',
  overlay: 'rgba(0,0,0,0.6)',
  glass: 'rgba(20,20,24,0.55)',
  textPrimary: '#F5F5F7',
  textSecondary: '#A0A0AA',
  textTertiary: '#6C6C77',
  onPrimary: '#0B0B0E',
  border: '#26262C',
  borderStrong: '#33333B',
  success: '#3DD68C',
  successMuted: '#0F2A1E',
  warning: '#F5A524',
  warningMuted: '#2A1F0C',
  danger: '#FF5449',
  dangerMuted: '#2A1214',
};

function compose(neutral: NeutralPalette, b: BrandColors): ColorTokens {
  return {
    ...neutral,
    ...b,
    primary: primaryFollowsAccent ? b.accent : neutral.textPrimary,
    primaryPressed: primaryFollowsAccent ? b.accentPressed : neutral.textPrimary,
    onPrimary: primaryFollowsAccent ? b.onAccent : neutral.onPrimary,
  };
}

export const lightColors: ColorTokens = compose(lightNeutral, brand.light);
export const darkColors: ColorTokens = compose(darkNeutral, brand.dark);
