import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/theme';

export type IconButtonVariant = 'tonal' | 'ghost' | 'primary' | 'overlay';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonProps = {
  /** The icon element, e.g. `<Settings size={18} color={colors.textPrimary} />`. */
  children: React.ReactNode;
  /** Required: icon-only controls need a spoken name. */
  label: string;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  /** Small accent dot (unread / attention). */
  dot?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const SIZE: Record<IconButtonSize, number> = { sm: 36, md: 40, lg: 44 };

/**
 * Round icon button.
 *  - `tonal`   surfaceSecondary disc (header actions)
 *  - `ghost`   no background (inline actions)
 *  - `primary` ink disc (rare, emphasised action)
 *  - `overlay` blurred glass disc for use on top of images
 */
export function IconButton({
  children,
  label,
  onPress,
  variant = 'tonal',
  size = 'md',
  disabled = false,
  dot = false,
  style,
  testID,
}: IconButtonProps) {
  const { colors, motion, isDark } = useTheme();
  const px = SIZE[size];

  const background: Record<IconButtonVariant, string> = {
    tonal: colors.surfaceSecondary,
    ghost: 'transparent',
    primary: colors.primary,
    overlay: 'transparent',
  };

  const disc: ViewStyle = {
    width: px,
    height: px,
    borderRadius: px / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: background[variant],
  };

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        disc,
        disabled && { opacity: motion.opacity.disabled },
        pressed && !disabled && { opacity: motion.press.iconOpacity },
        style,
      ]}
    >
      {variant === 'overlay' ? (
        <BlurView
          intensity={50}
          tint={isDark ? 'dark' : 'light'}
          style={{
            flex: 1,
            alignSelf: 'stretch',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.glass,
          }}
        >
          {children}
        </BlurView>
      ) : (
        children
      )}
      {dot ? (
        <View
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: colors.accent,
            borderWidth: 1.5,
            borderColor: variant === 'primary' ? colors.primary : colors.surfaceSecondary,
          }}
        />
      ) : null}
    </Pressable>
  );
}
