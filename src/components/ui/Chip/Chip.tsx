import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type ChipProps = {
  label: string;
  /** Selected: ink fill. Unselected: secondary surface. Never accent. */
  active?: boolean;
  onPress?: () => void;
  /** Quiet attention dot (unread, pending). */
  dot?: boolean;
  /** Small glyph before the label — marks a chip that does something different. */
  icon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/** 34pt pill filter chip. Lay them out in a horizontal ScrollView with `space[2]` gaps. */
export function Chip({ label, active = false, onPress, dot = false, icon, disabled = false, style, testID }: ChipProps) {
  const { colors, radius, space, motion } = useTheme();
  const bg = active ? colors.primary : colors.surfaceSecondary;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled || !onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled }}
      style={({ pressed }) => [
        {
          height: 34,
          paddingHorizontal: space[3],
          borderRadius: radius.pill,
          backgroundColor: bg,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? motion.opacity.disabled : 1,
        },
        pressed && !disabled && { transform: [{ scale: motion.press.scale }] },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {icon}
        <Text variant="sub" color={active ? 'onPrimary' : 'textSecondary'}>
          {label}
        </Text>
      </View>
      {dot ? (
        <View
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: colors.accent,
            borderWidth: 1.5,
            borderColor: bg,
          }}
        />
      ) : null}
    </Pressable>
  );
}
