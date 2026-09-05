/**
 * Corner radii.
 *  sm   badges, small thumbnails, tiny marks
 *  md   inputs, list thumbnails, icon tiles
 *  lg   cards, media, floating bars
 *  xl   bottom sheets, dialogs, detail-screen sheets
 *  pill buttons, chips, avatars, progress tracks
 */
export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export type RadiusKey = keyof typeof radius;
