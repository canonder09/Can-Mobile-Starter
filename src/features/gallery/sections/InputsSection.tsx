import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { Eye, EyeOff, Mail, Sparkles } from 'lucide-react-native';
import { Button, Chip, Divider, Input, SearchInput, Text } from '@/components/ui';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useTheme } from '@/theme';
import { GalleryBlock, GalleryStack } from '../components/GalleryBlock';

const CATEGORIES = ['All', 'Design', 'Engineering', 'Marketing', 'Sales', 'Support'];

export function InputsSection() {
  const { colors, space } = useTheme();
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState('');
  const debounced = useDebouncedValue(query);
  const [mine, setMine] = useState(false);
  const [category, setCategory] = useState<string>('All');

  const emailError = submitted && !email.includes('@') ? 'Enter a valid email address.' : undefined;

  return (
    <GalleryStack>
      <GalleryBlock title="Form" note="Label above (caption), field 48pt on the secondary surface, hint or error below. Return key chains focus.">
        <Input
          label="Email"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          error={emailError}
          hint="We only use it to sign you in."
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
          leftAccessory={<Mail size={18} color={colors.textTertiary} />}
        />
        <Input
          ref={passwordRef}
          label="Password"
          placeholder="At least 8 characters"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="done"
          rightAccessory={
            <Pressable
              onPress={() => setShowPassword((v) => !v)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={20} color={colors.textTertiary} /> : <Eye size={20} color={colors.textTertiary} />}
            </Pressable>
          }
        />
        <Input label="Notes" placeholder="Anything else?" value={notes} onChangeText={setNotes} multiline />
        <Input label="Read only" value="Locked value" editable={false} />
        <Button title="Continue" onPress={() => setSubmitted(true)} />
      </GalleryBlock>

      <GalleryBlock title="Search" note="44pt field with clear button. Pair with useDebouncedValue.">
        <SearchInput value={query} onChangeText={setQuery} placeholder="Search people, places…" />
        <Text variant="sub" color="textSecondary">
          {debounced ? `Debounced query: "${debounced}"` : 'Type to see the debounced value.'}
        </Text>
      </GalleryBlock>

      <GalleryBlock title="Filter chips" note="Selected chip is ink, never accent. A vertical divider separates different kinds of filters.">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space[2], alignItems: 'center' }}>
          <Chip label="Mine" active={mine} onPress={() => setMine((v) => !v)} icon={<Sparkles size={13} color={mine ? colors.onPrimary : colors.textSecondary} />} />
          <Divider orientation="vertical" strong />
          {CATEGORIES.map((c) => (
            <Chip key={c} label={c} active={category === c} onPress={() => setCategory(c)} dot={c === 'Support'} />
          ))}
          <Chip label="Disabled" disabled />
        </ScrollView>
        <View>
          <Text variant="sub" color="textSecondary">
            {`Filter: ${category}${mine ? ' · only mine' : ''}`}
          </Text>
        </View>
      </GalleryBlock>
    </GalleryStack>
  );
}
