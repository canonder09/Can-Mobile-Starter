import React from 'react';
import { Modal as RNModal, Pressable, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  /** Actions / content. Stack `Button`s vertically; put the safe choice first. */
  children?: React.ReactNode;
  /** `bottom` (default) anchors the panel to the bottom edge; `center` floats it. */
  placement?: 'bottom' | 'center';
  /** Tap on the backdrop closes (default). Disable for blocking dialogs. */
  dismissOnBackdrop?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Lightweight dialog for confirmations. For scrollable or keyboard content
 * use `BottomSheet` instead.
 */
export function Modal({
  visible,
  onClose,
  title,
  description,
  children,
  placement = 'bottom',
  dismissOnBackdrop = true,
  style,
}: ModalProps) {
  const { colors, radius, space, screenPad } = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = placement === 'bottom';

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={dismissOnBackdrop ? onClose : undefined}
        accessibilityRole="none"
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: bottom ? 'flex-end' : 'center',
          padding: bottom ? 0 : screenPad,
        }}
      >
        {/* Inner Pressable swallows taps so the backdrop does not close on content taps. */}
        <Pressable
          accessibilityViewIsModal
          style={[
            {
              backgroundColor: colors.surface,
              borderRadius: bottom ? 0 : radius.xl,
              borderTopLeftRadius: radius.xl,
              borderTopRightRadius: radius.xl,
              padding: space[5],
              paddingBottom: bottom ? insets.bottom + space[5] : space[5],
              gap: space[3],
            },
            style,
          ]}
        >
          {title ? <Text variant="title2">{title}</Text> : null}
          {description ? (
            <Text variant="body" color="textSecondary">
              {description}
            </Text>
          ) : null}
          {children ? <View style={{ gap: space[2], marginTop: space[1] }}>{children}</View> : null}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
