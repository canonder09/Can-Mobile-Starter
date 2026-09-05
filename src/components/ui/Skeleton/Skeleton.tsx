import React from 'react';
import { View, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type RadiusKey } from '@/theme';

export type SkeletonProps = {
  height?: number;
  width?: DimensionValue;
  radius?: RadiusKey;
  style?: StyleProp<ViewStyle>;
};

/**
 * Static placeholder block in the secondary surface color. Compose a few to
 * mirror the real layout — never show a bare spinner for screen content.
 */
export function Skeleton({ height = 120, width, radius: radiusKey = 'lg', style }: SkeletonProps) {
  const { colors, radius } = useTheme();
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          height,
          width,
          backgroundColor: colors.surfaceSecondary,
          borderRadius: radius[radiusKey],
        },
        style,
      ]}
    />
  );
}
