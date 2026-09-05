# Backend

Backend and service decisions for this product. Nothing is assumed: Firebase,
Supabase, a REST or GraphQL API, a local-only store, or "none yet" are all
conscious choices made when the product needs them. UI and feature hooks
depend on service contracts only (`src/services/README.md`), so this decision
can follow the first vertical slice built on mock services.

Mark each item **Proposed**, **Selected** or **Deferred**.

## Authentication
_Is identity required at all, and if so before the first meaningful action? Which methods? Anonymous or guest mode? Decide with `docs/AUTH.md`. The auth provider usually follows the backend provider below but may differ; record both. Not yet defined._

## Provider
_Which backend, why, and what was considered. Not yet defined._

## Service boundaries

| Contract (`src/services/contracts/`) | Responsibility | Mock | Provider |
| --- | --- | --- | --- |

_One row per real persistence or backend behaviour. Local UI state does not get a contract. Auth, when required, is one row (`auth`)._

## Realtime
_What must update live, if anything. Not yet defined._

## Storage
_Files, images, media; size and privacy expectations. Not yet defined._

## Notifications
_Push, in-app, email; what triggers them. Not yet defined._

## Server-side logic
_Anything that cannot run on the client: validation, aggregation, scheduled jobs, payments. Not yet defined._

## Analytics
_What is measured, why, and consent. Not yet defined._

## Offline
_What works without a connection; conflict expectations. Not yet defined._

## Security and privacy
_Sensitive data, access rules (authorization is enforced here, not in the client), data residency, retention and deletion obligations. Not yet defined._

## Provider documentation
_When a provider is Selected, create `docs/<PROVIDER>.md` (for example `docs/FIREBASE.md`) with configuration, data mapping and rules. Not before._
