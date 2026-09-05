import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { clamp } from '@/utils/number';
import { Text } from '../Text';

export type ProgressBarProps = {
  /** 0..1 */
  value: number;
  /** Mono caption to the right/below ("42/60", "80%"). */
  label?: string;
  /** Above this ratio the fill switches to the accent color (urgency). */
  accentFrom?: number;
  /** `thin` 3pt track for step/onboarding style, `regular` 8pt for capacity. */
  size?: 'thin' | 'regular';
  style?: StyleProp<ViewStyle>;
};

export function ProgressBar({ value, label, accentFrom, size = 'regular', style }: ProgressBarProps) {
  const { colors, space, radius } = useTheme();
  const ratio = clamp(value, 0, 1);
  const pct = ratio * 100;
  const height = size === 'thin' ? 3 : 8;
  const useAccent = typeof accentFrom === 'number' && ratio >= accentFrom;
  const fill = useAccent ? colors.accent : colors.textSecondary;
  /** Keep the rounded cap intact at tiny values. */
  const width: `${number}%` | number = pct > 0 && pct < 6 ? height : `${pct}%`;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
      style={[{ gap: space[2] }, style]}
    >
      <View
        style={{
          height,
          backgroundColor: size === 'thin' ? colors.border : colors.surfaceSecondary,
          borderRadius: radius.pill,
          overflow: 'hidden',
        }}
      >
        <View style={{ width, height, backgroundColor: fill, borderRadius: radius.pill }} />
      </View>
      {label ? (
        <Text variant="monoSmall" color="textSecondary">
          {label}
        </Text>
      ) : null}
    </View>
  );
}
