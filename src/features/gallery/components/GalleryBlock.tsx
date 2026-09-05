import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { Text } from '@/components/ui';
import { useTheme } from '@/theme';

/** Labeled group inside a gallery section. */
export function GalleryBlock({
  title,
  note,
  children,
  row = false,
  style,
}: {
  title: string;
  /** Short usage note under the label. */
  note?: string;
  children: React.ReactNode;
  /** Lay children out in a wrapping row. */
  row?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const { space } = useTheme();
  return (
    <View style={[{ gap: space[3] }, style]}>
      <View style={{ gap: 2 }}>
        <Text variant="caption" color="textTertiary" uppercase>
          {title}
        </Text>
        {note ? (
          <Text variant="sub" color="textSecondary">
            {note}
          </Text>
        ) : null}
      </View>
      <View
        style={
          row
            ? { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: space[2] }
            : { gap: space[3] }
        }
      >
        {children}
      </View>
    </View>
  );
}

/** Vertical stack of blocks with the section rhythm. */
export function GalleryStack({ children }: { children: React.ReactNode }) {
  const { sectionGap } = useTheme();
  return <View style={{ gap: sectionGap }}>{children}</View>;
}
