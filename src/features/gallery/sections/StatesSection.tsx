import React, { useState } from 'react';
import { View } from 'react-native';
import { Inbox } from 'lucide-react-native';
import { Button, EmptyState, ErrorState, LoadingState, ProgressBar, Skeleton, StepProgress, useToast } from '@/components/ui';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

export function StatesSection() {
  const { colors, space } = useTheme();
  const toast = useToast();
  const [retrying, setRetrying] = useState(false);
  const [step, setStep] = useState(2);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      toast.show({ message: 'Still offline', tone: 'danger' });
    }, 1000);
  };

  return (
    <GalleryStack>
      <GalleryBlock title="Loading" note="Skeleton blocks shaped like the real layout. A spinner only for short, shapeless waits.">
        <LoadingState rows={3} />
        <View style={{ flexDirection: 'row', gap: space[3] }}>
          <Skeleton height={64} width={64} radius="md" />
          <View style={{ flex: 1, gap: space[2] }}>
            <Skeleton height={16} width="70%" radius="sm" />
            <Skeleton height={12} width="45%" radius="sm" />
            <Skeleton height={12} width="55%" radius="sm" />
          </View>
        </View>
        <LoadingState variant="spinner" label="Syncing…" />
      </GalleryBlock>

      <GalleryBlock title="Empty" note="An invitation, not an apology: title + one sentence + the next step.">
        <EmptyState
          title="No tickets yet."
          body="Browse what is on this week and register in one tap."
          actionLabel="Explore"
          onAction={() => toast.show('Explore')}
        />
        <EmptyState
          align="center"
          icon={<Inbox size={28} color={colors.textTertiary} />}
          title="Inbox is clear"
          body="Announcements and mentions will show up here."
        />
      </GalleryBlock>

      <GalleryBlock title="Error" note="Say what happened and what to do. The retry button shows its own loading state.">
        <ErrorState onRetry={retry} retrying={retrying} />
        <ErrorState
          align="center"
          title="Could not load events"
          message="Check your connection."
          retryLabel="Retry"
          onRetry={retry}
          retrying={retrying}
        />
      </GalleryBlock>

      <GalleryBlock title="Progress" note="Secondary ink by default; accent past the urgency threshold. Mono caption.">
        <ProgressBar value={0.42} label="42/100" />
        <ProgressBar value={0.85} accentFrom={0.8} label="85/100 · almost full" />
        <ProgressBar value={0.6} size="thin" />
      </GalleryBlock>

      <GalleryBlock title="Step progress" note="Wizard / onboarding: counter + label over a 3pt animated track.">
        <StepProgress step={step} total={4} label="Details" />
        <View style={{ flexDirection: 'row', gap: space[2] }}>
          <Button title="Back" variant="secondary" size="sm" fullWidth={false} onPress={() => setStep((s) => Math.max(1, s - 1))} />
          <Button title="Next" size="sm" fullWidth={false} onPress={() => setStep((s) => Math.min(4, s + 1))} />
        </View>
      </GalleryBlock>
    </GalleryStack>
  );
}
