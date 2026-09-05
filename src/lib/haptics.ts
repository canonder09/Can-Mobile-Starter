import * as Haptics from 'expo-haptics';

/**
 * Haptics never throw to the caller (unsupported device, web, simulator).
 * Use sparingly: opening a sheet, confirming a success, changing a tab.
 */

/** Soft tap — sheet open, light confirmation, favorite toggle. */
export function hapticLight() {
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
}

/** Selection change — tab press, segmented control, picker wheel. */
export function hapticSelection() {
  void Haptics.selectionAsync().catch(() => undefined);
}

/** Completed action — saved, registered, submitted. */
export function hapticSuccess() {
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
    () => undefined
  );
}

/** Failed action — validation error, network failure. */
export function hapticError() {
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
    () => undefined
  );
}
