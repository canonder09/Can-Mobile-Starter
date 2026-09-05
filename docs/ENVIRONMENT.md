# Environment and secrets

How configuration reaches the app, what is public, what must never be in the
client, and where each value lives. Provider-neutral: the same rules apply to
any backend chosen in `docs/BACKEND.md`.

## One source of truth for the app environment

The application environment (`development` | `staging` | `production`) is
`EXPO_PUBLIC_APP_ENV`, read once in `src/config/env.ts` and exposed as
`env.appEnv`. Nothing else represents it: there is no `extra.appEnv` in
`app.json`, and no code reads `process.env` outside `src/config/env.ts`.

`env.appEnv` says *which configuration set the app talks to*. `__DEV__` says
*whether this is a development bundle*. They are independent: a development
bundle can point at staging, and a release build can point at a staging
backend for QA.

## Public client configuration (`EXPO_PUBLIC_*`)

- Expo inlines every `EXPO_PUBLIC_*` variable into the JavaScript bundle at
  build time. Anyone who downloads the app can read them. They are
  configuration, **not secrets**.
- `.env` being git-ignored keeps values off GitHub. It does **not** make a
  value secret once it is in the bundle.
- Suitable: the app environment, backend base URLs, identifiers a provider
  designs to be public (a project ID, a publishable key), feature flags.
- Never: private API keys, service-account files, privileged backend
  credentials, signing keys, database passwords, anything "server-only". If a
  value would cause harm in a stranger's hands, it does not belong in the
  client at all; put it behind the backend.
- Only static reads are inlined (`process.env.EXPO_PUBLIC_NAME`); dynamic
  access is undefined in the bundle. That is why every variable is listed
  literally in `src/config/env.ts`.

## Files

| File | Committed | Purpose |
| --- | --- | --- |
| `.env.example` | yes | template with every public variable and a safe placeholder; no real values |
| `.env` | no | this machine's values, loaded by `npx expo start` |
| `.env.development`, `.env.production`, `.env.local`, … | no | optional per-mode overrides; Expo's dotenv precedence applies (link below) |
| `src/config/env.ts` | yes | the only reader of `EXPO_PUBLIC_*`; normalizes and types the values |

`.gitignore` already ignores `.env` and `.env.*` and keeps `.env.example`.

## Local development

1. Copy `.env.example` to `.env` and set the values for your machine.
2. `npx expo start`. Restart it after every `.env` change; Metro does not
   reload environment variables.
3. `EXPO_PUBLIC_APP_ENV` falls back to `development` when missing or unknown,
   so a fresh clone runs without a `.env`.

## Preview / staging

When the product has a staging backend, the only difference is
`EXPO_PUBLIC_APP_ENV=staging` plus the staging values of the other public
variables. Same code, same build process. If mock services are ever switched
by environment, that switch lives in `src/services/index.ts`
(`src/services/README.md`) and nowhere else.

## Production

`EXPO_PUBLIC_APP_ENV=production` with the production public values. Before
any release, verify that no development-only value or endpoint is set.
Production builds come from a CI or build-service environment, never from a
developer's `.env`.

## Private secrets

Server secrets (provider admin keys, service accounts, payment secrets,
signing material) live where the server runs: backend environment, cloud
function configuration, CI secret stores. The app calls the backend; the
backend holds the secret. `.gitignore` already blocks common credential files
(`*.p8`, `*.jks`, service-account JSON, `google-services.json`, …).

## Adding a public variable

1. Add it to `.env.example` with a placeholder and a one-line comment.
2. Add it to your `.env`.
3. Add one literal read in `src/config/env.ts`, normalized and typed.
4. Restart `npx expo start`.

## Later: EAS environments (concept only, not configured here)

When builds move to EAS, each build profile gets its `EXPO_PUBLIC_*` values
from EAS environment variables, and anything sensitive to the build process
(signing, tokens) from EAS secrets. The rule does not change: `EXPO_PUBLIC_*`
stays public even there, and `src/config/env.ts` stays the only reader.
Profiles map to environments only where those environments exist; a product
without staging has no preview values to map. The real-project setup flow is
in `docs/RELEASE.md` §8. The project ID that EAS writes into `app.json` is a
public identifier, not app configuration; it does not reopen `extra` as a
configuration source.

Reference: https://docs.expo.dev/guides/environment-variables/
