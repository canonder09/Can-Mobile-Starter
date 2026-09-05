import React from 'react';
import { useRouter } from 'expo-router';
import { EmptyState, Header, Screen } from '@/components/ui';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <Screen header={<Header title="Not found" onBack={() => router.replace('/')} />}>
      <EmptyState
        title="This screen does not exist."
        body="The link may be outdated. Head back to the start."
        actionLabel="Go home"
        onAction={() => router.replace('/')}
      />
    </Screen>
  );
}
