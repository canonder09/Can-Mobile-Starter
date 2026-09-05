import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type DividerProps = {
  orientation?: 'horizontal' | 'vertical';
  /** Use the stronger border color (segment separators). */
  strong?: boolean;
  /** Indent horizontally by the screen padding. */
  inset?: boolean;
  /**
   * Labeled section divider ("TODAY", "EARLIER"). Renders an eyebrow with a
   * hairline underneath; safe to use as a sticky list header (opaque background).
   */
  label?: string;
  /** Slightly darker label — the "current" group. */
  emphasize?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Divider({
  orientation = 'horizontal',
  strong = false,
  inset = false,
  label,
  emphasize = false,
  style,
}: DividerProps) {
  const { colors, space, screenPad } = useTheme();
  const lineColor = strong ? colors.borderStrong : colors.border;

  if (orientation === 'vertical') {
    return <View style={[{ width: 1, height: 18, backgroundColor: lineColor }, style]} />;
  }

  if (label) {
    return (
      <View
        style={[
          {
            paddingTop: space[5],
            paddingBottom: space[2],
            paddingHorizontal: inset ? screenPad : 0,
            backgroundColor: colors.background,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.border,
            zIndex: 2,
          },
          style,
        ]}
      >
        <Text variant="caption" color={emphasize ? 'textSecondary' : 'textTertiary'} uppercase>
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        { height: 1, backgroundColor: lineColor, marginHorizontal: inset ? screenPad : 0 },
        style,
      ]}
    />
  );
}
