import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

export type HeaderProps = {
  title: string;
  /** One quiet line under the title — the most useful fact on the screen. */
  subtitle?: string;
  /**
   * - `display` 32pt tab-root headline
   * - `large`   24pt detail headline (default)
   * - `compact` 16pt single-line bar (secondary screens, modals)
   */
  variant?: 'display' | 'large' | 'compact';
  /** Renders a back button in the leading slot. */
  onBack?: () => void;
  backLabel?: string;
  /** Custom leading element (overrides the back button). */
  leading?: React.ReactNode;
  /** Right-side actions — usually one or two `IconButton`s. */
  trailing?: React.ReactNode;
  /** Add the status-bar inset on top (default). Disable inside modals/sheets. */
  safeTop?: boolean;
  /** Hairline under the header (default). */
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Screen header. Stack navigator headers are hidden in this starter; every
 * screen owns its header so the typography stays in the design language.
 */
export function Header({
  title,
  subtitle,
  variant = 'large',
  onBack,
  backLabel = 'Back',
  leading,
  trailing,
  safeTop = true,
  bordered = true,
  style,
}: HeaderProps) {
  const { colors, space, screenPad } = useTheme();
  const insets = useSafeAreaInsets();

  const lead =
    leading ??
    (onBack ? (
      <IconButton label={backLabel} onPress={onBack} size="sm">
        <ChevronLeft size={20} color={colors.textPrimary} />
      </IconButton>
    ) : null);

  const titleVariant = variant === 'display' ? 'display' : variant === 'large' ? 'title1' : 'title3';

  return (
    <View
      style={[
        {
          paddingTop: (safeTop ? insets.top : 0) + space[2],
          paddingHorizontal: screenPad,
          paddingBottom: space[3],
          backgroundColor: colors.background,
          borderBottomWidth: bordered ? 0.5 : 0,
          borderBottomColor: colors.border,
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[3],
        },
        style,
      ]}
    >
      {lead}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant={titleVariant} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text variant="sub" color="textSecondary" numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      {trailing ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[2] }}>{trailing}</View>
      ) : null}
    </View>
  );
}
