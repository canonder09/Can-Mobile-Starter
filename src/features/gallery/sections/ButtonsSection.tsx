import React, { useState } from 'react';
import { View } from 'react-native';
import { Heart, Plus, Settings, Share2, Trash2 } from 'lucide-react-native';
import { Button, IconButton, Text, useToast, type ButtonVariant } from '@/components/ui';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const VARIANTS: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'destructive'];

export function ButtonsSection() {
  const { colors, radius, space } = useTheme();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const simulate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.show({ message: 'Done', tone: 'success' });
    }, 1200);
  };

  return (
    <GalleryStack>
      <GalleryBlock title="Variants" note="Primary is ink-filled; the accent is not spent on buttons. Destructive uses danger.">
        {VARIANTS.map((v) => (
          <Button key={v} title={v[0].toUpperCase() + v.slice(1)} variant={v} onPress={() => toast.show(`${v} pressed`)} />
        ))}
      </GalleryBlock>

      <GalleryBlock title="Sizes" note="md (50pt) is the default. sm for inline actions, lg for a lone hero CTA.">
        <Button title="Small" size="sm" onPress={() => undefined} />
        <Button title="Medium" size="md" onPress={() => undefined} />
        <Button title="Large" size="lg" onPress={() => undefined} />
      </GalleryBlock>

      <GalleryBlock title="States">
        <Button title="Tap to load" loading={loading} onPress={simulate} />
        <Button title="Disabled" disabled onPress={() => undefined} />
        <Button title="Disabled secondary" variant="secondary" disabled onPress={() => undefined} />
      </GalleryBlock>

      <GalleryBlock title="With icons" row>
        <Button
          title="Save"
          fullWidth={false}
          leftIcon={<Heart size={16} color={colors.onPrimary} />}
          onPress={() => undefined}
        />
        <Button
          title="Share"
          variant="secondary"
          fullWidth={false}
          rightIcon={<Share2 size={16} color={colors.textPrimary} />}
          onPress={() => undefined}
        />
        <Button
          title="Delete"
          variant="destructive"
          size="sm"
          fullWidth={false}
          leftIcon={<Trash2 size={14} color={colors.onAccent} />}
          onPress={() => undefined}
        />
      </GalleryBlock>

      <GalleryBlock title="Icon buttons" note="tonal for header actions, ghost inline, primary for a single emphasised action, overlay on media." row>
        <IconButton label="Settings" onPress={() => undefined}>
          <Settings size={18} color={colors.textPrimary} />
        </IconButton>
        <IconButton label="Add" variant="ghost" onPress={() => undefined}>
          <Plus size={20} color={colors.textPrimary} />
        </IconButton>
        <IconButton label="Add to list" variant="primary" size="lg" onPress={() => undefined}>
          <Plus size={20} color={colors.onPrimary} />
        </IconButton>
        <IconButton label="Notifications" dot onPress={() => undefined}>
          <Settings size={18} color={colors.textPrimary} />
        </IconButton>
        <IconButton label="Disabled" disabled>
          <Settings size={18} color={colors.textPrimary} />
        </IconButton>
      </GalleryBlock>

      <GalleryBlock title="Overlay on media" note="Blurred glass discs keep controls readable on any image.">
        <View
          style={{
            height: 120,
            borderRadius: radius.lg,
            backgroundColor: colors.accentMuted,
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            padding: space[3],
            flexDirection: 'row',
            gap: space[2],
          }}
        >
          <View style={{ flex: 1 }}>
            <Text variant="caption" color="accentStrong">
              IMAGE AREA
            </Text>
          </View>
          <IconButton label="Save" variant="overlay" size="sm" onPress={() => undefined}>
            <Heart size={16} color={colors.textPrimary} />
          </IconButton>
          <IconButton label="Share" variant="overlay" size="sm" onPress={() => undefined}>
            <Share2 size={16} color={colors.textPrimary} />
          </IconButton>
        </View>
      </GalleryBlock>
    </GalleryStack>
  );
}
