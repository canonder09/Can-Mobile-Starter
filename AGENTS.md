# AGENTS.md — engineering rules for AI agents (Claude Code, Codex, others)

This file is the single source of truth for how to work in this project.
`CLAUDE.md` only references it. Do not create competing instruction files.

## Stack (fixed)

- Expo SDK 57 · React Native 0.86 · React 19 · TypeScript (strict) · Expo Router.
- Read the versioned docs before writing Expo code: https://docs.expo.dev/versions/v57.0.0/
  Expo changes between SDKs; APIs from older docs may not exist here.
- Install packages with `npx expo install <pkg>` so versions match the SDK.
  Prefer Expo-maintained or Expo-compatible libraries. Avoid adding a dependency
  when a few lines of code do the job.

## Project map

| Path | Purpose |
| --- | --- |
| `app/` | Expo Router routes only. Thin: compose feature components, no business logic. |
| `src/theme/` | Design tokens + `ThemeProvider`/`useTheme`. `brand.ts` is the only file to touch for re-branding. |
| `src/components/ui/` | Generic, app-agnostic primitives (Button, Card, Input, …). |
| `src/features/<name>/` | Product features: `components/`, `hooks/`, `types.ts`, optional `screens/`. |
| `src/services/` | Data access (API, Firebase, Supabase). Empty until a backend is chosen. |
| `src/hooks/`, `src/lib/`, `src/utils/`, `src/types/` | Shared, non-visual helpers. |
| `docs/` | Design system, architecture, component inventory, new-project checklist. |

## Rules

1. **Check `src/components/ui` first.** Never create a second Button, Card, Input,
   Text, ListItem, Modal, Sheet, Toast, Badge, Chip, Avatar, EmptyState, ErrorState
   or LoadingState. Extend the existing one with a prop or variant instead.
2. **Import `Text` from `@/components/ui`, never from `react-native`.** Fonts,
   line heights and colors are managed there.
3. **No raw colors, sizes or radii in screens/components.** Use `useTheme()`:
   `colors.<token>`, `space[n]`, `radius.<key>`, `type.<role>`, `float`, `motion`.
   The accent is for status ("now", "new", "live", selected tab) — primary
   buttons stay ink-colored unless `brand.ts` says otherwise.
4. **Preserve the design language; extend, don't replace.** New tokens go in
   `src/theme/*` with a comment on when to use them. New variants go on the
   existing component. Read `docs/DESIGN_SYSTEM.md` before visual work.
5. **Domain stays out of the UI library.** `OrderCard`, `WorkoutRow`, `ProfileHeader`
   belong in `src/features/<name>/components`, composed from `ui` primitives.
6. **UI never talks to a backend.** Presentational components take data and
   callbacks as props. Data access lives in `src/services`, consumed by feature
   hooks that return `AsyncState<T>` (see `src/types`).
7. **Every screen handles loading, empty, error and disabled states**, using
   `LoadingState`, `EmptyState`, `ErrorState` and the `disabled`/`loading` props.
8. **Explicit TypeScript.** Export prop types, avoid `any`, no non-null assertions
   without a comment explaining why the value cannot be null.
9. **Accessibility is part of done:** `accessibilityRole`/`Label` on controls,
   icon-only buttons need a `label`, touch targets ≥ 44pt, dynamic type must not
   break layout, respect `useReducedMotion`.
10. **Both platforms.** Test the layout mentally for iOS and Android: safe-area
    insets via `useSafeAreaInsets` (not `SafeAreaView`), `elevation` after
    shadow spreads, keyboard handling via `react-native-keyboard-controller`.
11. **Navigation:** file-based routes in `app/`. Stack headers are hidden; every
    screen renders `<Header />` inside `<Screen />`. Detail screens go on the root
    stack so the tab bar disappears. Group tab screens in `app/(tabs)/`.
12. **Read before you write.** Look at neighboring files and `docs/ARCHITECTURE.md`
    before introducing a pattern. Match existing naming and folder conventions.
13. **Secrets:** only `EXPO_PUBLIC_*` variables reach the bundle and they are
    public. Real values live in `.env` (git-ignored); `.env.example` has placeholders only.
14. **Keep the gallery current.** When you add or change a primitive, add or
    update its example in `src/features/gallery/sections`.

## Validation before finishing

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # expo lint
npx expo-doctor     # dependency/config sanity
```

Run the app (`npx expo start`) and open the Gallery tab to eyeball changes in
light and dark mode.
