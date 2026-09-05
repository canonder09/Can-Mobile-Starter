# Auth — identity, session, authorization

Provider-neutral guide for products that need accounts. Read it only when the
approved Blueprint requires identity. The master starter ships no auth runtime,
no auth screens and no provider; a real product adds exactly what it needs,
through the service convention in `src/services/README.md`. The principles
here are stable; provider APIs and store policies are not (§12).

## 1. Decision gate

Authentication is not a default feature. The question is whether the product's
first meaningful action, or its recurring value, requires knowing who the user
is across launches or devices. Illustrative answers: local-only, anonymous or
device-bound identity, personal accounts, invitation-only, multi-role,
enterprise-managed. Choose the least identity that supports the product;
accounts can arrive later behind the same contract when the provider supports
linking. If no identity is needed, build nothing from this file. Record the
decision in `BACKEND.md` (Authentication) and `PRODUCT.md`.

## 2. Five concepts, kept apart

| Concept | Question it answers | Where it lives |
| --- | --- | --- |
| Identity | Who is this user? (id, display data) | domain type in `src/features/auth/types.ts` |
| Session | Is this identity authenticated on this client right now, and is that known yet? | session state from the auth contract |
| Auth method | How does authentication happen? | the selected provider's implementation |
| Onboarding | Has the required product setup been completed? | product or profile data, not the session |
| Authorization | What may this identity do? | backend and provider rules, mirrored in UI for gating only |

"Authenticated but not onboarded", "authenticated but not authorized for this
capability" and "anonymous but fully onboarded" are all valid product states.
A single `isLoggedIn` flag cannot express them. Model the states the product
actually has, and nothing more.

## 3. Session lifecycle

Conceptual states: `resolving` (the app started; persisted credentials are not
yet restored or rejected) → `authenticated` or `unauthenticated`, with a
`failed` state only where the UI must react to it. The rule that matters most:
never render the authenticated or the unauthenticated shell while the session
is still resolving; keep the splash or a neutral loading state until it is
known. Expiry, refresh and revocation follow the provider and surface as a
state change, not as a raw error. No state-machine library is needed.

## 4. Auth method

A product decision, not a starter default. Email and password, email link,
OTP, Google, Apple, enterprise SSO, anonymous identity and others are all
options. Decide from the audience, platform expectations (offering third-party
social sign-in on iOS may require also offering Sign in with Apple; verify the
current rule), recovery and support cost, and enterprise constraints. Offer
the fewest methods that serve the audience.

## 5. Provider selection

The auth provider usually follows the backend in `BACKEND.md` (one vendor,
one session) but may be separate: a custom API with its own tokens, or an
enterprise identity provider. Decide consciously and record it under
Authentication and Provider in `BACKEND.md`. Criteria: supported methods,
React Native and Expo support, session persistence on React Native, token
model, account-deletion API, pricing, data residency.

## 6. Service architecture handoff

Auth uses the same convention as every other service. No `infrastructure/`,
`auth-core/` or parallel layer.

```
src/services/contracts/auth.ts     AuthService: provider-neutral identity + session contract
src/services/mock/auth.ts          optional deterministic mock for building the UX
src/services/<provider>/auth.ts    the selected provider's implementation
src/services/index.ts              exports the active authService
src/features/auth/                 types.ts, hooks (session state, sign-in/out orchestration),
                                   product-specific screens and components — only what is needed
```

The contract exposes the current session state with a way to subscribe to
changes, the sign-in methods the product chose, sign-out, and only the account
operations the product needs. It returns plain domain types (`Identity`,
`Session`) and app-meaningful errors: never provider user objects, snapshots,
OAuth details or provider error objects. Session state is held by a hook or a
small context in `src/features/auth/`, created when the product needs it; the
root layout consumes it for gating. Feature and UI code use `@/services` and
those hooks only. Different filenames are fine if the boundary stays the same;
note the deviation in `BACKEND.md`.

## 7. App shell and route gating

Derive navigation from `FLOWS.md`, this file and the Blueprint. A common shape
is public or auth experience → session resolution → onboarding if required →
authorized shell, but it is not universal: a product where browsing is public
gates the action, not the shell. The route tree reflects the product.

Before writing any gating, check the installed Expo Router version
(`node -e "console.log(require('expo-router/package.json').version)"`) and
read the current official Expo Router authentication guide. Protected routes
(`Stack.Protected` with a `guard`) are the supported approach on current
versions; use whatever the installed version supports, and do not reproduce an
older redirect pattern from memory.

Client-side route protection is user-experience gating. It hides screens; it
does not protect data. Backend authorization, database security rules, server
permission checks and provider policies do that, and they are required
whenever remote data or privileged operations exist.

## 8. Roles and authorization

Roles come from `PRODUCT.md`, never from examples in these docs. Recommend the
fewest roles that support the product; many products need one. Authentication
answers "who is this identity"; authorization answers "what may it do".
Authorization is enforced where the data lives: backend, database rules,
provider policies. The client mirrors it for UX (hide what the user cannot do,
explain a denied action) and treats a denial from the backend as the truth.
Keep role and permission data in a domain type; no generic permission engine.

## 9. Account lifecycle

Consider each item and implement only what the product needs: sign-up,
sign-in, sign-out, recovery, verification, reauthentication before sensitive
operations (deleting the account, changing credentials, payments), session
expiry, revocation, invited users, suspended or deactivated users, account
deletion, data deletion, data retention.

Sign-out clears the client session and provider credentials, resets in-memory
state that belongs to the user, and returns to the public experience. It does
not delete data.

If the product allows account creation, in-app account deletion and the fate
of associated data must be decided before release. Regulated domains and
legitimate retention obligations override "delete everything": document the
real obligation under Security and privacy in `BACKEND.md` and implement that.
Verify the current Apple App Review and Google Play account-deletion and
user-data requirements at release time (`docs/RELEASE.md`).

## 10. Credentials and tokens

Never in source, committed configuration or `EXPO_PUBLIC_*` variables
(`docs/ENVIRONMENT.md`). Session persistence follows the selected provider's
current React Native and Expo guidance; add a storage dependency only when
that provider requires one. Do not pre-install SecureStore, AsyncStorage or a
keychain wrapper. Tokens stay inside `src/services/<provider>/`; features
never see them.

## 11. Implementation handoff

Build auth as a vertical slice (`docs/EXECUTION.md` §4): `types.ts` →
`contracts/auth.ts` → mock if useful → provider implementation → `index.ts` →
`src/features/auth/` hooks → gating in the app shell → product-specific auth
screens on the design system and `DESIGN_DIRECTION.md`. Validate on both
platforms: no wrong shell during resolution; sign-in, restore after a cold
start, sign-out; recovery and verification if offered; denied actions
explained. Record decisions in `BACKEND.md`; the release-time auth review is
`docs/RELEASE.md` §7.

## 12. Verify current guidance

Before implementing policy-sensitive behaviour (Sign in with Apple, account
deletion, data handling) or choosing a route-protection API, check current
first-party documentation: Expo and Expo Router, Apple Developer, Google Play,
and the selected provider. This file states principles, not today's policy
text.
