import React from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';
import { useTheme, type ColorToken, type TypeVariant } from '@/theme';

export type TextProps = RNTextProps & {
  /** Typography role — see `theme/typography.ts`. */
  variant?: TypeVariant;
  /** Semantic color token. */
  color?: ColorToken;
  align?: TextStyle['textAlign'];
  /**
   * Uppercase the (string) children. Pass a locale tag (e.g. `'tr-TR'`) for
   * languages where the default transform is wrong.
   */
  uppercase?: boolean | string;
};

/**
 * The only Text you should import. Applies font family, size, line height and
 * letter spacing from a role, and color from a token.
 */
export function Text({
  variant = 'body',
  color = 'textPrimary',
  align,
  uppercase,
  style,
  children,
  ...rest
}: TextProps) {
  const theme = useTheme();
  const role = theme.type[variant];
  const base: TextStyle = {
    ...role,
    color: theme.colors[color],
    textAlign: align,
  };
  const content =
    uppercase && typeof children === 'string'
      ? children.toLocaleUpperCase(typeof uppercase === 'string' ? uppercase : undefined)
      : children;

  return (
    <RNText allowFontScaling style={[base, style]} {...rest}>
      {content}
    </RNText>
  );
}
