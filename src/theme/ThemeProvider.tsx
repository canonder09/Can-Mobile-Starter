import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, tokens, type ColorTokens, type Tokens } from './tokens';

export type SchemePreference = 'system' | 'light' | 'dark';

export type Theme = Tokens & {
  colors: ColorTokens;
  isDark: boolean;
  /** What the user chose (system by default). */
  preference: SchemePreference;
  setPreference: (next: SchemePreference) => void;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({
  children,
  initialPreference = 'system',
}: {
  children: React.ReactNode;
  initialPreference?: SchemePreference;
}) {
  const systemScheme = useColorScheme();
  const [preference, setPreference] = useState<SchemePreference>(initialPreference);
  const isDark = preference === 'system' ? systemScheme === 'dark' : preference === 'dark';

  const value = useMemo<Theme>(
    () => ({
      ...tokens,
      colors: isDark ? darkColors : lightColors,
      isDark,
      preference,
      setPreference,
    }),
    [isDark, preference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within <ThemeProvider>');
  return ctx;
}
