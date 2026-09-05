import React from 'react';
import { Pressable, TextInput, View, type StyleProp, type TextInputProps, type ViewStyle } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { useTheme } from '@/theme';

export type SearchInputProps = Omit<TextInputProps, 'style' | 'value' | 'onChangeText'> & {
  value: string;
  onChangeText: (value: string) => void;
  /** Called when the clear (×) button is pressed; defaults to `onChangeText('')`. */
  onClear?: () => void;
  clearLabel?: string;
  ref?: React.Ref<TextInput>;
  style?: StyleProp<ViewStyle>;
};

/**
 * 44pt search field with a leading magnifier and a trailing clear button.
 * Pair with `useDebouncedValue` for filtering.
 */
export function SearchInput({
  value,
  onChangeText,
  onClear,
  clearLabel = 'Clear search',
  ref,
  style,
  placeholder = 'Search',
  ...rest
}: SearchInputProps) {
  const { colors, radius, space, fonts } = useTheme();

  return (
    <View
      style={[
        {
          height: 44,
          borderRadius: radius.md,
          backgroundColor: colors.surfaceSecondary,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: space[3],
          flexDirection: 'row',
          alignItems: 'center',
          gap: space[2],
        },
        style,
      ]}
    >
      <Search size={18} color={colors.textTertiary} />
      <TextInput
        ref={ref}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        selectionColor={colors.textPrimary}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityRole="search"
        style={{
          flex: 1,
          color: colors.textPrimary,
          fontFamily: fonts.ui,
          fontSize: 15,
          paddingVertical: 0,
        }}
        {...rest}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={onClear ?? (() => onChangeText(''))}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
        >
          <X size={16} color={colors.textTertiary} />
        </Pressable>
      ) : null}
    </View>
  );
}
