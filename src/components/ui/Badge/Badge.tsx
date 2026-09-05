import React, { useEffect } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type BadgeTone =
  | 'neutral'
  | 'primary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline';

export type BadgeProps = {
  label: string;
  /**
   * - `neutral` secondary surface (default)
   * - `primary` ink fill — "today", "featured"
   * - `accent`  brand fill — "live", "new", counts
   * - `success` / `warning` / `danger` tinted status
   * - `outline` bordered, quiet — "sponsored", "beta"
   */
  tone?: BadgeTone;
  /** Small blinking dot before the label ("live"). */
  pulse?: boolean;
  /** Badges are uppercase by default; pass a locale tag when needed. */
  uppercase?: boolean | string;
  style?: StyleProp<ViewStyle>;
};

const PULSE_MS = 850;

export function Badge({ label, tone = 'neutral', pulse = false, uppercase = true, style }: BadgeProps) {
  const { colors, radius, space } = useTheme();
  const reduceMotion = useReducedMotion();
  const dotOpacity = useSharedValue(1);

  const palette: Record<BadgeTone, { bg: string; fg: string; border?: string; dot: string }> = {
    neutral: { bg: colors.surfaceSecondary, fg: colors.textSecondary, dot: colors.accent },
    primary: { bg: colors.primary, fg: colors.onPrimary, dot: colors.onPrimary },
    accent: { bg: colors.accent, fg: colors.onAccent, dot: colors.onAccent },
    success: { bg: colors.successMuted, fg: colors.success, dot: colors.success },
    warning: { bg: colors.warningMuted, fg: colors.warning, dot: colors.warning },
    danger: { bg: colors.dangerMuted, fg: colors.danger, dot: colors.danger },
    outline: { bg: colors.surface, fg: colors.textTertiary, border: colors.border, dot: colors.accent },
  };
  const look = palette[tone];

  useEffect(() => {
    if (!pulse || reduceMotion) {
      dotOpacity.value = 1;
      return;
    }
    dotOpacity.value = 0.55;
    dotOpacity.value = withRepeat(
      withSequence(withTiming(1, { duration: PULSE_MS }), withTiming(0.4, { duration: PULSE_MS })),
      -1,
      false
    );
    return () => cancelAnimation(dotOpacity);
  }, [pulse, reduceMotion, dotOpacity]);

  const dotStyle = useAnimatedStyle(() => ({ opacity: dotOpacity.value }));

  return (
    <View
      style={[
        {
          backgroundColor: look.bg,
          borderWidth: look.border ? 1 : 0,
          borderColor: look.border,
          paddingHorizontal: space[2],
          paddingVertical: 3,
          borderRadius: radius.sm,
          alignSelf: 'flex-start',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        },
        style,
      ]}
    >
      {pulse ? (
        <Animated.View
          style={[{ width: 6, height: 6, borderRadius: 3, backgroundColor: look.dot }, dotStyle]}
        />
      ) : null}
      <Text variant="caption" uppercase={uppercase} style={{ color: look.fg }}>
        {label}
      </Text>
    </View>
  );
}
