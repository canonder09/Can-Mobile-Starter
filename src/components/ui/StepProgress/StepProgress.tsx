import React, { useEffect } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type StepProgressProps = {
  /** 1-based current step. */
  step: number;
  total: number;
  /** Step name, rendered uppercase after the counter. */
  label?: string;
  style?: StyleProp<ViewStyle>;
};

/** Onboarding / wizard progress: "2 / 4 · DETAILS" over a 3pt animated track. */
export function StepProgress({ step, total, label, style }: StepProgressProps) {
  const { colors, radius, space, motion } = useTheme();
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(Math.max(step, 1), total);
  const ratio = total > 0 ? clamped / total : 0;
  const progress = useSharedValue(ratio);

  useEffect(() => {
    progress.value = reduceMotion
      ? ratio
      : withTiming(ratio, { duration: motion.duration.base, easing: motion.easeOut });
  }, [ratio, reduceMotion, progress, motion]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${progress.value * 100}%` }));

  const caption = label ? `${clamped} / ${total} · ${label.toLocaleUpperCase()}` : `${clamped} / ${total}`;

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: clamped }}
      style={[{ gap: space[2] }, style]}
    >
      <Text variant="caption" color="textTertiary">
        {caption}
      </Text>
      <View style={{ height: 3, backgroundColor: colors.border, borderRadius: radius.pill, overflow: 'hidden' }}>
        <Animated.View
          style={[{ height: 3, borderRadius: radius.pill, backgroundColor: colors.primary }, fillStyle]}
        />
      </View>
    </View>
  );
}
