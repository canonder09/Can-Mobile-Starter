import React from 'react';
import { ScrollView, View } from 'react-native';
import Constants from 'expo-constants';
import { Card, Chip, Header, ListItem, Screen, Section, Text, useToast } from '@/components/ui';
import { hapticError, hapticLight, hapticSuccess } from '@/lib/haptics';
import { useTheme, type SchemePreference } from '@/theme';

const SCHEMES: { key: SchemePreference; label: string }[] = [
  { key: 'system', label: 'System' },
  { key: 'light', label: 'Light' },
  { key: 'dark', label: 'Dark' },
];

export default function SettingsScreen() {
  const { preference, setPreference, isDark, space, sectionGap } = useTheme();
  const toast = useToast();
  const version = Constants.expoConfig?.version ?? '—';
  const env = process.env.EXPO_PUBLIC_APP_ENV ?? 'development';

  return (
    <Screen gap={0} header={<Header variant="display" title="Settings" subtitle={`Appearance · ${isDark ? 'dark' : 'light'}`} />}>
      <View style={{ gap: sectionGap }}>
        <Section title="Appearance">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[2] }}>
            {SCHEMES.map((s) => (
              <Chip key={s.key} label={s.label} active={preference === s.key} onPress={() => setPreference(s.key)} />
            ))}
          </ScrollView>
          <Text variant="sub" color="textTertiary">
            The preference is kept in memory in the starter. Persist it with AsyncStorage or your
            user profile when you add a service layer.
          </Text>
        </Section>

        <Section title="Feedback">
          <ListItem title="Light haptic" subtitle="Sheet open, favorite toggle" onPress={hapticLight} chevron />
          <ListItem
            title="Success haptic + toast"
            subtitle="Saved, submitted, registered"
            onPress={() => {
              hapticSuccess();
              toast.show({ message: 'Saved', tone: 'success' });
            }}
            chevron
          />
          <ListItem
            title="Error haptic + toast"
            subtitle="Validation, network failure"
            onPress={() => {
              hapticError();
              toast.show({ message: 'Could not save. Try again.', tone: 'danger' });
            }}
            chevron
            divider={false}
          />
        </Section>

        <Section title="About">
          <Card variant="filled">
            <View style={{ gap: space[1] }}>
              <Text variant="sub" color="textSecondary">Version {version}</Text>
              <Text variant="sub" color="textSecondary">Environment {env}</Text>
              <Text variant="sub" color="textSecondary">Expo SDK {Constants.expoConfig?.sdkVersion ?? '—'}</Text>
            </View>
          </Card>
        </Section>
      </View>
    </Screen>
  );
}
