import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from '../Button';
import { Text } from '../Text';

export type EmptyStateProps = {
  /** Sentence case, no sad faces: "No results for this filter." */
  title: string;
  /** One helpful sentence — where to go next. */
  body?: string;
  actionLabel?: string;
  onAction?: () => void;
  /** Optional glyph above the title (keep it monochrome). */
  icon?: React.ReactNode;
  /** `start` (default) matches list content; `center` for full-screen empties. */
  align?: 'start' | 'center';
  style?: StyleProp<ViewStyle>;
};

/** An empty screen is an invitation, not an apology. Title + sentence + CTA. */
export function EmptyState({
  title,
  body,
  actionLabel,
  onAction,
  icon,
  align = 'start',
  style,
}: EmptyStateProps) {
  const { space } = useTheme();
  const center = align === 'center';
  return (
    <View
      style={[
        {
          gap: space[3],
          paddingVertical: space[7],
          alignItems: center ? 'center' : 'flex-start',
        },
        style,
      ]}
    >
      {icon}
      <Text variant="title3" align={center ? 'center' : undefined}>
        {title}
      </Text>
      {body ? (
        <Text variant="body" color="textSecondary" align={center ? 'center' : undefined}>
          {body}
        </Text>
      ) : null}
      {actionLabel && onAction ? (
        <Button title={actionLabel} onPress={onAction} fullWidth={false} style={{ marginTop: space[1] }} />
      ) : null}
    </View>
  );
}
