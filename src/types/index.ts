/** Shared, app-agnostic types. Domain models belong in `src/features/<feature>/types.ts`. */

export type Maybe<T> = T | null | undefined;

/** Lifecycle of any async screen data — drives Loading/Error/Empty states. */
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
