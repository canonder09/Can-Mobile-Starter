import React, { useState } from 'react';
import { Star } from 'lucide-react-native';
import { Avatar, Badge, Chip, type BadgeTone } from '@/components/ui';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const TONES: BadgeTone[] = ['neutral', 'primary', 'accent', 'success', 'warning', 'danger', 'outline'];

export function IdentitySection() {
  const { colors } = useTheme();
  const [active, setActive] = useState('One');

  return (
    <GalleryStack>
      <GalleryBlock title="Avatars" note="Initials fallback, icon fallback, accent ring for 'something new'. Rounded shape for organisations." row>
        <Avatar name="Ada Lovelace" size={28} />
        <Avatar name="Ada Lovelace" size={36} />
        <Avatar name="Grace Hopper" size={52} ring />
        <Avatar name="Alan Turing" size={72} />
        <Avatar size={44} />
        <Avatar name="Acme Studio" size={52} shape="rounded" />
      </GalleryBlock>

      <GalleryBlock title="Badges" note="Uppercase caption, radius sm. Accent only for what is happening now." row>
        {TONES.map((t) => (
          <Badge key={t} label={t} tone={t} />
        ))}
        <Badge label="Live" tone="accent" pulse />
        <Badge label="Today" tone="primary" pulse />
        <Badge label="mixed Case" uppercase={false} />
      </GalleryBlock>

      <GalleryBlock title="Chips" note="34pt pills. Active = ink; dot = quiet attention; icon = 'this one is different'." row>
        {['One', 'Two', 'Three'].map((c) => (
          <Chip key={c} label={c} active={active === c} onPress={() => setActive(c)} />
        ))}
        <Chip label="Unread" dot onPress={() => undefined} />
        <Chip label="Featured" icon={<Star size={13} color={colors.textSecondary} />} onPress={() => undefined} />
        <Chip label="Static" />
        <Chip label="Disabled" disabled />
      </GalleryBlock>
    </GalleryStack>
  );
}
