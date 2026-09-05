# services/

Data access lives here — never inside presentational components. The folder is
intentionally empty in the starter; it fills in once the product needs
persistence or a backend (`docs/BACKEND.md` records that decision).

## Convention: contract → mock → provider

```
src/services/
  contracts/     one file per domain: the repository interface the app depends on
                 (contracts/<domain>.ts exports `<Domain>Repository`)
  mock/          in-memory / fixture implementations of those contracts — the
                 first implementation, used to build and validate the UI
  <provider>/    real implementation (firebase/, supabase/, api/ …), added only
                 when a backend is selected; client bootstrap in client.ts
  index.ts       exports the active implementation of each contract
```

1. Define the contract first, in terms of the domain types from
   `src/features/<feature>/types.ts` (type-only imports). Methods return plain
   typed objects or throw — never SDK documents, snapshots or raw responses.
2. Implement it in `mock/` with realistic fixtures, including empty and failing
   cases, so every screen state can be built without a backend.
3. Feature hooks in `src/features/<feature>/hooks/` import from `@/services`
   only and turn results into `AsyncState<T>` (`src/types`). Screens render
   `LoadingState` / `ErrorState` / `EmptyState` from that state.
4. When a provider is chosen, implement the same contract in
   `src/services/<provider>/` and switch it in `index.ts` (or behind an
   `EXPO_PUBLIC_*` flag). UI and hooks do not change.

Scope this boundary to real persistence and backend behaviour. Purely local UI
state and tiny features do not need a contract.

Config comes from `EXPO_PUBLIC_*` variables (see `.env.example`), never from
hard-coded keys. Provider-specific setup is documented in `docs/<PROVIDER>.md`
once that provider exists.
