# Execution — from approved Blueprint to working software

`docs/KICKOFF.md` ends with an approved Project Blueprint. This file is the
canonical guide for what happens next: how that Blueprint becomes a
well-structured, mock-backed, backend-ready app. Read it when
`Project Status` is `BLUEPRINT_APPROVED` (or later) and implementation work is
requested. Discovery does not restart here.

Code-level conventions are not repeated: `docs/ARCHITECTURE.md` for project
structure, `src/services/README.md` for the service folder,
`docs/ENVIRONMENT.md` for configuration and secrets.

## 1. Implementation start

When status is `BLUEPRINT_APPROVED` and the user asks to begin:

1. Read `PRODUCT.md`, `FLOWS.md`, `DESIGN_DIRECTION.md`, `DATA_MODEL.md`, `BACKEND.md`.
2. Inspect the current code: routes in `app/`, theme, existing features and services.
3. Align the architecture (§2), then rebuild the app shell from `FLOWS.md` (§3).
4. Translate feature and domain decisions into feature modules and types (§5, §6).
5. Select the primary vertical slice (§4) and decide whether it needs persistence (§7).
6. If it does, define only the required service contract and its mock as part of the slice.
7. Build the slice, validate it (§10), then reuse the proven pattern for the rest.

Set `Project Status: IMPLEMENTING` in `PRODUCT.md` when the first product code
lands. If the user skipped discovery, run the same steps with whatever is
documented and record the minimum context (KICKOFF §1).

Default lifecycle: `BLUEPRINT_APPROVED` → architecture alignment → production
app shell → first vertical slice (with its contract and mock when it needs
persistence) → validate → remaining features on the proven pattern → real
backend later. A strong default, not a rigid process: a simple local-only app
stays simple, with no contracts, no mocks and an empty services folder.

## 2. Architecture alignment

Before writing screens, compare each approved doc with the code and note the
gaps. Do not fix everything up front; know what the shell and the first slice
will have to touch.

| Approved doc | Compare with | Typical outcome |
| --- | --- | --- |
| `FLOWS.md` screen map, navigation | `app/` routes and layouts | which starter routes go, which shell to build |
| `DESIGN_DIRECTION.md` Customized column | `src/theme/brand.ts`, other tokens | brand values, font swap, new tokens with comments |
| `DATA_MODEL.md` entities | `src/features/<feature>/types.ts` | which features exist and which types they own |
| `BACKEND.md` service boundaries | `src/services/` | which contracts the first slice needs, if any |

## 3. Production app-shell transition

The starter ships Home, Gallery and Settings tabs as a development reference.
They are not a default information architecture.

- Rebuild `app/(tabs)/_layout.tsx` and the root stack in `app/_layout.tsx`
  from the navigation architecture in `FLOWS.md`: tabs, stack-only, tabs with
  nested stacks or role-specific shells, whatever the product decided, at most
  four tabs.
- Replace `app/(tabs)/index.tsx` with the real primary screen and its
  hierarchy from `DESIGN_DIRECTION.md`.
- Keep Settings only if the product needs a settings screen. Do not keep a
  starter tab because it already exists.
- The Gallery stays in the repository as a development capability and leaves
  production navigation. Use the cleanest Expo Router-compatible way for the
  shell you build (a route registered only in development, a dev-only entry
  point, a hidden route). No single technique is prescribed, and
  `src/features/gallery` is not deleted to achieve it.
- Screens keep the starter conventions: `<Screen>` with `<Header>`, stack
  headers hidden, detail and full-screen flows on the root stack.

## 4. First vertical slice

Do not build every planned screen. Pick one end-to-end user experience from
the Blueprint, usually the first meaningful action of the primary journey,
and build it completely.

A good slice validates in one pass: navigation and the shell decisions, the
visual direction, feature organization, domain types, the service boundary if
one is needed, interactions, and loading / empty / error states where they
genuinely occur.

When the slice needs persistence or a backend, build its layers together, in
this order:

feature types → service contract → mock implementation → screens and interactions

Do not build the UI first and retrofit a contract and mocks later. Do not add
a contract to a slice that only has local state. Once the slice is healthy,
repeat the pattern feature by feature. Never create artificial architecture to
exercise every layer.

## 5. Blueprint → code mapping

The single canonical mapping. It guides implementation, it is not
bureaucracy, and an existing better structure in the repository wins.

| Blueprint output | Lands in |
| --- | --- |
| Screen architecture (`FLOWS.md` screen map) | `app/` routes: tab roots in `app/(tabs)/`, detail and full-screen flows on the root stack; confirmations via `Modal`, forms and pickers via `BottomSheet` inside screens |
| Navigation decisions | the shell: `app/_layout.tsx` (root stack), `app/(tabs)/_layout.tsx` (tabs), any group layouts the product needs |
| Product / domain features | `src/features/<feature>/` with `components/`, `hooks/`, `types.ts`, and `utils/` or `screens/` only when needed |
| Feature-specific components | `src/features/<feature>/components/`, composed from `ui` primitives |
| Generic reusable UI | existing `src/components/ui/` first: add a prop or variant and its Gallery example; a new primitive only when nothing fits |
| Visual / brand decisions | `src/theme/brand.ts` first; `typography.ts` + `fonts.ts` for type; other semantic tokens in `src/theme/*` with a comment on when to use them |
| Conceptual entities / domain types | `src/features/<feature>/types.ts`; types shared by several features in `src/types/` |
| Persistence / backend requirements | a domain-specific contract in `src/services/contracts/` (§7) |
| Development data | a mock implementation in `src/services/mock/` when it helps (§8) |
| Selected real provider (later) | `src/services/<provider>/` behind the same contract, plus `docs/<PROVIDER>.md` |
| Public runtime configuration | `src/config/env.ts` with `.env` / `.env.example` (`docs/ENVIRONMENT.md`) |
| App identity | `app.json`, `assets/` |

## 6. Feature organization

`src/features/<feature>/` holds everything specific to that feature. Add only
the folders the feature actually needs; a small feature can be one component
and one hook. Feature-specific UI belongs under the feature. Anything generic
goes through `src/components/ui/`: inspect it first, extend before creating.
Cross-feature helpers go to `src/hooks`, `src/utils`, `src/types`.

## 7. Service boundary decision

Create a service contract only when the functionality genuinely touches
persistent data, a remote backend, device persistence, an external API or
other real infrastructure. A feature existing is not a reason for one.

- Contracts are domain-specific: `<Domain>Service` with the methods the
  product needs, never `BaseRepository<T>` or a generic CRUD abstraction.
- Feature and presentation code never import a provider SDK. UI consumes
  plain domain objects: no provider snapshots, document objects, raw SDK
  types, raw API response shapes or provider error objects. Translation
  happens inside the service implementation.
- Errors: infrastructure failures become application-meaningful errors at the
  boundary. Distinguish only what the UI must react to differently (retryable,
  unavailable or offline, permission denied, validation), and only when
  relevant. No universal error taxonomy, no error infrastructure without a
  demonstrated need.
- Composition: one obvious place exposes the active implementation of each
  contract, `src/services/index.ts`, and features import from `@/services`
  only. Plain TypeScript, no DI framework, container or registry. The file is
  created together with the first real contract, not before. Folder details
  and an example are in `src/services/README.md`.

## 8. Mock usage

Mocks make UI work independent of backend timing; they are a tool, not a
requirement. Preferred flow when persistence exists: contract → mock → slice →
UX validation → real provider later.

- Deterministic, realistic fixtures; predictable results; an easy reset.
- Cover the states the UI really has: loading, success, empty, error. Do not
  manufacture states that cannot happen.
- No persistence libraries for mocks, no fake servers, no mock framework.
- Sample data is development-only and must never ship as product content.
- If the product genuinely needs the real backend from day one, connect it
  earlier and say why in `BACKEND.md`.

## 9. Composition

route file (`app/`) → feature screen or components → feature hook →
`@/services` → contract → mock or provider

Routes stay thin. Hooks own async state and return `AsyncState<T>`; screens
render `LoadingState` / `EmptyState` / `ErrorState` from it
(`docs/ARCHITECTURE.md`). Public configuration comes only from
`src/config/env.ts`. Nothing above the service boundary knows which
implementation answers.

## 10. Validation

Use the tooling the starter already has; add nothing for this.

```bash
npm run check                      # typecheck + lint
npx expo-doctor                    # config and dependency sanity
npx expo export --platform ios     # full Metro bundle without a device
```

Passing TypeScript and lint does not prove the mobile UX works. Smoke-test
every meaningful slice on a device or simulator: Expo Go when the
dependencies allow it, a development build only when a native module
requires one. Check both color schemes.

A feature is complete when, where relevant, the intended flow and navigation
work, the design matches `DESIGN_DIRECTION.md`, interactions give feedback,
loading / empty / error / disabled states render, persistence behaves,
permissions hold, accessibility basics are met, and it looks right on iOS and
Android. Guidance, not bureaucracy.

## 11. Readiness for real backend integration

The app is ready for `BACKEND_INTEGRATION` when contracts are stable and used
by the features, mocks cover the real states, UI consumes domain objects only,
and configuration flows through `src/config/env.ts`. Then follow
`BACKEND.md`: select the provider consciously, implement each contract in
`src/services/<provider>/`, switch it in `src/services/index.ts`, document the
provider in `docs/<PROVIDER>.md`, and set `Project Status: BACKEND_INTEGRATION`.
UI and hooks should not change.
