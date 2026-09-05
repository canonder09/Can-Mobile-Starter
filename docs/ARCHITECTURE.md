# Architecture

## Stack

- Expo SDK 57, React Native 0.86, React 19.2, TypeScript 6 (strict)
- Expo Router (file-based navigation, native stack + JS bottom tabs)
- react-native-reanimated 4 + react-native-worklets (animations)
- react-native-keyboard-controller (keyboard-aware screens and sheets)
- expo-image, expo-blur, expo-haptics, expo-font (+ Google Fonts packages),
  expo-splash-screen, lucide-react-native (+ react-native-svg)

No backend, storage, analytics or auth is included. Backend decisions are made
per product in `docs/BACKEND.md`; the service-layer convention (contract →
mock → provider) is in `src/services/README.md`.

## Product definition

`docs/PRODUCT.md` (starting with its `Project Status` line), `FLOWS.md`,
`DESIGN_DIRECTION.md`, `DATA_MODEL.md` and `BACKEND.md` describe *this*
product. `docs/KICKOFF.md` describes how an agent fills them in and how an
approved Blueprint maps onto the folders below. Read the status line before
touching code in a new session.

## Folder layout

```
app/                     routes only (Expo Router)
  _layout.tsx            providers, fonts, splash, root Stack
  (tabs)/                tab group: _layout (Tabs), index, gallery, settings
  gallery/[section].tsx  detail route pushed on the root stack (no tab bar)
  +not-found.tsx
src/
  theme/                 tokens + ThemeProvider (brand.ts is the re-skin entry point)
  components/ui/         generic primitives, one folder per component + barrel index.ts
  features/<name>/       product features (components/, hooks/, types.ts, screens/)
    gallery/             dev-only reference gallery (registry + sections)
  hooks/                 shared hooks (useDebouncedValue, useSheetAction)
  lib/                   thin wrappers around native modules (haptics)
  utils/                 pure helpers (initials, number)
  services/              data access: contracts/ · mock/ · <provider>/ — empty until needed
  types/                 shared types (AsyncState, Maybe)
docs/                    design system, architecture, components, checklist, kickoff + product docs
assets/                  icon, splash, adaptive icon (replace per project)
```

Path alias: `@/` → `src/` (tsconfig `paths`; Metro resolves it automatically).

## Provider tree

```
GestureHandlerRootView
└─ SafeAreaProvider
   └─ KeyboardProvider (react-native-keyboard-controller)
      └─ ThemeProvider (system scheme by default)
         └─ ToastProvider
            └─ StatusBar + root <Stack headerShown={false}>
```

Fonts load in `app/_layout.tsx` via `useAppFonts()`; the native splash stays
visible until they are ready (`SplashScreen.preventAutoHideAsync`).

## Theme flow

`src/theme/brand.ts` → `colors.ts` composes light/dark semantic palettes →
`tokens.ts` bundles scheme-independent tokens → `ThemeProvider` exposes
`{ colors, isDark, preference, setPreference, ...tokens }` through `useTheme()`.

Components read tokens at render time; nothing is hard-coded. Changing the
accent or switching `primaryFollowsAccent` re-skins every component. A product
that needs more than an accent change evolves the other token files
(`typography.ts` + `fonts.ts`, `radius.ts`, `spacing.ts`, `motion.ts`) and
records the deviation in `docs/DESIGN_DIRECTION.md`.

## Routing conventions

- Tab screens live in `app/(tabs)/`. The tab bar's look is defined once in
  `app/(tabs)/_layout.tsx`.
- Anything that should hide the tab bar (detail, wizard, full-screen flow) is a
  route outside the `(tabs)` group, registered on the root `Stack`.
- Stack headers are disabled; screens render `<Header>` inside `<Screen>`.
- Route files stay thin: read params, call feature hooks, render feature
  components. No data fetching inline, no styling beyond layout glue.
- Typed routes are off to keep `tsc` independent of generated files. Enable
  `experiments.typedRoutes` in `app.json` when you want `Href` checking.
- The Gallery and Settings tabs are development references. In a real product
  the Gallery stays in the repository but leaves production navigation; use the
  cleanest Expo Router option for the shell you build.

## Feature organization

```
src/features/orders/                 (illustrative feature name)
  components/OrderCard.tsx           composed from ui primitives (Card, Badge, Text…)
  hooks/useOrders.ts                 calls the orders contract from @/services, returns AsyncState<Order[]>
  types.ts                           Order, OrderStatus
  screens/OrdersScreen.tsx           optional: full screen composition used by app/ routes
```

- Domain components never go into `src/components/ui`.
- Feature hooks are the only place that knows about services, and they know
  only the contract. Whether the mock or a provider answers is decided in
  `src/services/index.ts`, never in a hook or component.
- Cross-feature sharing goes through `src/hooks`, `src/utils` or `src/types`.

## Data and state contract

Screens render from `AsyncState<T>` (`src/types`):

| status | render |
| --- | --- |
| `loading` | `<LoadingState>` shaped like the content |
| `error` | `<ErrorState onRetry>` |
| `success` with empty data | `<EmptyState>` with the next step |
| `success` | content |

Feature hooks depend on service contracts, not providers. The mock
implementation comes first, so every screen and its loading / empty / error
states are built and validated before a backend exists; swapping in the
provider later does not touch UI or hooks.

Local UI state (sheet open, selected chip) stays in the component. Server or
cross-screen state gets a store or query library only when a backend exists.

## Adding a screen

1. Check the screen map in `docs/FLOWS.md`; add the screen there if it is new.
2. Create the route file under `app/` (inside `(tabs)` or on the root stack).
3. Compose `<Screen header={<Header … />}>` with feature components.
4. Handle loading / empty / error / disabled states.
5. Check both color schemes; add new primitives to the Gallery.

## Dependency policy

- `npx expo install <pkg>` only; it pins SDK-compatible versions.
- Prefer Expo modules, then well-maintained libraries with Expo config plugins.
- One library per job (one animation lib, one keyboard lib, one icon set).
- Remove a dependency before adding a competing one.

## Validation

```bash
npm run typecheck        # tsc --noEmit
npm run lint             # expo lint (eslint-config-expo)
npx expo-doctor          # config + dependency checks
npx expo export --platform ios   # full Metro bundle without a device
npx expo start           # run; open the Gallery tab
```
