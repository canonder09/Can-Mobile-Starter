# Can-Mobile-Starter

A reusable Expo + React Native + TypeScript starter with a complete, semantic
design system and a UI gallery. Duplicate it to begin any mobile app — fitness,
SaaS, productivity, marketplace, social, client or student apps — and change
only the brand file to re-skin it.

No backend, auth or analytics is included yet; see `docs/ARCHITECTURE.md`.

## Run

```bash
npm install
npx expo start
```

Open the **Gallery** tab (or navigate to `/gallery`) to see every primitive in
both color schemes. Toggle the scheme in **Settings**.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Expo dev server |
| `npm run ios` / `npm run android` / `npm run web` | Dev server for a platform |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `expo lint` (eslint-config-expo) |
| `npm run doctor` | `expo-doctor` |
| `npm run check` | typecheck + lint |

## Structure

```
app/                  routes (Expo Router): _layout, (tabs)/, gallery/[section], +not-found
src/theme/            design tokens, ThemeProvider — edit brand.ts to rebrand
src/components/ui/    generic primitives (Button, Card, Input, ListItem, BottomSheet, …)
src/features/         product features; gallery/ is the dev reference gallery
src/hooks | lib | utils | types | services
docs/                 DESIGN_SYSTEM.md · ARCHITECTURE.md · COMPONENTS.md · NEW_PROJECT_CHECKLIST.md
AGENTS.md             rules for AI agents (Claude Code and Codex); CLAUDE.md references it
```

## Working with AI agents

- `AGENTS.md` is the shared source of truth for Claude Code, Codex and any other agent.
- `CLAUDE.md` contains only `@AGENTS.md`.
- `.claude/settings.json` enables the official Expo plugin (`expo@claude-plugins-official`).

## Starting a new app

Follow `docs/NEW_PROJECT_CHECKLIST.md`.
