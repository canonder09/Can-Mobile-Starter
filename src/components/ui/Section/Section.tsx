import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme, type SpaceKey } from '@/theme';
import { Text } from '../Text';

export type SectionHeaderProps = {
  /** Eyebrow label; rendered uppercase. */
  title: string;
  /** Optional trailing action ("See all →"). */
  actionLabel?: string;
  onAction?: () => void;
  /** Indent by the screen padding (for edge-to-edge lists). */
  inset?: boolean;
  uppercase?: boolean | string;
  style?: StyleProp<ViewStyle>;
};

/** Eyebrow header: caption · tertiary · uppercase, with an optional "Label →". */
export function SectionHeader({
  title,
  actionLabel,
  onAction,
  inset = false,
  uppercase = true,
  style,
}: SectionHeaderProps) {
  const { space, screenPad } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: space[3],
          paddingHorizontal: inset ? screenPad : 0,
        },
        style,
      ]}
    >
      <Text variant="caption" color="textTertiary" uppercase={uppercase}>
        {title}
      </Text>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8} accessibilityRole="button">
          <Text variant="sub" color="textSecondary">
            {actionLabel} →
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export type SectionProps = Omit<SectionHeaderProps, 'style'> & {
  children: React.ReactNode;
  /** Gap between children (`0` for edge-to-edge rows with their own dividers). */
  gap?: SpaceKey | 0;
  style?: StyleProp<ViewStyle>;
};

/**
 * Eyebrow + content block. Sections are separated by `sectionGap` (32) —
 * place them inside a container with that gap, or stack with `marginBottom`.
 */
export function Section({ children, gap = 3, style, ...header }: SectionProps) {
  const { space } = useTheme();
  return (
    <View style={style}>
      <SectionHeader {...header} />
      <View style={{ gap: gap === 0 ? 0 : space[gap] }}>{children}</View>
    </View>
  );
}
