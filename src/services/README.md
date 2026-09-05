# services/

Data access lives here — never inside presentational components.

This folder is intentionally empty in the starter. When you add a backend
(Firebase, Supabase, REST, GraphQL):

1. Put the client bootstrap in `src/services/<provider>/client.ts`.
2. Expose repositories per domain (`src/services/<provider>/users.ts`, …) that
   return plain typed objects, not SDK documents.
3. Feature hooks in `src/features/<feature>/hooks/` call those repositories and
   turn results into `AsyncState<T>` (see `src/types`).
4. Screens render `LoadingState` / `ErrorState` / `EmptyState` from
   `src/components/ui` based on that state.

Config comes from `EXPO_PUBLIC_*` variables (see `.env.example`), never from
hard-coded keys.
