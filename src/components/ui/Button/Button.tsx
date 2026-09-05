import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useTheme, type ColorToken } from '@/theme';
import { Text } from '../Text';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  /** Stretch to the container width (default). Set false for inline buttons. */
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
};

const SIZE: Record<ButtonSize, { minHeight: number; paddingH: 4 | 5 | 6; variant: 'sub' | 'bodyMedium' }> = {
  sm: { minHeight: 40, paddingH: 4, variant: 'sub' },
  md: { minHeight: 50, paddingH: 6, variant: 'bodyMedium' },
  lg: { minHeight: 56, paddingH: 6, variant: 'bodyMedium' },
};

/**
 * Pill button. `primary` is filled with `colors.primary` (ink by default —
 * the accent is reserved for status, see `theme/brand.ts`).
 */
export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = true,
  leftIcon,
  rightIcon,
  style,
  accessibilityLabel,
  testID,
}: ButtonProps) {
  const { colors, radius, space, motion } = useTheme();
  const dims = SIZE[size];
  const inactive = disabled || loading;

  const fill: Record<ButtonVariant, ViewStyle> = {
    primary: { backgroundColor: colors.primary },
    secondary: { backgroundColor: colors.surfaceSecondary },
    outline: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.textPrimary },
    ghost: { backgroundColor: 'transparent' },
    destructive: { backgroundColor: colors.danger },
  };

  const labelColor: Record<ButtonVariant, ColorToken> = {
    primary: 'onPrimary',
    secondary: 'textPrimary',
    outline: 'textPrimary',
    ghost: 'textPrimary',
    destructive: 'onAccent',
  };

  const spinnerColor = colors[labelColor[variant]];

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={({ pressed }) => [
        {
          minHeight: dims.minHeight,
          borderRadius: radius.pill,
          paddingHorizontal: space[dims.paddingH],
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: fullWidth ? 'stretch' : 'flex-start',
        },
        fill[variant],
        inactive && { opacity: motion.opacity.disabled },
        pressed && !inactive && { transform: [{ scale: motion.press.scale }] },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>
          {leftIcon}
          <Text variant={dims.variant} color={labelColor[variant]} align="center">
            {title}
          </Text>
          {rightIcon}
        </View>
      )}
    </Pressable>
  );
}
