import React from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight, Bell, Layers, Palette, Type } from 'lucide-react-native';
import {
  Badge,
  Button,
  Card,
  Header,
  IconButton,
  ListItem,
  Screen,
  Section,
  Text,
} from '@/components/ui';
import { useTheme } from '@/theme';

/**
 * Home is a placeholder that demonstrates screen composition:
 * display header → intro card → eyebrow sections → list rows.
 * Replace it with your product's first screen.
 */
export default function HomeScreen() {
  const router = useRouter();
  const { colors, space, sectionGap } = useTheme();

  return (
    <Screen
      gap={0}
      header={
        <Header
          variant="display"
          title="Starter"
          subtitle="Expo Router · design tokens · UI kit"
          trailing={
            <IconButton label="Notifications" dot onPress={() => router.push('/gallery/overlays')}>
              <Bell size={18} color={colors.textPrimary} />
            </IconButton>
          }
        />
      }
    >
      <View style={{ gap: sectionGap }}>
        <Card>
          <View style={{ gap: space[3] }}>
            <Badge label="Template" tone="primary" />
            <Text variant="title2">Quiet interface, loud content.</Text>
            <Text variant="body" color="textSecondary">
              Neutral surfaces, disciplined type and spacing, one accent used only for what is
              happening now. Duplicate this project, change the brand file, and start building.
            </Text>
            <Button
              title="Open the UI gallery"
              onPress={() => router.push('/gallery')}
              rightIcon={<ArrowRight size={16} color={colors.onPrimary} />}
            />
          </View>
        </Card>

        <Section title="What is inside">
          <ListItem
            leading={<Palette size={20} color={colors.textSecondary} />}
            title="Semantic tokens"
            subtitle="Colors, type, spacing, radius, shadows, motion"
            chevron
            onPress={() => router.push('/gallery/colors')}
          />
          <ListItem
            leading={<Type size={20} color={colors.textSecondary} />}
            title="Typography roles"
            subtitle="Display, titles, body, sub, caption, mono"
            chevron
            onPress={() => router.push('/gallery/typography')}
          />
          <ListItem
            leading={<Layers size={20} color={colors.textSecondary} />}
            title="Composable primitives"
            subtitle="Buttons, inputs, cards, lists, sheets, states"
            chevron
            divider={false}
            onPress={() => router.push('/gallery')}
          />
        </Section>

        <Section title="Next steps">
          <Card variant="filled">
            <Text variant="sub" color="textSecondary">
              Read AGENTS.md and docs/NEW_PROJECT_CHECKLIST.md before adding features. Keep
              domain components in src/features, and add data access under src/services.
            </Text>
          </Card>
        </Section>
      </View>
    </Screen>
  );
}
