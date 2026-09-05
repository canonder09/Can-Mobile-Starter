import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ErrorState, Header, Screen } from '@/components/ui';
import { getGallerySection } from '@/features/gallery/registry';

/** Detail route for one gallery section. Pushed on the root stack (no tab bar). */
export default function GallerySectionScreen() {
  const router = useRouter();
  const { section: key } = useLocalSearchParams<{ section: string }>();
  const section = getGallerySection(key);

  if (!section) {
    return (
      <Screen header={<Header title="Gallery" onBack={() => router.back()} />}>
        <ErrorState title="Unknown section" message={`No gallery section named "${key}".`} retryLabel="Back" onRetry={() => router.back()} />
      </Screen>
    );
  }

  const Component = section.Component;
  return (
    <Screen
      gap={0}
      keyboard={section.keyboard}
      header={<Header title={section.title} subtitle={section.description} onBack={() => router.back()} />}
    >
      <Component />
    </Screen>
  );
}
