# Design system

The visual language of this starter was extracted from a production Expo app
and stripped of its domain. This document records the actual values and the
rules behind them so new apps stay in the same family.

## 0. Thesis — quiet interface, loud content

- Structure, typography and spacing are disciplined and neutral.
- Color comes from content (photos, posters, data), not from chrome.
- The **accent** marks only what is happening *now*: live/today badges, unread
  dots, the selected tab, a capacity bar past its threshold, a highlighted number.
- **Primary buttons are ink-colored**, not accent-colored. The accent is not spent
  on buttons, links or headings.
- The screen must answer "what is going on?" within the first second.

## 1. Color tokens

Components use semantic tokens only (`useTheme().colors.<token>`). Raw hex values
live in `src/theme/colors.ts` (neutrals) and `src/theme/brand.ts` (accent).

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `background` | `#F6F6F7` | `#0B0B0E` | Screen background, tab-root headers |
| `surface` | `#FFFFFF` | `#17171B` | Cards, sheets, tab bar, sticky bars |
| `surfaceSecondary` | `#F0F0F2` | `#212127` | Inputs, unselected chips, skeletons, tonal icon buttons |
| `overlay` | `rgba(10,10,14,0.45)` | `rgba(0,0,0,0.6)` | Behind modals and sheets |
| `glass` | `rgba(255,255,255,0.72)` | `rgba(20,20,24,0.55)` | Fill under blur views (overlay icon buttons) |
| `textPrimary` | `#101014` | `#F5F5F7` | Titles, body, primary button fill |
| `textSecondary` | `#63636E` | `#A0A0AA` | Meta, subtitles, chip labels |
| `textTertiary` | `#9C9CA6` | `#6C6C77` | Placeholders, eyebrows, idle icons |
| `onPrimary` | `#FFFFFF` | `#0B0B0E` | Text on a `primary` fill |
| `border` | `#E7E7EA` | `#26262C` | Hairline borders on cards, rows, inputs |
| `borderStrong` | `#D6D6DB` | `#33333B` | Segment separators, focused input, sheet handle |
| `primary` | = `textPrimary` | = `textPrimary` | Filled buttons, selected chips, step progress |
| `accent` | `#E5352B` | `#FF5449` | Live badge, unread dot, active tab, urgency |
| `accentPressed` | `#C42A21` | `#E5352B` | Pressed accent |
| `accentMuted` | `#FFECEA` | `#2A1512` | Tinted accent background |
| `accentStrong` | `#B0231B` | `#FF7A70` | Text on `accentMuted` |
| `onAccent` | `#FFFFFF` | `#0B0B0E` | Text on solid `accent` |
| `success` / `successMuted` | `#127A4B` / `#E6F5EE` | `#3DD68C` / `#0F2A1E` | Confirmed, checked in |
| `warning` / `warningMuted` | `#B26A00` / `#FFF3E0` | `#F5A524` / `#2A1F0C` | Pending, attention |
| `danger` / `dangerMuted` | `#C0271E` / `#FDECEA` | `#FF5449` / `#2A1214` | Destructive buttons, validation |

Notes

- `danger` is deliberately darker than the accent in light mode so a destructive
  button never reads as "brand".
- In dark mode the accent is lifted (`#FF5449`) and `onAccent` becomes near-black.
- **Disabled** is not a color: controls fade to `opacity 0.45`. Dimmed/expired
  items use `opacity 0.65`.

### Rebranding

Edit `src/theme/brand.ts` only:

```ts
light: { accent: '#7CC000', accentPressed: '#69A300', accentMuted: '#F0F9DD', accentStrong: '#3E6600', onAccent: '#0B0B0E' }
```

Set `primaryFollowsAccent = true` if the brand wants accent-filled primary buttons.
No component changes are required.

## 2. Typography

| Family | Role | Rule |
| --- | --- | --- |
| **Archivo 700** | display | Headlines ≥ 22pt only, tight tracking — poster energy |
| **Inter 400 / 500 / 600** | ui | Everything else; most legible neutral grotesk at small sizes |
| **JetBrains Mono 500** | mono | Numbers, codes, timestamps, counters — never prose |

| Role | Family | Size / line | Tracking | Use |
| --- | --- | --- | --- | --- |
| `display` | Archivo 700 | 32 / 34 | −0.9 | Tab-root headline |
| `title1` | Archivo 700 | 24 / 28 | −0.6 | Detail-screen title |
| `title2` | Inter 600 | 18 / 23 | −0.3 | Card title, sheet title (2 lines max) |
| `title3` | Inter 600 | 16 / 21 | −0.2 | Row title, section title, empty-state title |
| `body` | Inter 400 | 15 / 22 | 0 | Paragraphs |
| `bodyMedium` | Inter 500 | 15 / 20 | 0 | Button labels |
| `sub` | Inter 500 | 13 / 18 | 0 | Meta, chips, subtitles |
| `caption` | Inter 600 | 11 / 14 | +0.4 | Eyebrows, badges, form labels, tab titles |
| `monoLarge` | JetBrains Mono 500 | 26 / 34 | −0.5 | Big numerals |
| `monoSmall` | JetBrains Mono 500 | 10 / 12 | +1.0 | Units, counters |

Rules

- At most **three** roles on one screen.
- Headings in sentence case; badges and eyebrows in UPPERCASE (`uppercase` prop,
  pass a locale tag such as `'tr-TR'` when the language needs it).
- Card titles clamp to two lines (`numberOfLines={2}`).
- Input text is 16pt (`inputFontSize`) to prevent iOS focus zoom.
- Always import `Text` from `@/components/ui`; never from `react-native`.

## 3. Spacing, radius, shadow

```ts
space:     { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 7:32, 8:40, 9:56 }
screenPad: 20      // horizontal screen edge, everywhere
sectionGap: 32     // between sections; header → content is 12
hit: 44            // minimum touch target
radius:    { sm:10, md:14, lg:20, xl:28, pill:999 }
```

| Element | Radius |
| --- | --- |
| Badges, tiny thumbnails | `sm` |
| Inputs, icon tiles, list thumbnails | `md` |
| Cards, media, floating bars, toasts | `lg` |
| Bottom sheets, dialogs, detail sheets | `xl` |
| Buttons, chips, avatars, progress tracks | `pill` |

**Shadow policy:** cards have **no shadow**, only a 1pt `border`. The single
`float` shadow (`0 8 20 · 10% · elevation 8`) is reserved for things that hover:
sticky CTA bars, mini players, toasts, bottom sheets. On Android set `elevation`
*after* spreading `float` if you need more.

## 4. Motion

```ts
duration:    { fast:140, base:240, slow:380 }
easeOut:     bezier(0.22, 1, 0.36, 1)
spring:      { damping:18, stiffness:220, mass:0.9 }   // press / release
springSoft:  { damping:22, stiffness:140 }             // layout, sheet settle
sheetSpring: { damping:28, stiffness:320, mass:0.78 }  // bottom sheet open
press:       { scale:0.97, rowOpacity:0.85, iconOpacity:0.7 }
```

- Pressables scale to 0.97; full-width rows fade to 0.85; icon buttons to 0.7.
- Bottom sheet: backdrop fades in 200ms, panel springs up; on close the backdrop
  fades in 130ms while the panel slides down in 220ms, then the modal unmounts.
- Toast: `FadeInDown` 200ms / `FadeOutDown` 160ms.
- Badge pulse: 850ms opacity loop, only with `pulse`.
- `useReducedMotion()` is respected: transforms become opacity-only / instant.
- Not allowed: endless spinners for content, auto-scrolling carousels, 3D flips,
  scroll-jacking beyond a simple header collapse or parallax.

## 5. Surfaces and cards

- `Card` outlined (default): `surface` + 1pt `border`, radius `lg`, padding 16.
- `Card` filled: `surfaceSecondary`, no border — banners, hints, nested tiles.
- `Card` floating: outlined + `float` — only for elements above content.
- Media cards use `padding={0}`; the image bleeds to the rounded edge and text
  sits below with 16pt padding. Keep a translucent gradient over the bottom
  third of images if you place badges on them.
- Lists are lists, not stacked cards: rows separated by 1pt hairlines.

## 6. Inputs

- Field: `surfaceSecondary`, 1pt `border`, radius `md`, min height 48, padding 16,
  Inter 16, placeholder `textTertiary`. Focus → `borderStrong`; error → `danger`.
- Label above in `caption` `textTertiary`; hint or error below in `sub`.
- Search: 44pt, magnifier 18pt `textTertiary`, clear button when non-empty.
- Filter chips: 34pt pills, 12pt horizontal padding, `sub` label. Selected = ink
  fill + `onPrimary` text, never accent. Separate different kinds of filters with
  a 1×18 vertical `borderStrong` divider.
- Return key chains focus; forms live in `<Screen keyboard>` (keyboard-aware).

## 7. Buttons

| Variant | Fill | Label |
| --- | --- | --- |
| `primary` | `primary` (ink) | `onPrimary` |
| `secondary` | `surfaceSecondary` | `textPrimary` |
| `outline` | transparent, 1.5pt `textPrimary` border | `textPrimary` |
| `ghost` | transparent | `textPrimary` |
| `destructive` | `danger` | `onAccent` |

Sizes: `sm` 40pt, `md` 50pt (default), `lg` 56pt. All pills. Loading swaps the
label for a spinner; disabled fades to 0.45. Icon buttons are round discs of
36/40/44pt: `tonal` (secondary surface) in headers, `ghost` inline, `primary`
for one emphasised action, `overlay` (blur) on media.

## 8. Navigation visual language

- **Headers are custom** (stack headers hidden). `Header` = status-bar inset +
  8pt, 20pt horizontal padding, 12pt bottom, 0.5pt hairline. `display` 32pt on
  tab roots with a one-line quiet subtitle carrying the most useful fact
  ("Today 12 Oct · 4 events"), `large` 24pt on detail screens, `compact` 16pt
  in modals. Right side: 40pt tonal icon buttons or a 36pt avatar.
- **Tab bar**: 49pt + bottom inset, `surface` background, 0.5pt top hairline,
  24pt icons (stroke 2.25 active / 1.75 idle), accent when active, tertiary idle,
  `caption` labels, selection haptic. Four tabs maximum. No floating pill bars.
- **Detail screens** push on the root stack, so the tab bar disappears.
  Transitions: `slide_from_right` for drill-down, `slide_from_bottom` /
  `fullScreenModal` for flows, `fade` for gates.
- Sticky CTA bar (`StickyFooter`): `surface`, 1pt top hairline, `float`,
  12pt top padding, safe-area bottom. Price/summary left, primary button right.

## 9. Modals and sheets

- `Modal`: confirmations only. Anchored to the bottom by default (radius `xl`
  top corners, 20pt padding), or centered with 20pt margins. Title `title2`,
  description `body` `textSecondary`, buttons stacked with the safe choice
  first and the destructive action last.
- `BottomSheet`: forms, option lists, pickers. Radius `xl`, 20pt padding,
  follows the keyboard, optional handle, light haptic on open. Never open a
  native window (share, picker) from inside — use `useSheetAction` to run it
  after `onClosed`.
- `Toast`: floating pill above the bottom inset, `surface` + border + `float`,
  auto-dismiss ~2.6s, optional status dot. Not for errors that need action.

## 10. Interaction feedback

- Haptics: light impact on sheet open / favorite, selection on tab change,
  success/error notification on completed or failed actions. Never on scroll.
- Every pressable has a visible pressed state (scale or opacity).
- Loading: skeletons shaped like the real layout; spinners only inside buttons
  or for short, shapeless waits.
- Empty: title + one sentence + next step. No sad illustrations, no apologies.
- Error: what happened + what to do + a retry button that shows its own loading.

## 11. Light / dark

- `ThemeProvider` follows the system by default; `preference` can be forced
  (`system` / `light` / `dark`) — persist it once a storage layer exists.
- Dark mode is not inverted light mode: surfaces get lighter as they rise
  (`#0B0B0E` → `#17171B` → `#212127`), accent is lifted, tints go deep.
- Status bar style follows `isDark`. Blur views use `tint={isDark ? 'dark' : 'light'}`.
- Check every new screen in both schemes in the Gallery.

## 12. Screen composition rules

1. `<Screen>` owns background, safe areas (via insets, not `SafeAreaView`) and
   the scroll container; `<Header>` sits in its `header` slot.
2. Horizontal padding is always 20. Edge-to-edge lists pass `padded={false}` and
   use `inset` rows / section headers.
3. Sections are 32 apart; eyebrow to content 12; items inside a section 12.
4. One display/title role per screen, then `title3` for sections.
5. Primary action: bottom sticky bar on decision screens, otherwise the first
   button after the content. One primary button per screen.
6. Small phones (375pt) must not clip the header, cards or CTA bar.
7. Every screen defines its loading, empty and error rendering.

## 13. Copy tone

Second person, short verbs, sentence case, no exclamation marks. One action
keeps its name through the flow: "Register" → "Registered" → "Registered ✓".
Errors say the cause and the fix: "Could not load events. Check your connection."

## 14. Quality checklist

- [ ] Touch targets ≥ 44pt
- [ ] Both color schemes checked
- [ ] `useReducedMotion` respected on new animations
- [ ] Dynamic type up to 1.3× does not break layout
- [ ] Non-Latin glyphs render in all weights (ğ İ ı ş ç ö ü …)
- [ ] Icon-only controls have labels; images have `accessibilityLabel`
- [ ] Skeleton / empty / error states exist
- [ ] No raw hex, no magic numbers in screens
