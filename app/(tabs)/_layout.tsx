import React from 'react';
import type { ColorValue } from 'react-native';
import { Tabs } from 'expo-router/js-tabs';
import { House, LayoutGrid, Settings } from 'lucide-react-native';
import type { LucideIcon } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { hapticSelection } from '@/lib/haptics';
import { useTheme } from '@/theme';

const TAB_BAR_HEIGHT = 49;

function tabIcon(Icon: LucideIcon) {
  return function TabIcon({ color, focused }: { color: ColorValue; focused: boolean }) {
    return <Icon size={24} color={String(color)} strokeWidth={focused ? 2.25 : 1.75} />;
  };
}

/**
 * Tab bar visual language: opaque surface, 0.5pt top hairline, 24pt icons
 * (accent when active, tertiary when idle), caption labels, selection haptic.
 * Detail screens are pushed on the ROOT stack so the bar disappears there.
 */
export default function TabsLayout() {
  const { colors, type, space } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT + insets.bottom,
          paddingTop: space[1],
          backgroundColor: colors.surface,
          borderTopWidth: 0.5,
          borderTopColor: colors.border,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: type.caption.fontFamily,
          fontSize: type.caption.fontSize,
          letterSpacing: type.caption.letterSpacing,
        },
        sceneStyle: { backgroundColor: colors.background },
      }}
      screenListeners={{ tabPress: () => hapticSelection() }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon(House) }} />
      <Tabs.Screen name="gallery" options={{ title: 'Gallery', tabBarIcon: tabIcon(LayoutGrid) }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: tabIcon(Settings) }} />
    </Tabs>
  );
}
