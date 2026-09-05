import React from 'react';
import { View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useTheme, type RadiusKey, type SpaceKey } from '@/theme';

export type SurfaceTone = 'background' | 'surface' | 'secondary';

export type SurfaceProps = ViewProps & {
  tone?: SurfaceTone;
  /** Corner radius token; omit for square. */
  radius?: RadiusKey;
  /** Hairline border. */
  bordered?: boolean;
  /** Uniform padding token. */
  padding?: SpaceKey;
  style?: StyleProp<ViewStyle>;
};

/**
 * Plain themed container. Use when you need a colored box that is not a
 * Card (no press behavior, no elevation rules) — sheets, bars, tiles.
 */
export function Surface({
  tone = 'surface',
  radius: radiusKey,
  bordered = false,
  padding,
  style,
  ...rest
}: SurfaceProps) {
  const { colors, radius, space } = useTheme();
  const background: Record<SurfaceTone, string> = {
    background: colors.background,
    surface: colors.surface,
    secondary: colors.surfaceSecondary,
  };

  return (
    <View
      style={[
        {
          backgroundColor: background[tone],
          borderRadius: radiusKey ? radius[radiusKey] : undefined,
          borderWidth: bordered ? 1 : 0,
          borderColor: colors.border,
          padding: padding ? space[padding] : undefined,
        },
        style,
      ]}
      {...rest}
    />
  );
}
