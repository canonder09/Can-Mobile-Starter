import React from 'react';
import {
  Platform,
  ScrollView,
  View,
  type RefreshControlProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, type SpaceKey } from '@/theme';

export type ScreenProps = {
  children: React.ReactNode;
  /** Header element (usually `<Header />`). Owns the top safe-area inset. */
  header?: React.ReactNode;
  /** Sticky bottom element (usually `<StickyFooter />`). */
  footer?: React.ReactNode;
  /** Wrap children in a ScrollView (default). Use `false` for FlatList screens. */
  scroll?: boolean;
  /** Use a keyboard-aware scroll view (forms). Implies `scroll`. */
  keyboard?: boolean;
  /** Horizontal screen padding (default). Disable for edge-to-edge lists. */
  padded?: boolean;
  /** Add the status-bar inset when there is no header (default). */
  safeTop?: boolean;
  /** Gap between direct children (`0` when children manage their own rhythm). */
  gap?: SpaceKey | 0;
  refreshControl?: React.ReactElement<RefreshControlProps>;
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Screen wrapper: background color, safe-area handling via insets (not
 * SafeAreaView, so media can run under the status bar when needed), scroll
 * container with the standard padding rhythm and keyboard behavior.
 */
export function Screen({
  children,
  header,
  footer,
  scroll = true,
  keyboard = false,
  padded = true,
  safeTop = true,
  gap = 3,
  refreshControl,
  contentStyle,
  style,
  testID,
}: ScreenProps) {
  const { colors, space, screenPad } = useTheme();
  const insets = useSafeAreaInsets();

  const topPad = header ? space[3] : safeTop ? insets.top + space[3] : space[3];
  const bottomPad = footer ? space[4] : space[8] + insets.bottom;

  const content: ViewStyle = {
    paddingTop: topPad,
    paddingBottom: bottomPad,
    paddingHorizontal: padded ? screenPad : 0,
    gap: gap === 0 ? 0 : space[gap],
  };

  let body: React.ReactNode;
  if (keyboard) {
    body = (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[content, contentStyle]}
        bottomOffset={space[6]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        {children}
      </KeyboardAwareScrollView>
    );
  } else if (scroll) {
    body = (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[content, contentStyle]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        showsVerticalScrollIndicator={false}
        refreshControl={refreshControl}
      >
        {children}
      </ScrollView>
    );
  } else {
    body = <View style={[{ flex: 1 }, content, contentStyle]}>{children}</View>;
  }

  return (
    <View testID={testID} style={[{ flex: 1, backgroundColor: colors.background }, style]}>
      {header}
      {body}
      {footer}
    </View>
  );
}

export type StickyFooterProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Bottom action bar: surface, top hairline, float shadow, safe-area aware.
 * Put the primary CTA here on decision screens.
 */
export function StickyFooter({ children, style }: StickyFooterProps) {
  const { colors, space, screenPad, float } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          paddingTop: space[3],
          paddingHorizontal: screenPad,
          paddingBottom: Math.max(insets.bottom, space[3]) + space[2],
          backgroundColor: colors.surface,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          gap: space[2],
          ...float,
          // Android: must come after the spread or it is silently overridden.
          elevation: 12,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
