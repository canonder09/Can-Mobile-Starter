import { useFonts } from 'expo-font';
// Per-weight subpath imports so Metro bundles ONLY these files, not every weight.
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { JetBrainsMono_500Medium } from '@expo-google-fonts/jetbrains-mono/500Medium';

/**
 * Font assets loaded at startup. Keys MUST match the family names used in
 * `typography.ts` (`fonts`). Swap both files together when changing fonts.
 */
export const fontAssets = {
  Archivo_700Bold,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  JetBrainsMono_500Medium,
};

/** Returns `[loaded, error]` — keep the splash screen until `loaded` is true. */
export function useAppFonts() {
  return useFonts(fontAssets);
}
