# Can-Mobile-Starter

A reusable Expo + React Native + TypeScript starter with a complete, semantic
design system, a UI gallery, and an AI-native project kickoff: create a
repository from this template, open it in a coding agent, describe your idea,
and the agent shapes the product with you before it writes code.

No backend, auth or analytics is included. The service layer is contract-first
and mock-first; see `docs/BACKEND.md` and `src/services/README.md`.

## Run

```bash
npm install
npx expo start
```

Open the **Gallery** tab (or navigate to `/gallery`) to see every primitive in
both color schemes. Toggle the scheme in **Settings**.

## Starting a new app with an AI agent

1. Create a repository from this template (GitHub → **Use this template**) and clone it.
2. Open it in Claude Code, Codex, Cursor or any other agent that reads `AGENTS.md`.
3. Say what you want, in your own language:

   > I want to build a mobile app for [idea]. Help me shape the product.

The agent sees `Project Status: TEMPLATE` in `docs/PRODUCT.md`, follows
`docs/KICKOFF.md`, and runs a short adaptive discovery (typically 3–6 rounds)
covering product, users, primary journey, screens, navigation, visual
direction, data and backend. It proposes options with recommendations, records
decisions in `docs/`, presents a Project Blueprint for your approval, then
implements in vertical slices on mock services.

- **Skip it:** say "Skip discovery and implement this." The agent starts coding
  and records only the minimum context.
- **Resume anywhere:** the docs and the status line carry the context, so a
  different agent, machine or conversation continues where you left off instead
  of asking again.

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
src/services/         contracts/ · mock/ · <provider>/ — empty until the product needs it
src/hooks | lib | utils | types
docs/                 KICKOFF · PRODUCT · FLOWS · DESIGN_DIRECTION · DATA_MODEL · BACKEND
                      DESIGN_SYSTEM · ARCHITECTURE · COMPONENTS · NEW_PROJECT_CHECKLIST
AGENTS.md             rules for AI agents (Claude Code, Codex, Cursor); CLAUDE.md references it
```

## Working with AI agents

- `AGENTS.md` is the shared source of truth for Claude Code, Codex, Cursor and
  any other agent that reads it. There are no per-tool rule files.
- `CLAUDE.md` contains only `@AGENTS.md`.
- `.claude/settings.json` enables the official Expo plugin (`expo@claude-plugins-official`).

## Manual setup

Renaming, icons, environment and release steps: `docs/NEW_PROJECT_CHECKLIST.md`.
