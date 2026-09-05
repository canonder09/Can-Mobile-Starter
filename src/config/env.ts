/**
 * Public runtime configuration — the ONLY place that reads `EXPO_PUBLIC_*`.
 *
 * Every value here is inlined into the JS bundle at build time and is visible
 * to anyone who inspects the app. This file must never carry a secret; server
 * secrets live on the server. See docs/ENVIRONMENT.md.
 *
 * Expo only inlines static reads (`process.env.EXPO_PUBLIC_NAME`), so each
 * variable is listed literally below; dynamic access (`process.env[name]`) is
 * always undefined in the bundle. Add a new variable here and in
 * `.env.example`, then restart `npx expo start`.
 */

/** Which configuration set the app talks to. Independent of `__DEV__`. */
export type AppEnv = 'development' | 'staging' | 'production';

function parseAppEnv(value: string | undefined): AppEnv {
  switch (value) {
    case 'staging':
    case 'production':
      return value;
    default:
      return 'development';
  }
}

export const env = {
  /** Set with EXPO_PUBLIC_APP_ENV. Falls back to development when unset or unknown. */
  appEnv: parseAppEnv(process.env.EXPO_PUBLIC_APP_ENV),
} as const;
