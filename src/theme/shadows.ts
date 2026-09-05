import type { ViewStyle } from 'react-native';

/**
 * Shadow policy: cards do NOT get shadows — they get a hairline `border`.
 * Shadows are reserved for things that genuinely float above content:
 * sticky CTA bars, floating mini players, toasts, bottom sheets.
 *
 * Note for Android: `elevation` is part of the spread. If you need a stronger
 * elevation, set it AFTER spreading (`{ ...float, elevation: 12 }`).
 */
export const float: ViewStyle = {
  shadowColor: '#0A0A0E',
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 8 },
  elevation: 8,
};

export const shadows = {
  none: {} as ViewStyle,
  float,
} as const;

export type ShadowKey = keyof typeof shadows;
