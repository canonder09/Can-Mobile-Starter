# New project checklist

Use this when duplicating the starter for a new app.

## 1. Copy and rename

- [ ] Copy the folder (without `node_modules`, `.expo`, `.git`) or `git clone` and remove the remote.
- [ ] `package.json` → `name`
- [ ] `app.json` → `name`, `slug`, `scheme`, `ios.bundleIdentifier`, `android.package`, `version`
- [ ] Replace `assets/icon.png`, `assets/splash-icon.png`, `assets/android-icon-*.png`, `assets/favicon.png`
- [ ] Update the splash background colors in `app.json` if the brand background differs
- [ ] `git init && git add -A && git commit -m "chore: bootstrap from Can-Mobile-Starter"`
- [ ] `npm install`

## 2. Brand

- [ ] `src/theme/brand.ts` — accent palette (light + dark). Check contrast of `accentStrong` on `accentMuted` and `onAccent` on `accent`.
- [ ] Decide `primaryFollowsAccent` (ink buttons vs accent buttons).
- [ ] Optional: swap fonts in `src/theme/typography.ts` **and** `src/theme/fonts.ts` (install with `npx expo install @expo-google-fonts/<family>`).
- [ ] Open the Gallery in light and dark mode and eyeball every section.

## 3. Environment

- [ ] Copy `.env.example` → `.env`; fill `EXPO_PUBLIC_*` values. Never commit `.env`.
- [ ] Keep `.env.example` updated with placeholders when adding variables.

## 4. Agents

- [ ] Read `AGENTS.md`; add product-specific rules there (not in `CLAUDE.md`).
- [ ] Claude Code: `.claude/settings.json` enables `expo@claude-plugins-official`; run `/mcp` to sign in to Expo if you want EAS/docs tools.
- [ ] Codex: `AGENTS.md` is picked up automatically from the repo root.

## 5. Navigation skeleton

- [ ] Rename/replace the tabs in `app/(tabs)/_layout.tsx` (keep ≤ 4 tabs).
- [ ] Replace `app/(tabs)/index.tsx` with the real first screen.
- [ ] Keep `gallery` reachable in development (or move it behind `__DEV__`); delete it before a public release if you prefer.

## 6. Services (next phase)

- [ ] Choose the backend; add the client under `src/services/<provider>/` (see `src/services/README.md`).
- [ ] Expose repositories that return typed plain objects.
- [ ] Feature hooks return `AsyncState<T>`; screens render `LoadingState` / `ErrorState` / `EmptyState`.
- [ ] Add auth context / session handling as a feature (`src/features/auth`), not inside UI primitives.
- [ ] Persist the theme preference (AsyncStorage or profile) if the app exposes it.

## 7. Release prep

- [ ] `npx expo-doctor`, `npm run check`
- [ ] `npx expo prebuild` only if you need native customization; otherwise stay managed.
- [ ] EAS: `eas init`, `eas build:configure`; keep `eas.json` profiles committed, credentials out of git.
- [ ] Review `.gitignore` for any new secret file types.
