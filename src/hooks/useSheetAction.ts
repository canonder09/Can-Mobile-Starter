import { useCallback, useRef } from 'react';
import { InteractionManager } from 'react-native';

/**
 * "Close the sheet, THEN run the action."
 *
 * An open BottomSheet is a native Modal. Opening another native window on top
 * of it (share sheet, image picker, calendar) or navigating away while it is
 * still mounted can freeze the screen on iOS. Queue the action here and pass
 * `onSheetClosed` to the sheet's `onClosed` prop — the action runs one frame
 * after the modal is really gone.
 *
 * ```tsx
 * const { runAfterClose, onSheetClosed } = useSheetAction();
 * <BottomSheet visible={open} onClose={() => setOpen(false)} onClosed={onSheetClosed}>
 *   <Button title="Share" onPress={() => { runAfterClose(share); setOpen(false); }} />
 * </BottomSheet>
 * ```
 */
export function useSheetAction() {
  const pending = useRef<(() => void) | null>(null);

  const runAfterClose = useCallback((action: () => void) => {
    pending.current = action;
  }, []);

  const onSheetClosed = useCallback(() => {
    const action = pending.current;
    pending.current = null;
    if (!action) return;
    InteractionManager.runAfterInteractions(() => {
      setTimeout(action, 60);
    });
  }, []);

  return { runAfterClose, onSheetClosed };
}
