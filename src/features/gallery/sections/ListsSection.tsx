import React, { useState } from 'react';
import { View } from 'react-native';
import { Bell, Globe, Lock } from 'lucide-react-native';
import { Avatar, Badge, Card, Divider, ListItem, SectionHeader, Text, useToast } from '@/components/ui';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const OPTIONS = ['System', 'Turkish', 'English'];

export function ListsSection() {
  const { colors, space } = useTheme();
  const toast = useToast();
  const [selected, setSelected] = useState('System');

  return (
    <GalleryStack>
      <GalleryBlock title="Rows" note="56pt minimum, hairline separators, leading and trailing slots. Rows are a list, not stacked cards.">
        <View>
          <ListItem
            leading={<Avatar name="Ada Lovelace" size={40} />}
            title="Ada Lovelace"
            subtitle="Sent you a message"
            meta="2 min ago"
            chevron
            onPress={() => toast.show('Row pressed')}
          />
          <ListItem
            leading={<Avatar name="Grace Hopper" size={40} ring />}
            title="Grace Hopper"
            subtitle="Joined the workspace"
            trailing={<Badge label="New" tone="accent" />}
            onPress={() => toast.show('Row pressed')}
          />
          <ListItem
            leading={<Bell size={20} color={colors.textSecondary} />}
            title="Notifications"
            subtitle="Push, email, digest"
            chevron
            onPress={() => toast.show('Row pressed')}
          />
          <ListItem
            leading={<Lock size={20} color={colors.textSecondary} />}
            title="Disabled row"
            subtitle="Not available on this plan"
            disabled
            chevron
            onPress={() => undefined}
          />
          <ListItem
            leading={<Globe size={20} color={colors.textSecondary} />}
            title="Static row"
            subtitle="No onPress, no chevron"
            trailing={
              <Text variant="sub" color="textTertiary">
                v1.0
              </Text>
            }
            divider={false}
          />
        </View>
      </GalleryBlock>

      <GalleryBlock title="Option list" note="Selected rows get the secondary surface. Use inside a sheet or a card.">
        <Card padding={0}>
          {OPTIONS.map((o, i) => (
            <ListItem
              key={o}
              inset
              title={o}
              selected={selected === o}
              trailing={
                selected === o ? (
                  <Text variant="sub" color="textTertiary">
                    ✓
                  </Text>
                ) : undefined
              }
              divider={i < OPTIONS.length - 1}
              onPress={() => setSelected(o)}
            />
          ))}
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Section header" note="Eyebrow + optional action. Sections are 32pt apart, header to content 12pt.">
        <SectionHeader title="This week" actionLabel="See all" onAction={() => toast.show('See all')} />
        <SectionHeader title="No action" />
      </GalleryBlock>

      <GalleryBlock title="Dividers">
        <Divider />
        <Divider strong />
        <View style={{ marginHorizontal: -space[5] }}>
          <Divider inset />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
          <Text variant="sub">Left</Text>
          <Divider orientation="vertical" strong />
          <Text variant="sub">Right</Text>
        </View>
        <View style={{ marginHorizontal: -space[5] }}>
          <Divider label="Today" emphasize inset />
          <ListItem inset title="Standup" subtitle="09:30 · Zoom" />
          <Divider label="Tomorrow" inset />
          <ListItem inset title="Design review" subtitle="14:00 · Studio" divider={false} />
        </View>
      </GalleryBlock>
    </GalleryStack>
  );
}
