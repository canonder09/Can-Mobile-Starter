# New project checklist

Use this when creating a new app from the starter. The product itself is shaped
with an AI agent (`docs/KICKOFF.md`); this list covers the mechanical steps
around that. `Project Status` in `docs/PRODUCT.md` tracks where you are.

## 1. Create and rename

- [ ] GitHub → **Use this template**, then clone. (Or copy the folder without `node_modules`, `.expo`, `.git` and `git init`.)
- [ ] `package.json` → `name`
- [ ] `app.json` → `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`, `version`. The starter's `com.example.canmobilestarter` values are placeholders: replace them with reverse-DNS identifiers you control; this must be done before release (`docs/RELEASE.md` §1).
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

- [ ] Copy `.env.example` → `.env`; fill `EXPO_PUBLIC_*` values. Never commit `.env`. They are public, not secrets: `docs/ENVIRONMENT.md`.
- [ ] New public variables go through `src/config/env.ts`; keep `.env.example` updated with placeholders.

## 5. Agents

- [ ] Read `AGENTS.md`; add product-specific rules there (not in `CLAUDE.md`, not in per-tool rule files).
- [ ] Claude Code: `.claude/settings.json` enables `expo@claude-plugins-official`; run `/mcp` to sign in to Expo if you want EAS/docs tools.
- [ ] Codex and Cursor: `AGENTS.md` is picked up automatically from the repo root.

## 6. App shell and first slice — status `IMPLEMENTING` (`docs/EXECUTION.md`)

- [ ] Rename/replace the tabs in `app/(tabs)/_layout.tsx` from the navigation architecture in `FLOWS.md` (keep ≤ 4 tabs).
- [ ] Replace `app/(tabs)/index.tsx` with the real primary screen; its hierarchy is in `DESIGN_DIRECTION.md`.
- [ ] Keep the Gallery out of production navigation using the cleanest Expo Router option for your shell (a dev-only tab, a `__DEV__` gate, a hidden route); leave `src/features/gallery` in the repo for development.
- [ ] Build the first vertical slice end to end: feature types → service contract → mock → UI when it needs persistence, plain local state when it does not. Validate (`npm run check`, bundle, device smoke test, both schemes, all states) before widening.

## 7. Services — status `BACKEND_INTEGRATION`

- [ ] Contracts in `src/services/contracts/` per the service boundaries in `BACKEND.md`; mocks in `src/services/mock/` (usually already there from step 6).
- [ ] Choose the provider consciously in `BACKEND.md`; add `src/services/<provider>/` and `docs/<PROVIDER>.md`.
- [ ] Switch the active implementation in `src/services/index.ts`. UI and hooks stay unchanged.
- [ ] Auth as a feature (`src/features/auth`) over an auth contract, not inside UI primitives.
- [ ] Persist the theme preference (AsyncStorage or profile) if the app exposes it.

## 8. Auth — only if the product requires identity (`docs/AUTH.md`)

- [ ] Decide and record in `BACKEND.md`: identity model, methods, provider, roles, account lifecycle and deletion.
- [ ] Build it as a slice in the same services convention: `contracts/auth.ts` → provider implementation → `index.ts` → `src/features/auth/`; gating in the app shell with the current Expo Router mechanism.
- [ ] Authorization lives in backend/provider rules; route protection is UX only.

## 9. Release prep — status `RELEASE_PREP`, then `SHIPPED` (`docs/RELEASE.md`)

- [ ] No `com.example.*` identifier remains; name, slug, scheme, version and build numbers are final.
- [ ] Production configuration per `docs/ENVIRONMENT.md`; no secret in git, nothing private in `EXPO_PUBLIC_*`.
- [ ] Permissions, deep links and native config reviewed: only what the product uses; `npx expo prebuild` only if native customization requires it.
- [ ] Quality gate: `npm run check`, `npx expo-doctor`, production build, device smoke tests on iOS and Android, critical journey, auth flows if any.
- [ ] Privacy review, policy URL, store privacy and data-safety declarations reflect actual behaviour; account-deletion path if accounts exist.
- [ ] EAS initialized and configured in the real project per `docs/RELEASE.md` §8 (current official flow); `eas.json` committed only after review; credentials never in git.
- [ ] Review `.gitignore` for any new secret file types.
- [ ] Staged testing (internal build → TestFlight / Play testing) → submission → confirmed live → `SHIPPED`.
