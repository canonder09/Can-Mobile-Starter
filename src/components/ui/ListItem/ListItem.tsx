import React from 'react';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type ListItemProps = {
  title: string;
  subtitle?: string;
  /** Third, quieter line (time, location, status). */
  meta?: string;
  /** Left slot: Avatar, icon tile, thumbnail. */
  leading?: React.ReactNode;
  /** Right slot: Badge, Switch, value text. Overrides `chevron`. */
  trailing?: React.ReactNode;
  /** Show a disclosure chevron (only when `onPress` is set). */
  chevron?: boolean;
  onPress?: () => void;
  /** Horizontal padding equal to the screen edge (for edge-to-edge lists). */
  inset?: boolean;
  /** Hairline separator under the row. */
  divider?: boolean;
  /** Marks the row as chosen (e.g. in an option list). */
  selected?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Full-width row: leading · title/subtitle/meta · trailing.
 * Rows are a list, not cards-in-a-list: hairline separators, no borders.
 */
export function ListItem({
  title,
  subtitle,
  meta,
  leading,
  trailing,
  chevron = false,
  onPress,
  inset = false,
  divider = true,
  selected = false,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}: ListItemProps) {
  const { colors, space, screenPad, motion } = useTheme();

  const body = (
    <>
      {leading}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="title3" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="sub" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
        {meta ? (
          <Text variant="caption" color="textTertiary" numberOfLines={1}>
            {meta}
          </Text>
        ) : null}
      </View>
      {trailing ??
        (chevron && onPress ? <ChevronRight size={18} color={colors.textTertiary} /> : null)}
    </>
  );

  const container: ViewStyle = {
    minHeight: 56,
    paddingVertical: space[3],
    paddingHorizontal: inset ? screenPad : 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: space[3],
    borderBottomWidth: divider ? 1 : 0,
    borderBottomColor: colors.border,
    backgroundColor: selected ? colors.surfaceSecondary : 'transparent',
    opacity: disabled ? motion.opacity.disabled : 1,
  };

  if (!onPress) {
    return (
      <View testID={testID} style={[container, style]}>
        {body}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ selected, disabled }}
      style={({ pressed }) => [container, pressed && { opacity: motion.press.rowOpacity }, style]}
    >
      {body}
    </Pressable>
  );
}
