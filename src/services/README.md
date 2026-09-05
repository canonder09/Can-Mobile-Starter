# services/

Data access lives here — never inside presentational components. The folder is
intentionally empty in the starter; it fills in once the product needs
persistence or a backend. `docs/BACKEND.md` records that decision and
`docs/EXECUTION.md` §7 says when a contract is warranted at all.

## Convention: contract → mock → provider

```
src/services/
  contracts/     one file per domain: the service interface the app depends on
                 (contracts/<domain>.ts exports `<Domain>Service`)
  mock/          in-memory / fixture implementations of those contracts — the
                 first implementation, used to build and validate the UI
  <provider>/    real implementation (firebase/, supabase/, api/ …), added only
                 when a backend is selected; client bootstrap in client.ts
  index.ts       the composition point: exports the active implementation of
                 each contract; created together with the first contract
```

1. Define the contract first, in terms of the domain types from
   `src/features/<feature>/types.ts` (type-only imports). Name it for the
   domain and give it only the methods the product needs: no
   `BaseRepository<T>`, no generic CRUD. Methods return plain typed objects or
   throw — never SDK documents, snapshots or raw responses.
2. Implement it in `mock/` with deterministic fixtures, including empty and
   failing cases, so every screen state can be built without a backend.
3. Feature hooks in `src/features/<feature>/hooks/` import from `@/services`
   only and turn results into `AsyncState<T>` (`src/types`). Screens render
   `LoadingState` / `ErrorState` / `EmptyState` from that state.
4. When a provider is chosen, implement the same contract in
   `src/services/<provider>/` and switch it in `index.ts`. UI and hooks do not
   change.

## Composition

`index.ts` is the one place that decides which implementation answers. Plain
TypeScript, no container, no registry:

```ts
// src/services/index.ts
import type { ThingService } from './contracts/thing';
import { mockThingService } from './mock/thing';

export const thingService: ThingService = mockThingService;
// Later: import the provider implementation and change this one line.
// If mock and provider must coexist, branch on `env.appEnv` from
// '@/config/env' here — and nowhere else.
```

Provider failures are translated into app-meaningful errors inside the
implementation (`docs/EXECUTION.md` §7); nothing above this file sees a
provider type.

Scope this boundary to real persistence and backend behaviour. Purely local UI
state and tiny features do not need a contract.

Config comes from `src/config/env.ts` (`docs/ENVIRONMENT.md`), never from
hard-coded keys. Provider-specific setup is documented in `docs/<PROVIDER>.md`
once that provider exists.
