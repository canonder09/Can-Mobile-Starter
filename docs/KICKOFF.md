# Project Kickoff — adaptive product discovery

How an AI agent turns "I want to build an app for …" into an approved Project
Blueprint, then into code, without the user driving the process by hand.
`AGENTS.md` says *when* this applies; this file says *how*. Every example here
is illustrative: never carry an example product, role, screen, color, entity,
navigation pattern or backend into a real project.

## 1. Activation and escape hatch

Discovery starts when `Project Status` in `docs/PRODUCT.md` is `TEMPLATE` and
the user introduces a product idea, or when the product is still substantially
undefined. It does not start or restart for bug fixes, UI adjustments, feature
additions to a defined product, or when status is beyond `TEMPLATE`.
"Skip discovery", "just implement this", "start coding": respect it. Write the
minimum you inferred to `PRODUCT.md`, set the status you are actually in
(usually `IMPLEMENTING`) and build. Discovery is guidance, not a gate.

## 2. The hats you wear, in order

Product strategist → UX designer → UI / visual advisor → mobile product
architect → backend architect → implementer. Discovery is where the first five
work. Reason as each of them; do not hand the user a form.

## 3. Running a discovery round

- Before asking, sort the topic space: **obvious** (state it), **safely
  inferable** (infer it and say so), **needs the user** (ask), **can wait**
  (defer). Ask only the third group.
- Ask 2–5 related questions per round. Combine, skip and invent
  product-specific questions; §4 is a reasoning aid, not a checklist.
- A typical MVP reaches a Blueprint in 3–6 meaningful rounds; simple products
  need fewer, complex ones may need more. Stop when you could write the
  Blueprint confidently, never later just to complete a list.
- Every question carries judgment: propose 2–4 alternatives, name the one
  difference that matters, recommend one, let the user choose or modify.
- Do not delegate technical choices the user cannot evaluate (state library,
  folder layout, form handling, caching): decide, say so in one line, move on.
  Ask when the answer changes product value, scope, business model, UX, visual
  direction, roles or permissions, user behaviour, meaningful data behaviour,
  or a real architecture trade-off.
- Challenge a weak decision once, clearly, with the trade-off. If the user
  still chooses B, B wins: record it as Selected and continue. Do not re-argue.
- Revise an earlier recommendation when new information changes the product,
  and say what changed.
- Speak the user's language (Turkish in, Turkish out). Write the docs in
  English unless the user explicitly asks for another language.

Tone (illustrative):

> Two shells fit. **A)** three tabs keeps the recurring action one tap away.
> **B)** a single stack is simpler but buries the weekly view. I recommend A
> because the weekly rhythm *is* the product. Closer to A or B?

## 4. Reasoning domains

Use what matters for this product; skip what does not.

**Product.** Problem, audience, primary value, primary and recurring use case,
MVP versus later, business model, what success looks like for the user, why
they come back.

**Roles and permissions.** Are multiple roles genuinely required? Recommend the
simplest structure that supports the product: no admin layers, dashboards or
permission matrices unless the product needs them now.

**Primary journey.** The one end-to-end experience the product lives on:
first launch → entry (onboarding or auth only if needed) → first meaningful
action → recurring action → completion → return state. One line of arrows in
`FLOWS.md`.

**Screen architecture.** Propose primary, supporting, detail, form, modal,
sheet and role-specific screens and how they relate; the user should not have
to invent the hierarchy. Output: a concise screen map in `FLOWS.md` before any
implementation.

**Home / primary surface.** Answer explicitly: *what is the single most
important thing this user should see or do immediately after entering the main
experience?* Order the screen by primary action → immediate context → progress
or state → upcoming → secondary. Data existing is not a reason to show it.

**Navigation.** Choose from actual behaviour: tabs, stack-only, tabs with
nested stacks, modals, sheets, role-specific shells; at most four tabs. The
starter's Gallery and Settings tabs are development references: the Gallery may
stay in the repository but must not appear in production navigation. Use the
cleanest Expo Router-compatible way to keep it out when the real shell is
built; demo screens never become product features by accident.

**Visual direction.** High priority, and never just "which accent". Propose
2–3 directions, each covering mood, brand personality, palette and accent,
light/dark strategy, typography personality, density and whitespace, surfaces
and cards, radius, iconography, imagery, navigation treatment, motion and
interaction feel. Recommend one and say why. Shape (illustrative):

> **A — Quiet editorial.** Inherited neutrals, one restrained accent, display
> type for headlines, generous whitespace. **B — Energetic.** Dark-first,
> high-chroma accent on progress, tighter radius, bolder motion.
> Recommendation: A, because the product is used in short calm moments.

**Principled deviation.** The starter's design system is the default
foundation, not a visual prison. When this product genuinely benefits,
recommend changes to typography, density, spacing, radius, surfaces,
navigation treatment, imagery or motion. State what stays inherited, what
changes and why it improves this product. Evolve the semantic tokens in
`src/theme/*` rather than replacing components; never casually rebuild the
system. Record it in `DESIGN_DIRECTION.md` as Inherited versus Customized.

**Data.** Describe conceptual entities before any backend: purpose, key
fields, relationships, ownership, permission implications. Backend-agnostic:
no collections, tables or schemas yet.

**Backend.** Auth needs, provider, service boundaries, realtime, storage,
notifications, server-side logic, analytics, offline, security. Firebase,
Supabase, a REST or GraphQL API, local-only, or "none yet" are all conscious
choices; nothing is assumed. Prefer the smallest backend the MVP needs.
Mock-first (§9) usually lets the provider choice follow the first slice.

## 5. Documents and update cadence

| Document | Holds |
| --- | --- |
| `docs/PRODUCT.md` | status line, summary, audience, roles, scope, Selected decisions, open questions |
| `docs/FLOWS.md` | journeys, screen map, navigation architecture, modal and sheet flows |
| `docs/DESIGN_DIRECTION.md` | chosen visual direction, Inherited versus Customized, primary-screen hierarchy |
| `docs/DATA_MODEL.md` | conceptual entities and relationships |
| `docs/BACKEND.md` | backend and provider decisions, service boundaries |

- Keep tentative ideas in the conversation. Write at checkpoints only: after a
  meaningful round, after a major decision, before the Blueprint.
- Mark items **Proposed**, **Selected** or **Deferred**. A tentative idea never
  becomes Selected silently.
- The first time real product decisions are written, change
  `Project Status: TEMPLATE` to `DISCOVERY`. Early, not at the Blueprint: a
  session can end at any moment and the next agent must see discovery is under way.

## 6. Project Blueprint and approval

When enough is known, first make the docs reflect every Selected decision,
then present in the conversation under `# PROJECT BLUEPRINT`: product summary ·
users and roles · primary journey · MVP scope · screen map · navigation ·
selected visual direction · primary-screen hierarchy · core entities · backend
recommendation · important risks and unknowns.

The Blueprint summarizes the docs; it is not a new document, and status stays
`DISCOVERY` while it is shown. Ask for approval. On explicit approval set
`BLUEPRINT_APPROVED` and add a dated "Blueprint approved" row to Selected
decisions. Do not implement before explicit approval unless the user has told
you to start coding.

## 7. After approval

Architecture alignment → app shell (navigation, theme, brand) → first
meaningful vertical slice (one end-to-end user experience on mock services) →
validation (`npm run check`, both color schemes, loading/empty/error states) →
remaining screens and features → real backend integration. Set `IMPLEMENTING`
when the first product code lands. Do not build the whole application in one
uncontrolled pass. All engineering rules in `AGENTS.md` apply unchanged.

## 8. Blueprint → code mapping

| Blueprint output | Lands in |
| --- | --- |
| Screen map, navigation | `app/`: tab roots in `app/(tabs)/`, detail and full-screen flows on the root stack, shell in `_layout.tsx`; confirmations via `Modal`, forms and pickers via `BottomSheet` inside screens |
| Product features | `src/features/<feature>/` with `components/`, `hooks/`, `types.ts`, optional `screens/` |
| Visual direction | `src/theme/brand.ts` first; `typography.ts` + `fonts.ts` for type; other semantic tokens in `src/theme/*` with a comment on when to use them |
| Generic reusable UI | existing `src/components/ui/` first: add a prop or variant, update its Gallery section |
| Feature-specific UI | `src/features/<feature>/components/`, composed from `ui` primitives |
| Core entities | `src/features/<feature>/types.ts`; cross-feature types in `src/types/` |
| Service contracts | `src/services/contracts/` |
| Mock adapters | `src/services/mock/` |
| Provider adapters | `src/services/<provider>/` plus `docs/<PROVIDER>.md`, only once a provider is Selected |
| Auth and session | `src/features/auth/` over an auth contract; never inside UI primitives |
| App identity, config | `app.json`, `assets/`, `.env` / `.env.example` (`EXPO_PUBLIC_*` only) |

## 9. Mock-first services

UI / feature → stable contract (`src/services/contracts/`) → mock
implementation (`src/services/mock/`) → provider implementation
(`src/services/<provider>/`) later. `src/services/index.ts` exports the active
implementation and feature hooks import from `@/services` only, so replacing
mock data with Firebase, Supabase or an API never touches UI. Apply this
boundary where real persistence or backend behaviour exists; do not abstract
tiny local features. Details: `src/services/README.md`.

## 10. Resuming in a new session

Read the status line → Selected decisions and open questions in `PRODUCT.md` →
relevant docs → relevant code → continue from the current stage. Never re-ask
an answered question; never restart discovery because your context is fresh.

| Status | Do |
| --- | --- |
| `TEMPLATE` | If a product idea is introduced, start discovery. Otherwise this is the bare starter. |
| `DISCOVERY` | Continue from the unresolved areas only. |
| `BLUEPRINT_APPROVED` | Do not reopen discovery; proceed with §7. |
| `IMPLEMENTING` | Inspect what exists, then continue the §7 sequence. |
| `BACKEND_INTEGRATION` | Continue provider work per `BACKEND.md` and `docs/<PROVIDER>.md`. |
| `RELEASE_PREP` | Validation, builds, store readiness. |
| `SHIPPED` | An existing product: normal maintenance and feature work. |

## 11. Anti-patterns

- Fixed questionnaires; asking what is obvious or about implementation trivia.
- Blocking progress over insignificant decisions; prolonging discovery for completeness.
- Copying example products, roles, screens, colors, entities or backends into a project.
- Rewriting docs after every message; letting Proposed become Selected silently.
- Accent-swap "branding" when the product deserves a direction; rebuilding the
  design system or duplicating UI primitives.
- Scripts, wizards or generators for what a few lines of guidance already handle.
