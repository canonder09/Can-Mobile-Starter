import React from 'react';
import { View } from 'react-native';
import { Avatar, Badge, Button, Card, Surface, Text, useToast } from '@/components/ui';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

export function CardsSection() {
  const { colors, space, radius } = useTheme();
  const toast = useToast();

  return (
    <GalleryStack>
      <GalleryBlock title="Outlined (default)" note="Surface + hairline border, radius lg. Cards never carry shadows.">
        <Card>
          <View style={{ gap: space[2] }}>
            <Badge label="Today" tone="primary" />
            <Text variant="title2">Team sync</Text>
            <Text variant="sub" color="textSecondary">
              10:00 · Room B · 6 going
            </Text>
          </View>
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Filled" note="Secondary surface, no border — banners, nested tiles, hints.">
        <Card variant="filled">
          <Text variant="bodyMedium">A new version is available.</Text>
          <Text variant="caption" color="textTertiary">
            Update from the store when convenient.
          </Text>
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Floating" note="Border + float shadow. Only for things that hover above content (mini player, sticky bars).">
        <Card variant="floating" padding={2}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
            <View style={{ width: 40, height: 40, borderRadius: radius.sm, backgroundColor: colors.accentMuted }} />
            <View style={{ flex: 1 }}>
              <Text variant="sub" numberOfLines={1}>
                Now playing · Morning show
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[1] }}>
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.accent }} />
                <Text variant="caption" color="textSecondary">
                  LIVE
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Pressable" note="onPress adds the standard 0.97 scale feedback.">
        <Card onPress={() => toast.show('Card pressed')} accessibilityLabel="Open project">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
            <Avatar name="Design System" shape="rounded" size={44} />
            <View style={{ flex: 1 }}>
              <Text variant="title3">Design system</Text>
              <Text variant="sub" color="textSecondary">
                Tap to open
              </Text>
            </View>
          </View>
        </Card>
        <Card dimmed>
          <Text variant="title3">Expired item</Text>
          <Text variant="sub" color="textSecondary">
            dimmed — still present, visibly inactive
          </Text>
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Media card" note="padding={0} lets the image bleed to the rounded edge; text sits below.">
        <Card padding={0}>
          <View style={{ height: 160, backgroundColor: colors.accentMuted, alignItems: 'flex-end', justifyContent: 'flex-end', padding: space[3] }}>
            <Badge label="Live" tone="accent" pulse />
          </View>
          <View style={{ padding: space[4], gap: space[2] }}>
            <Text variant="title2" numberOfLines={2}>
              Poster, product photo or map goes here
            </Text>
            <Text variant="sub" color="textSecondary">
              20:00 · Main hall
            </Text>
            <Button title="Register" size="sm" fullWidth={false} onPress={() => toast.show({ message: 'Registered', tone: 'success' })} />
          </View>
        </Card>
      </GalleryBlock>

      <GalleryBlock title="Surfaces" note="Plain themed boxes when a Card is too opinionated.">
        <Surface tone="surface" radius="md" bordered padding={4}>
          <Text variant="sub">surface · bordered</Text>
        </Surface>
        <Surface tone="secondary" radius="md" padding={4}>
          <Text variant="sub">secondary</Text>
        </Surface>
        <Surface tone="background" radius="md" bordered padding={4}>
          <Text variant="sub">background · bordered</Text>
        </Surface>
      </GalleryBlock>
    </GalleryStack>
  );
}
