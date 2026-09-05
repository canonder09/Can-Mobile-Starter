# AGENTS.md — engineering rules for AI agents (Claude Code, Codex, Cursor, others)

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
| `src/theme/` | Design tokens + `ThemeProvider`/`useTheme`. `brand.ts` is the first file to touch for re-branding; deeper visual changes evolve the semantic tokens (see `docs/DESIGN_DIRECTION.md`). |
| `src/components/ui/` | Generic, app-agnostic primitives (Button, Card, Input, …). |
| `src/features/<name>/` | Product features: `components/`, `hooks/`, `types.ts`, optional `screens/`. |
| `src/services/` | Data access behind contracts: `contracts/` (interfaces), `mock/` (first implementation), `<provider>/` (real backend, when chosen). Empty until the product needs persistence. |
| `src/hooks/`, `src/lib/`, `src/utils/`, `src/types/` | Shared, non-visual helpers. |
| `src/config/` | Public runtime configuration. `env.ts` is the only file that reads `EXPO_PUBLIC_*` (see `docs/ENVIRONMENT.md`). |
| `docs/` | Design system, architecture, components, checklist; product docs (`PRODUCT`, `FLOWS`, `DESIGN_DIRECTION`, `DATA_MODEL`, `BACKEND`), discovery (`KICKOFF`), implementation (`EXECUTION`) and configuration (`ENVIRONMENT`). |

## Project Kickoff Protocol

This repository is a template. `docs/PRODUCT.md` starts with `Project Status: …`
and is the first thing to read in any new session.

- **Status values:** `TEMPLATE` → `DISCOVERY` → `BLUEPRINT_APPROVED` → `IMPLEMENTING`
  → `BACKEND_INTEGRATION` → `RELEASE_PREP` → `SHIPPED`. Meanings live in
  `PRODUCT.md`. Change it only at those transitions, never for trivial edits.
- **Discovery activates** when status is `TEMPLATE` and the user introduces a
  product idea, or when the product is still substantially undefined. Then read
  `docs/KICKOFF.md` and act as product strategist, UX/UI designer and mobile and
  backend architect before implementing. It does **not** activate for bug fixes,
  UI adjustments, feature additions to a defined product, or when status is
  beyond `TEMPLATE`.
- **Escape hatch:** "skip discovery", "just implement this", "start coding" —
  respect it. Note the minimum context in `PRODUCT.md` and set the real status.
- **Status timing:** set `DISCOVERY` the first time real product decisions are
  written to `PRODUCT.md` — early, not at the Blueprint. `BLUEPRINT_APPROVED`
  only on the user's explicit approval. `IMPLEMENTING` when product code starts.
- **Continuity:** the docs carry context between Claude, Codex, Cursor, other
  machines and fresh context windows. On resume: read the status → Selected
  decisions and open questions in `PRODUCT.md` → relevant docs → relevant code →
  continue from the current stage. Never restart discovery because your context
  is fresh; never re-ask an answered question.
- **Discovery style:** adaptive, not a questionnaire. 2–5 related questions per
  round, roughly 3–6 rounds for a typical MVP. Propose alternatives with a
  recommendation; decide easy technical questions yourself; challenge a weak
  decision once, then the user's decision wins and is recorded as Selected.
- **Docs cadence:** update `PRODUCT` / `FLOWS` / `DESIGN_DIRECTION` /
  `DATA_MODEL` / `BACKEND` at checkpoints (after a meaningful round, a major
  decision, before the Blueprint), not after every message. Tentative ideas stay
  Proposed until the user selects them.
- **Language:** talk to the user in the user's language; write project docs in
  English unless the user asks for another language.
- **Templates are domain-neutral.** Examples in the docs are illustrative; never
  copy an example product, role, screen, color, entity or backend into a project.
- The engineering rules below apply during and after discovery.

## Implementation Protocol

- `BLUEPRINT_APPROVED` (or any later status) means discovery is over: do not
  reopen it. Read `docs/EXECUTION.md` before any major implementation step.
- Align first: compare `FLOWS`, `DESIGN_DIRECTION`, `DATA_MODEL` and `BACKEND`
  with the code, then build. Set `IMPLEMENTING` when the first product code lands.
- The starter tabs (Home, Gallery, Settings) are a development reference, not
  the product's information architecture. Rebuild the app shell from
  `FLOWS.md`; keep the Gallery in the repo but out of production navigation.
- Start with one meaningful vertical slice from the Blueprint, not every
  screen. Validate it (`npm run check`, bundle, device smoke test, both color
  schemes, all states) before scaling the pattern to the remaining features.
- If that slice needs persistence, define its feature types, service contract
  and mock as part of building it — not UI first and a retrofit later. If it
  does not, add no contract: local-only stays local-only.
- Persistence boundaries exist only where real data, a backend, device storage
  or an external API is involved. Contracts are domain-specific
  (`<Domain>Service`), never generic CRUD or DI machinery.
- Feature and UI code never import a provider SDK and never see provider
  objects; it consumes plain domain types through `@/services`. Provider
  failures become app-meaningful errors at the service boundary.
- Prefer mocks when they let the UX be built and reviewed before the backend
  exists; they are a tool, not a requirement, and their data never ships.
- Public configuration is read only through `src/config/env.ts`. Details in
  `docs/EXECUTION.md` and `docs/ENVIRONMENT.md`.

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
   callbacks as props. Feature hooks call service contracts from `@/services`
   (mock first, provider later — see `src/services/README.md`) and return
   `AsyncState<T>` (see `src/types`). Never import a provider SDK in a component.
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
    public — a git-ignored `.env` does not make them secret. Read them only
    through `src/config/env.ts`. Real values live in `.env` (git-ignored);
    `.env.example` has placeholders only. See `docs/ENVIRONMENT.md`.
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
