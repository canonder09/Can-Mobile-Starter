# New project checklist

Use this when creating a new app from the starter. The product itself is shaped
with an AI agent (`docs/KICKOFF.md`); this list covers the mechanical steps
around that. `Project Status` in `docs/PRODUCT.md` tracks where you are.

## 1. Create and rename

- [ ] GitHub → **Use this template**, then clone. (Or copy the folder without `node_modules`, `.expo`, `.git` and `git init`.)
- [ ] `package.json` → `name`
- [ ] `app.json` → `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`, `version`
- [ ] Replace `assets/icon.png`, `assets/splash-icon.png`, `assets/android-icon-*.png`, `assets/favicon.png`
- [ ] Update the splash background colors in `app.json` if the brand background differs
- [ ] `npm install`
- [ ] Commit: `chore: bootstrap from Can-Mobile-Starter`

## 2. Shape the product — status `TEMPLATE` → `DISCOVERY` → `BLUEPRINT_APPROVED`

- [ ] Open the repo in Claude Code, Codex or Cursor and describe the idea in your own language. The agent runs adaptive discovery per `docs/KICKOFF.md`.
- [ ] Review `docs/PRODUCT.md`, `FLOWS.md`, `DESIGN_DIRECTION.md`, `DATA_MODEL.md` and `BACKEND.md` as they fill in; decisions marked Selected are the ones that count.
- [ ] Approve the Project Blueprint explicitly (status → `BLUEPRINT_APPROVED`).
- [ ] Or skip it: "Skip discovery and implement this."

## 3. Brand — from `docs/DESIGN_DIRECTION.md`

- [ ] `src/theme/brand.ts` — accent palette (light + dark). Check contrast of `accentStrong` on `accentMuted` and `onAccent` on `accent`.
- [ ] Decide `primaryFollowsAccent` (ink buttons vs accent buttons).
- [ ] If the direction calls for it: swap fonts in `src/theme/typography.ts` **and** `src/theme/fonts.ts` (install with `npx expo install @expo-google-fonts/<family>`).
- [ ] Any further token change (radius, spacing, motion) gets a comment in `src/theme/*` and a row in the Customized column of `DESIGN_DIRECTION.md`.
- [ ] Open the Gallery in light and dark mode and eyeball every section.

## 4. Environment

- [ ] Copy `.env.example` → `.env`; fill `EXPO_PUBLIC_*` values. Never commit `.env`.
- [ ] Keep `.env.example` updated with placeholders when adding variables.

## 5. Agents

- [ ] Read `AGENTS.md`; add product-specific rules there (not in `CLAUDE.md`, not in per-tool rule files).
- [ ] Claude Code: `.claude/settings.json` enables `expo@claude-plugins-official`; run `/mcp` to sign in to Expo if you want EAS/docs tools.
- [ ] Codex and Cursor: `AGENTS.md` is picked up automatically from the repo root.

## 6. App shell and first slice — status `IMPLEMENTING`

- [ ] Rename/replace the tabs in `app/(tabs)/_layout.tsx` from the navigation architecture in `FLOWS.md` (keep ≤ 4 tabs).
- [ ] Replace `app/(tabs)/index.tsx` with the real primary screen; its hierarchy is in `DESIGN_DIRECTION.md`.
- [ ] Keep the Gallery out of production navigation using the cleanest Expo Router option for your shell (a dev-only tab, a `__DEV__` gate, a hidden route); leave `src/features/gallery` in the repo for development.
- [ ] Build the first vertical slice end to end on mock services; validate (both schemes, loading / empty / error) before widening.

## 7. Services — status `BACKEND_INTEGRATION`

- [ ] Contracts in `src/services/contracts/` per the service boundaries in `BACKEND.md`; mocks in `src/services/mock/` (usually already there from step 6).
- [ ] Choose the provider consciously in `BACKEND.md`; add `src/services/<provider>/` and `docs/<PROVIDER>.md`.
- [ ] Switch the active implementation in `src/services/index.ts`. UI and hooks stay unchanged.
- [ ] Auth as a feature (`src/features/auth`) over an auth contract, not inside UI primitives.
- [ ] Persist the theme preference (AsyncStorage or profile) if the app exposes it.

## 8. Release prep — status `RELEASE_PREP`, then `SHIPPED`

- [ ] `npx expo-doctor`, `npm run check`
- [ ] `npx expo prebuild` only if you need native customization; otherwise stay managed.
- [ ] EAS: `eas init`, `eas build:configure`; keep `eas.json` profiles committed, credentials out of git.
- [ ] Review `.gitignore` for any new secret file types.
