/**
 * Brand layer — the ONLY file you should need to touch to re-skin the starter.
 *
 * Everything else in the theme is neutral (backgrounds, ink, borders, status).
 * The accent is deliberately used sparingly: it marks "what is happening now"
 * (live badges, unread dots, selected tab, thresholds), not primary buttons.
 *
 * To rebrand:
 *   - change `accent*` values below (e.g. red → lime for a fitness app)
 *   - optionally set `primaryFollowsAccent = true` if your brand wants
 *     accent-colored primary buttons instead of ink-colored ones.
 */
export type BrandColors = {
  /** Main brand color — badges, active tab, unread dots, thresholds. */
  accent: string;
  /** Pressed / darker variant of the accent. */
  accentPressed: string;
  /** Low-opacity accent background (tint) for soft badges and highlights. */
  accentMuted: string;
  /** Text/icon color to use on top of `accentMuted` — must pass contrast. */
  accentStrong: string;
  /** Text/icon color to use on top of a solid `accent` fill. */
  onAccent: string;
};

export const brand: { light: BrandColors; dark: BrandColors } = {
  light: {
    accent: '#E5352B',
    accentPressed: '#C42A21',
    accentMuted: '#FFECEA',
    accentStrong: '#B0231B',
    onAccent: '#FFFFFF',
  },
  dark: {
    accent: '#FF5449',
    accentPressed: '#E5352B',
    accentMuted: '#2A1512',
    accentStrong: '#FF7A70',
    onAccent: '#0B0B0E',
  },
};

/**
 * When `false` (default) primary buttons are filled with `textPrimary` (ink):
 * the quiet, editorial look. When `true`, primary buttons use the accent.
 */
export const primaryFollowsAccent = false;
