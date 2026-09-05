import React, { useState } from 'react';
import {
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type InputProps = Omit<TextInputProps, 'style'> & {
  /** Small label rendered above the field. */
  label?: string;
  /** Helper text below the field (hidden while `error` is set). */
  hint?: string;
  /** Error message below the field; also colors the border. */
  error?: string;
  /** Element rendered inside the field, on the left (e.g. an icon). */
  leftAccessory?: React.ReactNode;
  /** Element rendered inside the field, on the right (e.g. a show/hide toggle). */
  rightAccessory?: React.ReactNode;
  /** Ref to the underlying TextInput (focus chaining). */
  ref?: React.Ref<TextInput>;
  /** Style for the outer wrapper (label + field + messages). */
  style?: StyleProp<ViewStyle>;
  /** Style for the field box itself. */
  fieldStyle?: StyleProp<ViewStyle>;
};

/**
 * Text field: secondary surface, hairline border, `md` radius, 48pt tall.
 * Focus strengthens the border; error turns it `danger`.
 */
export function Input({
  label,
  hint,
  error,
  leftAccessory,
  rightAccessory,
  ref,
  style,
  fieldStyle,
  multiline,
  editable = true,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const { colors, radius, space, fonts, inputFontSize, motion } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error ? colors.danger : focused ? colors.borderStrong : colors.border;

  return (
    <View style={[{ gap: space[2] }, style]}>
      {label ? (
        <Text variant="caption" color="textTertiary">
          {label}
        </Text>
      ) : null}
      <View
        style={[
          {
            minHeight: multiline ? 96 : 48,
            borderRadius: radius.md,
            borderWidth: 1,
            borderColor,
            backgroundColor: colors.surfaceSecondary,
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            paddingHorizontal: space[4],
            gap: space[2],
            opacity: editable ? 1 : motion.opacity.disabled,
          },
          fieldStyle,
        ]}
      >
        {leftAccessory}
        <TextInput
          ref={ref}
          editable={editable}
          multiline={multiline}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.textPrimary}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={{
            flex: 1,
            minHeight: multiline ? 96 - 2 : 48 - 2,
            paddingVertical: multiline ? space[3] : 0,
            color: colors.textPrimary,
            fontFamily: fonts.ui,
            fontSize: inputFontSize,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          {...rest}
        />
        {rightAccessory}
      </View>
      {error ? (
        <Text variant="sub" color="danger">
          {error}
        </Text>
      ) : hint ? (
        <Text variant="sub" color="textTertiary">
          {hint}
        </Text>
      ) : null}
    </View>
  );
}
