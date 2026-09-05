import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@/theme';
import { Button } from '../Button';
import { Text } from '../Text';

export type ErrorStateProps = {
  title?: string;
  /** Plain-language cause + what to do: "Check your connection." */
  message?: string;
  retryLabel?: string;
  onRetry?: () => void;
  /** Whether a retry is in flight. */
  retrying?: boolean;
  align?: 'start' | 'center';
  style?: StyleProp<ViewStyle>;
};

/** Same skeleton as EmptyState; the button retries instead of navigating. */
export function ErrorState({
  title = 'Something went wrong',
  message = 'Check your connection and try again.',
  retryLabel = 'Try again',
  onRetry,
  retrying = false,
  align = 'start',
  style,
}: ErrorStateProps) {
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
      <Text variant="title3" align={center ? 'center' : undefined}>
        {title}
      </Text>
      <Text variant="body" color="textSecondary" align={center ? 'center' : undefined}>
        {message}
      </Text>
      {onRetry ? (
        <Button
          title={retryLabel}
          onPress={onRetry}
          loading={retrying}
          variant="secondary"
          fullWidth={false}
          style={{ marginTop: space[1] }}
        />
      ) : null}
    </View>
  );
}
