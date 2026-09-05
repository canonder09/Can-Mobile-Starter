import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type RadiusKey, type SpaceKey } from '@/theme';

export type CardVariant = 'outlined' | 'filled' | 'floating';

export type CardProps = {
  children: React.ReactNode;
  /**
   * - `outlined` surface + hairline border (default; cards never get shadows)
   * - `filled`   secondary surface, no border (nested tiles, banners)
   * - `floating` surface + border + float shadow (mini players, sticky bars)
   */
  variant?: CardVariant;
  /** Padding token. Use `0` for media cards where the image bleeds to the edge. */
  padding?: SpaceKey | 0;
  radius?: RadiusKey;
  /** Makes the card pressable with the standard scale feedback. */
  onPress?: () => void;
  /** Faded look for expired / inactive items. */
  dimmed?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export function Card({
  children,
  variant = 'outlined',
  padding = 4,
  radius: radiusKey = 'lg',
  onPress,
  dimmed = false,
  accessibilityLabel,
  style,
  testID,
}: CardProps) {
  const { colors, radius, space, float, motion } = useTheme();

  const base: ViewStyle = {
    borderRadius: radius[radiusKey],
    padding: padding === 0 ? 0 : space[padding],
    overflow: padding === 0 ? 'hidden' : undefined,
    opacity: dimmed ? motion.opacity.dimmed : 1,
  };

  const look: Record<CardVariant, ViewStyle> = {
    outlined: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
    filled: { backgroundColor: colors.surfaceSecondary },
    floating: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, ...float },
  };

  if (!onPress) {
    return (
      <View testID={testID} style={[base, look[variant], style]}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        base,
        look[variant],
        pressed && { transform: [{ scale: motion.press.scale }] },
        style,
      ]}
    >
      {children}
    </Pressable>
  );
}
