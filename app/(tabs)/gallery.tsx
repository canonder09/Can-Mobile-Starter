import React from 'react';
import { useRouter } from 'expo-router';
import { Header, ListItem, Screen, Text } from '@/components/ui';
import { gallerySections } from '@/features/gallery/registry';
import { useTheme } from '@/theme';

/** Index of the UI gallery. Each row pushes a section on the root stack. */
export default function GalleryIndexScreen() {
  const router = useRouter();
  const { space } = useTheme();

  return (
    <Screen
      gap={0}
      padded={false}
      header={<Header variant="display" title="Gallery" subtitle={`${gallerySections.length} sections`} />}
    >
      <Text variant="body" color="textSecondary" style={{ paddingHorizontal: space[5], marginBottom: space[3] }}>
        Every primitive in the design system, rendered in both color schemes. Use it to compare a
        new app with the reference look.
      </Text>
      {gallerySections.map((section, i) => (
        <ListItem
          key={section.key}
          inset
          title={section.title}
          subtitle={section.description}
          chevron
          divider={i < gallerySections.length - 1}
          onPress={() => router.push(`/gallery/${section.key}`)}
        />
      ))}
    </Screen>
  );
}
