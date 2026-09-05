import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import { User } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { initials } from '@/utils/initials';
import { Text } from '../Text';

export type AvatarProps = {
  uri?: string | null;
  /** Used for the initials fallback and the accessibility label. */
  name?: string;
  size?: number;
  /** Accent ring — "something new here" signal. */
  ring?: boolean;
  /** `circle` for people, `rounded` for organisations / brands / apps. */
  shape?: 'circle' | 'rounded';
  style?: StyleProp<ViewStyle>;
};

export function Avatar({ uri, name, size = 36, ring = false, shape = 'circle', style }: AvatarProps) {
  const { colors, radius } = useTheme();
  const text = initials(name);
  const borderRadius = shape === 'circle' ? size / 2 : radius.md;

  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={name}
      style={[
        {
          width: size,
          height: size,
          borderRadius,
          borderWidth: ring ? 2 : 1,
          borderColor: ring ? colors.accent : colors.border,
          overflow: 'hidden',
          backgroundColor: colors.surfaceSecondary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" />
      ) : text ? (
        <Text variant={size >= 48 ? 'sub' : 'caption'} color="textSecondary">
          {text}
        </Text>
      ) : (
        <User size={size * 0.45} color={colors.textTertiary} />
      )}
    </View>
  );
}
