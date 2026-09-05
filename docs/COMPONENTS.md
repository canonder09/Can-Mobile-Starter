# Component inventory

How the reference app's UI was generalized into this starter, what was kept,
what was changed, and what was left out on purpose.

## Mapping: reference pattern → starter component

| Reference pattern | Starter component | What was generalized | External dependency |
| --- | --- | --- | --- |
| `ui/Text` (variant + ink color) | `Text` | Colors renamed to semantic tokens (`ink` → `textPrimary`…); added `align`, locale-aware `uppercase` | — |
| `ui/Button` (primary/secondary/ghost/outline/destructive, 50pt pill, scale 0.97) | `Button` | Kept the five proven variants; added `size` (sm/md/lg), `fullWidth`, `leftIcon`/`rightIcon`, a11y state | — |
| 40pt round `surfaceAlt` header actions; 36pt `BlurView` discs on posters | `IconButton` | One component with `tonal` / `ghost` / `primary` / `overlay` variants, 36/40/44 sizes, required `label`, attention `dot` | expo-blur (overlay) |
| Inline `TextInput` style block repeated in auth/profile/admin screens | `Input` | Extracted the shared style (48pt, secondary surface, hairline, radius md, Inter 16), added label/hint/error, accessories, focus state, multiline, React 19 `ref` prop | — |
| Search bar in Search/Clubs screens (44pt, magnifier, clear) | `SearchInput` | Same layout as a component with `onClear`; pair with `useDebouncedValue` | lucide-react-native |
| Poster card / sponsored card / update banner containers | `Card` | `outlined` (border, no shadow), `filled` (secondary surface), `floating` (mini-player style), `padding={0}` media mode, `onPress`, `dimmed` | — |
| Ad-hoc `View`s with theme backgrounds | `Surface` | Tone / radius / border / padding props | — |
| `EventRow`, country rows, locale option rows | `ListItem` | Leading/trailing slots, three text lines, chevron, `inset`, `divider`, `selected`, `disabled`, row press opacity 0.85 | lucide-react-native |
| `ui/Avatar` (uri / initials / icon, ring) | `Avatar` | Added `shape="rounded"` for organisations (52pt logo tile), size-aware initials | expo-image, lucide |
| `ui/Badge` (neutral / spark / ink, pulse) + tinted status marks | `Badge` | `tone` covers neutral, primary, accent, success, warning, danger, outline; pulse respects reduced motion; locale-aware uppercase | — |
| `ui/Chip` (34pt pill, active ink, dot, icon) | `Chip` | Same; added `disabled` and a11y `selected` state | — |
| `SectionDivider` (sticky labeled hairline) + 1×18 vertical separators | `Divider` | One component: plain, `strong`, `inset`, `label` (+`emphasize`), `vertical` | — |
| `ManagerHeader` / `AdminHeader` / tab-root titles | `Header` | Title variants (`display` / `large` / `compact`), subtitle, back button, leading/trailing slots, safe-area + hairline | — |
| `SectionHeader` (eyebrow + "All →") | `SectionHeader`, `Section` | Eyebrow with optional action; `Section` adds the content gap | — |
| Screen scaffolding repeated per screen (`useSafeAreaInsets`, `ScrollView` padding, keyboard handling) + sticky CTA bar | `Screen`, `StickyFooter` | Header/footer slots, scroll / keyboard-aware / static modes, `padded`, `gap`; footer = surface + hairline + float + safe area | react-native-keyboard-controller |
| Bottom-anchored confirm `Modal`s (logout, delete) + full-screen lightbox | `Modal` | `placement` bottom/center, `dismissOnBackdrop`, title/description/actions | — |
| `ui/BottomSheet` (reanimated spring, keyboard handler, `onClosed`, inline presentation) | `BottomSheet` | Ported; `runOnJS` → `scheduleOnRN`, added `handle`, `haptic`, reduced-motion path | reanimated, worklets, keyboard-controller |
| `useSheetAction` hook | `useSheetAction` | Ported unchanged (comments translated) | — |
| Inline `toast` text state per screen | `ToastProvider` + `useToast` | Turned into a global floating pill (mini-player styling) with tones and auto-dismiss | reanimated (layout animations) |
| `ManagerEmptyState` / `ListEmptyComponent` blocks | `EmptyState` | Title + body + CTA, `align`, optional icon | — |
| "Could not load · Retry" button blocks | `ErrorState` | Defaults + `retrying` state | — |
| `ui/Skeleton` + skeleton stacks per screen | `Skeleton`, `LoadingState` | `LoadingState` renders N skeleton rows or a labeled spinner | — |
| `ui/ProgressBar` (capacity, spark ≥ 80%) | `ProgressBar` | Generic 0..1 `value`, `accentFrom` threshold, `thin` size, mono label | — |
| `ui/StepProgress` (auth/onboarding) | `StepProgress` | Ported; reduced-motion aware | — |
| `lib/haptics` | `lib/haptics` | Added `hapticSelection`, `hapticError` | expo-haptics |
| `theme/*` (colors, type, tokens, ThemeProvider) | `theme/*` | Split into brand / colors / typography / fonts / spacing / radius / shadows / motion / tokens; added scheme preference | expo-font, Google Fonts |
| Tab bar (49 + inset, hairline, accent active, 24pt icons) | `app/(tabs)/_layout.tsx` | Expressed with Expo Router `Tabs`; selection haptic | expo-router |

## Intentionally not copied

| Reference component / module | Why it stays out |
| --- | --- |
| `DateStamp` (mono date block) | It is the reference app's *signature* for an events product; carrying it over would make every new app look like that app. The mono type roles (`monoLarge`, `monoSmall`) remain so a new signature can be built. |
| `EventCardHero`, `EventCardMedium`, `EventRow`, `ClubChip`, `SponsoredCard`, `RadioLiveCard`, `RadioMiniPlayer` | Domain cards. Their primitives (Card padding 0, Badge, Avatar rounded, ListItem, Card floating) are in the kit. |
| `EventRegMark`, `MembersOnlyMark`, `PlatformMark`, `TicketPerforation`, `StandQrOverlay`, `DoorCameraPreview` | Product-specific marks and hardware flows (QR, camera). |
| `StarRating`, `RatingBadge` | Rating is a feature, not a primitive; trivial to add under `src/features/reviews` when needed. |
| `HtmlSplash`, `UpdateBanner`, `NotificationPermissionSheet`, `EventConfirmationGate` | Tied to the app's release, push and registration flows. |
| `GlassChrome` / `GlassTabHeader` (absolute sticky headers over lists) | Depends on the reference app's list-under-header layout; documented in DESIGN_SYSTEM §8 for when a new app needs it. |
| Native iOS tabs (`react-native-bottom-tabs`) and `expo-glass-effect` | Extra native deps; Expo Router's JS tabs reproduce the look. Swap in `expo-router/unstable-native-tabs` per project if desired. |
| `i18n` (`react-i18next`, TR/EN dictionaries) | Localization strategy is a per-project decision. Components accept plain strings and a locale tag for uppercase. |
| Firebase bootstrap, App Check, deep links, push, calendar, camera, image picker, track player, view-shot, xlsx export, phone-number input | Service and capability layers; added per project via `npx expo install`. |
| `AuthContext`, `ManagerContext`, `RadioContext`, `DemoModeContext`, `LocaleContext`, navigation types, `packages/shared` | Business logic and data models. |

## API cheat sheet

```tsx
<Text variant="title2" color="textSecondary" uppercase="tr-TR" />
<Button title="Save" variant="primary|secondary|outline|ghost|destructive" size="sm|md|lg" loading disabled fullWidth leftIcon rightIcon />
<IconButton label="Settings" variant="tonal|ghost|primary|overlay" size="sm|md|lg" dot>{icon}</IconButton>
<Input label hint error leftAccessory rightAccessory multiline ref />
<SearchInput value onChangeText onClear />
<Card variant="outlined|filled|floating" padding={4|0} radius="lg" onPress dimmed />
<Surface tone="background|surface|secondary" radius bordered padding />
<ListItem title subtitle meta leading trailing chevron inset divider selected disabled onPress />
<Avatar uri name size ring shape="circle|rounded" />
<Badge label tone="neutral|primary|accent|success|warning|danger|outline" pulse uppercase />
<Chip label active dot icon disabled onPress />
<Divider orientation strong inset label emphasize />
<Header title subtitle variant="display|large|compact" onBack leading trailing safeTop bordered />
<Section title actionLabel onAction gap>…</Section>   <SectionHeader … />
<Screen header footer scroll keyboard padded safeTop gap refreshControl>…</Screen>   <StickyFooter />
<Modal visible onClose title description placement="bottom|center" dismissOnBackdrop>…buttons</Modal>
<BottomSheet visible onClose onClosed title maxHeight keyboardAware scroll handle haptic presentation>…</BottomSheet>
const toast = useToast(); toast.show({ message, tone: 'neutral|success|danger' })
<EmptyState title body actionLabel onAction icon align />
<ErrorState title message retryLabel onRetry retrying align />
<LoadingState variant="skeleton|spinner" rows rowHeight label />   <Skeleton height width radius />
<ProgressBar value label accentFrom size="regular|thin" />   <StepProgress step total label />
```
