import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useGenericKeyboardHandler } from 'react-native-keyboard-controller';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { hapticLight } from '@/lib/haptics';
import { Text } from '../Text';

const CLOSE_MS = 220;
/**
 * The backdrop fades faster than the panel slides. With equal timing the
 * dimming looks like it is sliding down with the panel; ending it early lets
 * the eye follow only the panel.
 */
const BACKDROP_CLOSE_MS = 130;

export type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  /**
   * Fires after the panel is really gone (Modal unmounted). Navigation and
   * native windows (share sheet, picker) must wait for this — see `useSheetAction`.
   */
  onClosed?: () => void;
  title?: string;
  children: React.ReactNode;
  maxHeight?: number | `${number}%`;
  /** Panel follows the keyboard (default). */
  keyboardAware?: boolean;
  /** Wrap content in a ScrollView (default). Disable for fixed-height content. */
  scroll?: boolean;
  /** Small grab handle at the top. */
  handle?: boolean;
  /** Light haptic on open (default). */
  haptic?: boolean;
  /**
   * `modal` (default) uses a native Modal. `inline` renders the sheet inside
   * the current tree — required when you are already inside a full-screen
   * Modal (nested native modals lock the screen on iOS).
   */
  presentation?: 'modal' | 'inline';
  style?: StyleProp<ViewStyle>;
};

/**
 * Backdrop fade + panel slide-up. On close the panel slides down first and the
 * Modal unmounts afterwards, so the exit never fights the fade.
 */
export function BottomSheet({
  visible,
  onClose,
  onClosed,
  title,
  children,
  maxHeight = '70%',
  keyboardAware = true,
  scroll = true,
  handle = false,
  haptic = true,
  presentation = 'modal',
  style,
}: BottomSheetProps) {
  const { colors, space, radius, motion } = useTheme();
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(visible);
  // Mount in the same render that turns `visible` on (state adjusted during
  // render, per the React docs) so the panel exists before the open animation.
  if (visible && !mounted) setMounted(true);

  /** 0 = open, 1 = closed (fraction of the panel height). */
  const progress = useSharedValue(1);
  const backdrop = useSharedValue(0);
  const panelH = useSharedValue(420);
  const keyboard = useSharedValue(0);

  useGenericKeyboardHandler(
    {
      onStart: (e) => {
        'worklet';
        if (keyboardAware) keyboard.value = e.height;
      },
      onMove: (e) => {
        'worklet';
        if (keyboardAware) keyboard.value = e.height;
      },
      onEnd: (e) => {
        'worklet';
        if (keyboardAware) keyboard.value = e.height;
      },
    },
    [keyboardAware]
  );

  const finishUnmount = useCallback(() => {
    setMounted(false);
    onClosed?.();
  }, [onClosed]);

  useEffect(() => {
    if (visible) {
      if (haptic) hapticLight();
      keyboard.value = 0;
      progress.value = reduceMotion ? 0 : 1;
      backdrop.value = 0;
      backdrop.value = withTiming(1, {
        duration: reduceMotion ? motion.duration.fast : 200,
        easing: Easing.out(Easing.cubic),
      });
      if (!reduceMotion) progress.value = withSpring(0, motion.sheetSpring);
      return;
    }

    if (!mounted) return;

    keyboard.value = withTiming(0, { duration: 120 });
    backdrop.value = withTiming(0, {
      duration: reduceMotion ? motion.duration.fast : BACKDROP_CLOSE_MS,
      easing: Easing.out(Easing.cubic),
    });
    progress.value = withTiming(
      1,
      { duration: reduceMotion ? motion.duration.fast : CLOSE_MS, easing: Easing.in(Easing.cubic) },
      (finished) => {
        if (finished) scheduleOnRN(finishUnmount);
      }
    );
  }, [visible, mounted, haptic, reduceMotion, motion, progress, backdrop, keyboard, finishUnmount]);

  const onPanelLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) panelH.value = h;
  };

  const backdropStyle = useAnimatedStyle(() => ({ opacity: backdrop.value }));

  const panelStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: progress.value * panelH.value - (keyboardAware ? keyboard.value : 0) },
    ],
  }));

  if (!mounted) return null;

  const body = (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View
        style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }, backdropStyle]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityRole="none" />
      </Animated.View>

      <Animated.View
        onLayout={onPanelLayout}
        accessibilityViewIsModal
        style={[
          styles.panel,
          {
            maxHeight,
            backgroundColor: colors.surface,
            borderTopLeftRadius: radius.xl,
            borderTopRightRadius: radius.xl,
            padding: space[5],
            paddingBottom: Math.max(insets.bottom, space[4]) + space[2],
          },
          style,
          panelStyle,
        ]}
      >
        {handle ? (
          <View
            style={{
              alignSelf: 'center',
              width: 36,
              height: 4,
              borderRadius: radius.pill,
              backgroundColor: colors.borderStrong,
              marginTop: -space[2],
              marginBottom: space[3],
            }}
          />
        ) : null}
        {title ? (
          <Text variant="title2" style={{ marginBottom: space[3] }}>
            {title}
          </Text>
        ) : null}
        {scroll ? (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={{ paddingBottom: space[2] }}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </Animated.View>
    </View>
  );

  if (presentation === 'inline') {
    return (
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {body}
      </View>
    );
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      navigationBarTranslucent={Platform.OS === 'android'}
    >
      {body}
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: 'flex-end' },
  panel: { width: '100%' },
});
