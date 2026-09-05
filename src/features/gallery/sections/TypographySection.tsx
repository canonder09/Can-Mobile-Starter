import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui';
import { useTheme, type TypeVariant } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const SAMPLES: { variant: TypeVariant; text: string; use: string }[] = [
  { variant: 'display', text: 'Discover', use: 'Tab-root headline' },
  { variant: 'title1', text: 'Winter concert 2026', use: 'Detail-screen title' },
  { variant: 'title2', text: 'Card title, sheet title', use: 'Two lines max' },
  { variant: 'title3', text: 'Row title · section title', use: 'Lists, empty states' },
  { variant: 'body', text: 'Body copy stays at 15/22 so paragraphs breathe on small phones.', use: 'Paragraphs' },
  { variant: 'bodyMedium', text: 'Button label · emphasized body', use: 'Buttons' },
  { variant: 'sub', text: 'Meta · 20:00 · Main hall', use: 'Meta lines, chips' },
  { variant: 'caption', text: 'EYEBROW LABEL', use: 'Badges, labels, tab titles' },
  { variant: 'monoLarge', text: '12 · 08:45', use: 'Big numerals' },
  { variant: 'monoSmall', text: 'ID 4F2A · 42/60', use: 'Units, counters' },
];

export function TypographySection() {
  const { type, space } = useTheme();
  return (
    <GalleryStack>
      <GalleryBlock
        title="Roles"
        note="Three families, one job each: Archivo for headlines, Inter for UI, JetBrains Mono for numbers. Use at most three roles per screen."
      >
        {SAMPLES.map((s) => {
          const role = type[s.variant];
          return (
            <View key={s.variant} style={{ gap: space[1] }}>
              <Text variant={s.variant} numberOfLines={2}>
                {s.text}
              </Text>
              <Text variant="monoSmall" color="textTertiary">
                {`${s.variant} · ${role.fontFamily} · ${role.fontSize}/${role.lineHeight} · ${role.letterSpacing}`}
              </Text>
              <Text variant="caption" color="textTertiary">
                {s.use}
              </Text>
            </View>
          );
        })}
      </GalleryBlock>

      <GalleryBlock title="Colors on text" note="Primary for content, secondary for meta, tertiary for placeholders and eyebrows.">
        <Text variant="body">textPrimary — the message</Text>
        <Text variant="body" color="textSecondary">
          textSecondary — the context
        </Text>
        <Text variant="body" color="textTertiary">
          textTertiary — the hint
        </Text>
        <Text variant="body" color="accent">
          accent — only for what is happening now
        </Text>
        <Text variant="body" color="danger">
          danger — validation and destructive copy
        </Text>
      </GalleryBlock>
    </GalleryStack>
  );
}
