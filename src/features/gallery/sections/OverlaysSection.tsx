import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomSheet, Button, Card, Input, ListItem, Modal, StickyFooter, Text, useToast } from '@/components/ui';
import { useSheetAction } from '@/hooks/useSheetAction';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const OPTIONS = ['Public', 'Members only', 'Private'];

export function OverlaysSection() {
  const { space } = useTheme();
  const toast = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [centerOpen, setCenterOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState('Public');
  const { runAfterClose, onSheetClosed } = useSheetAction();

  return (
    <GalleryStack>
      <GalleryBlock title="Modal" note="Confirmations only. Safe choice first, destructive last. Bottom placement by default.">
        <Button title="Delete item…" variant="destructive" onPress={() => setConfirmOpen(true)} />
        <Button title="Centered dialog" variant="secondary" onPress={() => setCenterOpen(true)} />
      </GalleryBlock>

      <GalleryBlock title="Bottom sheet" note="Spring open, slide-down close. Follows the keyboard. Native windows must wait for onClosed.">
        <Button title="Sheet with form" onPress={() => setFormOpen(true)} />
        <Button title="Sheet with options" variant="secondary" onPress={() => setOptionsOpen(true)} />
        <Text variant="sub" color="textSecondary">
          {`Visibility: ${visibility}`}
        </Text>
      </GalleryBlock>

      <GalleryBlock title="Toast" note="Short confirmations, auto-dismiss, tap to close. Never for errors that need action.">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space[2] }}>
          <Button title="Neutral" size="sm" variant="secondary" fullWidth={false} onPress={() => toast.show('Link copied')} />
          <Button title="Success" size="sm" variant="secondary" fullWidth={false} onPress={() => toast.show({ message: 'Saved', tone: 'success' })} />
          <Button title="Danger" size="sm" variant="secondary" fullWidth={false} onPress={() => toast.show({ message: 'Upload failed', tone: 'danger' })} />
        </View>
      </GalleryBlock>

      <GalleryBlock title="Sticky footer" note="Pass to <Screen footer>. Surface, top hairline, float shadow, safe-area aware. Shown inline here.">
        <Card padding={0}>
          <View style={{ padding: space[4], gap: space[2] }}>
            <Text variant="title3">Decision screen content</Text>
            <Text variant="sub" color="textSecondary">
              The primary action stays visible while the content scrolls.
            </Text>
          </View>
          <StickyFooter style={{ paddingBottom: space[3] }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space[3] }}>
              <View style={{ flex: 1 }}>
                <Text variant="title3">Free</Text>
              </View>
              <Button title="Register" fullWidth={false} onPress={() => toast.show({ message: 'Registered', tone: 'success' })} />
            </View>
          </StickyFooter>
        </Card>
      </GalleryBlock>

      <Modal
        visible={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete this item?"
        description="This cannot be undone. The item disappears from every list it is in."
      >
        <Button title="Keep it" onPress={() => setConfirmOpen(false)} />
        <Button
          title="Delete"
          variant="destructive"
          onPress={() => {
            setConfirmOpen(false);
            toast.show({ message: 'Deleted', tone: 'danger' });
          }}
        />
      </Modal>

      <Modal
        visible={centerOpen}
        onClose={() => setCenterOpen(false)}
        placement="center"
        dismissOnBackdrop={false}
        title="Session expired"
        description="Sign in again to continue where you left off."
      >
        <Button title="Sign in" onPress={() => setCenterOpen(false)} />
        <Button title="Not now" variant="ghost" onPress={() => setCenterOpen(false)} />
      </Modal>

      <BottomSheet visible={formOpen} onClose={() => setFormOpen(false)} onClosed={onSheetClosed} title="Rename list" handle>
        <View style={{ gap: space[3] }}>
          <Input label="Name" placeholder="Weekend plans" value={name} onChangeText={setName} autoFocus returnKeyType="done" />
          <Button
            title="Save"
            onPress={() => {
              runAfterClose(() => toast.show({ message: name ? `Renamed to "${name}"` : 'Saved', tone: 'success' }));
              setFormOpen(false);
            }}
          />
          <Button title="Cancel" variant="ghost" onPress={() => setFormOpen(false)} />
        </View>
      </BottomSheet>

      <BottomSheet visible={optionsOpen} onClose={() => setOptionsOpen(false)} title="Who can see this?">
        <View>
          {OPTIONS.map((o, i) => (
            <ListItem
              key={o}
              title={o}
              selected={visibility === o}
              divider={i < OPTIONS.length - 1}
              trailing={
                visibility === o ? (
                  <Text variant="sub" color="textTertiary">
                    ✓
                  </Text>
                ) : undefined
              }
              onPress={() => {
                setVisibility(o);
                setOptionsOpen(false);
              }}
            />
          ))}
        </View>
      </BottomSheet>
    </GalleryStack>
  );
}
