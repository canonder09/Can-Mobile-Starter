import React from 'react';
import { ActivityIndicator, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Skeleton } from '../Skeleton';
import { Text } from '../Text';

export type LoadingStateProps = {
  /**
   * - `skeleton` (default) a few placeholder rows shaped like list content
   * - `spinner`  centered indicator — only for short, unknown-shape waits
   */
  variant?: 'skeleton' | 'spinner';
  /** Number of skeleton rows. */
  rows?: number;
  /** Height of each skeleton row. */
  rowHeight?: number;
  /** Spinner caption. */
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export function LoadingState({
  variant = 'skeleton',
  rows = 3,
  rowHeight = 76,
  label,
  style,
}: LoadingStateProps) {
  const { colors, space } = useTheme();

  if (variant === 'spinner') {
    return (
      <View
        accessibilityRole="progressbar"
        style={[{ paddingVertical: space[7], alignItems: 'center', gap: space[3] }, style]}
      >
        <ActivityIndicator color={colors.textTertiary} />
        {label ? (
          <Text variant="sub" color="textTertiary">
            {label}
          </Text>
        ) : null}
      </View>
    );
  }

  return (
    <View accessibilityRole="progressbar" style={[{ gap: space[3] }, style]}>
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} height={rowHeight} />
      ))}
    </View>
  );
}
