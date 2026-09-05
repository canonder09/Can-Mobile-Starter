import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { useTheme, type ColorToken } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const GROUPS: { title: string; note: string; tokens: ColorToken[] }[] = [
  {
    title: 'Surfaces',
    note: 'background < surface < surfaceSecondary. Overlay dims content behind sheets.',
    tokens: ['background', 'surface', 'surfaceSecondary', 'overlay'],
  },
  {
    title: 'Text',
    note: 'Three levels of ink plus the color for text on a primary fill.',
    tokens: ['textPrimary', 'textSecondary', 'textTertiary', 'onPrimary'],
  },
  { title: 'Borders', note: 'Hairlines on cards and rows; strong for segment separators.', tokens: ['border', 'borderStrong'] },
  { title: 'Primary', note: 'Filled buttons, selected chips, step progress.', tokens: ['primary', 'primaryPressed'] },
  {
    title: 'Accent (brand.ts)',
    note: 'Live badges, unread dots, active tab, thresholds. Replace in src/theme/brand.ts.',
    tokens: ['accent', 'accentPressed', 'accentMuted', 'accentStrong', 'onAccent'],
  },
  {
    title: 'Status',
    note: 'Solid for text/icons, muted for tinted backgrounds.',
    tokens: ['success', 'successMuted', 'warning', 'warningMuted', 'danger', 'dangerMuted'],
  },
];

function Swatch({ token }: { token: ColorToken }) {
  const { colors, radius, space } = useTheme();
  return (
    <View style={{ width: '48%', flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: radius.md,
          backgroundColor: colors[token],
          borderWidth: 1,
          borderColor: colors.border,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text variant="sub" numberOfLines={1}>
          {token}
        </Text>
        <Text variant="monoSmall" color="textTertiary" numberOfLines={1}>
          {colors[token]}
        </Text>
      </View>
    </View>
  );
}

export function ColorsSection() {
  const { space } = useTheme();
  return (
    <GalleryStack>
      {GROUPS.map((g) => (
        <GalleryBlock key={g.title} title={g.title} note={g.note}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[3], justifyContent: 'space-between' }}>
            {g.tokens.map((t) => (
              <Swatch key={t} token={t} />
            ))}
          </View>
        </GalleryBlock>
      ))}
    </GalleryStack>
  );
}
