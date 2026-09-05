# Release — from working product to store release

Canonical guide for: working product → release preparation → internal and
store testing → submission → confirmed production release. Read it when the
product is feature-complete for its intended release. It applies to a real
product; the master starter itself is never released. The principles here are
stable; Apple, Google, Expo and provider requirements are not, so verify
current first-party documentation at each step (§14).

## Status

Set `Project Status: RELEASE_PREP` when deliberate release preparation begins:
production configuration, real identifiers, store build preparation, privacy
and store metadata, final production validation. Set `SHIPPED` only when the
intended production release is actually available to users. A green build, a
TestFlight or Play internal track, or an accepted submission is not `SHIPPED`.

## Part A — Project preparation (in the repository)

### 1. Product identity

The master starter ships obvious placeholders in `app.json`: name "Can Mobile
Starter", slug `can-mobile-starter`, scheme `canstarter`, and
`com.example.canmobilestarter` as both the iOS bundle identifier and the
Android package. They keep the configuration structurally complete and nothing
else. A real product replaces all of them; a product still carrying a
`com.example.*` identifier is not in `RELEASE_PREP`.

Finalize: public app name · Expo slug · URL scheme where deep links exist ·
iOS bundle identifier · Android package · `version` · iOS build number ·
Android `versionCode` · Expo/EAS project ownership when EAS is used.
Identifiers are permanent once published; use reverse-DNS names under a domain
you control. Decide whether build numbers are managed by EAS (remote) or in
the repository, and record it in `PRODUCT.md` Selected decisions.

### 2. Brand and launch assets

App icon, Android adaptive icon (foreground, background, monochrome), splash
presentation and colors, notification icon if push exists, and the production
name wherever it is displayed. No starter asset ships. Store screenshots and
artwork are produced from the real product (Part B).

### 3. Native configuration

Request only what the product uses. Review in `app.json` and its plugins:
permissions and their user-facing usage descriptions, deep links and URL
scheme, universal links / App Links and associated domains when required,
notifications, background capabilities, camera / photo / location / contacts
usage, native modules and their config plugins, and platform settings
(orientation, tablet support, keyboard mode, predictive back). The starter
declares no permissions; each one a product adds needs a real reason and a
description a reviewer will read. Stay in the managed workflow unless native
customization genuinely requires `npx expo prebuild`.

### 4. Environment and secrets

`docs/ENVIRONMENT.md` is the policy; verify it holds for production:
production public values are set and development endpoints or flags are not;
nothing private is in `EXPO_PUBLIC_*`, which is bundled and public; no real
secret exists anywhere in git history; `.env` is not treated as protection;
mock implementations cannot be selected in a production build
(`src/services/index.ts`).

### 5. Quality gate

Use the tooling the starter already has; add a test framework only when the
product's complexity justifies it.

```bash
npm run check                    # typecheck + lint
npx expo-doctor                  # dependency and config sanity
npx expo config --type public    # the resolved config a build will use
npx expo export --platform ios   # or a real production build
```

Then on devices, not only simulators: iOS and Android smoke tests (permissions,
keyboard, safe areas, both color schemes); the critical user journey end to
end; sign-in, session restore after a cold start and sign-out if auth exists;
error and offline states where relevant; deep links and notifications where
they exist.

### 6. Privacy and data

Inventory what the product actually does: which user and device data is
collected, why, where it is stored, which third parties receive it (backend,
analytics, crash reporting, push), retention and deletion behaviour, and any
tracking. From that inventory: a real privacy policy at a real URL owned by
the product, the App Store privacy declarations, and the Google Play Data
safety form. If accounts exist, the account-deletion path and associated-data
behaviour are decided (`docs/AUTH.md` §9). This starter makes no legal claims
and contains no policy text; the product documents its actual behaviour.

### 7. Auth-specific review (only when auth exists)

Production sign-in methods work against production provider configuration;
recovery and verification paths work; sign-out and session restore work;
account deletion satisfies current store requirements; reviewers can reach
gated flows (a documented path or a reviewer account created in the real
project, never in this template); role-restricted flows are explainable in
review notes.

## Part B — Account and store actions (outside the repository)

### 8. Expo and EAS setup

The master starter has no `eas.json` on purpose: the EAS schema and defaults
change over time, and at template level there is no product identity, no
account or project linking, no known development-build need and no version
strategy. A committed generic file would only go stale. A real project sets
EAS up when it enters release preparation:

1. Verify the installed Expo SDK and config, then read the current official
   EAS documentation. Do not assume today's commands or generated schema.
2. Sign in to the intended Expo account and link the project (`eas init` or
   the current equivalent). The project ID it writes to `app.json` is a public
   identifier and may be committed.
3. Run the current configuration workflow (`eas build:configure` at the time
   of writing) and read the generated `eas.json`.
4. Keep only the profiles the project needs: production always; preview when
   internal distribution exists; development only once the project actually
   uses a development client.
5. Map environments per `docs/ENVIRONMENT.md`: EAS environment variables
   supply `EXPO_PUBLIC_*` per profile. Anything private stays server-side or
   in EAS secrets, never in `eas.json`.
6. Decide the version and build-number strategy (remote or repository).
7. Commit the resulting project-specific `eas.json` only after review.

Signing credentials are managed by EAS on its servers or supplied out of git;
they are never committed. Add `expo-dev-client` and a development profile only
when Expo Go cannot run a required native module, native configuration must be
tested, or a development client is genuinely useful.

### 9. Store accounts and app records

Apple Developer Program membership and an App Store Connect app record with
the bundle identifier registered; a Google Play Console developer account and
app; agreements, tax and banking where required; team access for whoever
submits. Account verification, organisation requirements and testing
prerequisites for newer accounts take time and change: check the current rules
and start early.

### 10. Store metadata

App name, subtitle or short description, full description, category, age and
content rating questionnaire, screenshots for the required device classes,
support URL or contact, privacy policy URL, review notes (how to reach gated
flows, reviewer account), release notes, and localized listings where the
product is localized. Field limits, image sizes and required items change; use
the current store documentation. The starter prefills none of this.

### 11. Staged testing

working development app → preview or internal build → device validation →
TestFlight / Play internal or closed testing → production. Scale it to the
product: a very small app may go development → production build → store test
→ submit. Internal testing is confidence, not release: it never means
`SHIPPED`.

## Part C — Final submission

### 12. Before submitting

Production environment values in the build; real identifiers (no
`com.example.*`); store and account access working; production provider and
backend configuration live; the final build produced from the reviewed
profile; critical flows re-tested on that exact build; privacy and data
declarations matching actual behaviour; reviewer access and notes ready;
current platform requirements re-checked (§14).

Submit with EAS Submit (`eas submit`) or a manual upload. Either way, App
Store Connect and Play Console still need a person to complete the listing,
compliance questions and release settings: EAS Submit uploads a binary, it
does not finish the release. Answer review questions promptly; a rejection is
a normal loop, fix and resubmit.

## Part D — Post-release

### 13. After the release is live

Confirm availability in the intended countries and tracks; smoke-test the
critical flows on the store build; monitor crashes and errors with whatever
the product chose (the starter adds no vendor); monitor auth and backend
failures where relevant; verify analytics only if the product has analytics;
respond to store and review issues; record the shipped version and build
numbers in `PRODUCT.md` Selected decisions; set `Project Status: SHIPPED`.
Later releases bump version and build numbers and repeat §4–§7 and Part C in
proportion to the change.

## 14. Verify current requirements

Apple, Google, Expo, auth and backend providers change their requirements.
Before configuring EAS, implementing policy-sensitive behaviour or submitting,
check the current first-party sources: Expo documentation (EAS Build, Submit,
environment variables), Apple Developer and App Store Connect, Android and
Google Play Console documentation, and the selected provider's documentation.
This file is not a snapshot of those policies.
