import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/theme';
import { Text } from '../Text';

export type ToastTone = 'neutral' | 'success' | 'danger';

export type ToastOptions = {
  message: string;
  tone?: ToastTone;
  /** Milliseconds before auto-dismiss. */
  duration?: number;
};

type ToastApi = {
  show: (options: ToastOptions | string) => void;
  hide: () => void;
};

const ToastContext = createContext<ToastApi | null>(null);

type ActiveToast = ToastOptions & { id: number };

/**
 * Mount once near the root (inside ThemeProvider + SafeAreaProvider).
 * Toasts are short, single-line confirmations — never errors that need action.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ActiveToast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const counter = useRef(0);

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setToast(null);
  }, []);

  const show = useCallback(
    (options: ToastOptions | string) => {
      const next = typeof options === 'string' ? { message: options } : options;
      if (timer.current) clearTimeout(timer.current);
      counter.current += 1;
      setToast({ ...next, id: counter.current });
      timer.current = setTimeout(() => setToast(null), next.duration ?? 2600);
    },
    []
  );

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const api = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastHost toast={toast} onDismiss={hide} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
}

function ToastHost({ toast, onDismiss }: { toast: ActiveToast | null; onDismiss: () => void }) {
  const { colors, radius, space, float } = useTheme();
  const insets = useSafeAreaInsets();

  if (!toast) return null;

  const dot: Record<ToastTone, string | null> = {
    neutral: null,
    success: colors.success,
    danger: colors.danger,
  };
  const dotColor = dot[toast.tone ?? 'neutral'];

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: space[4],
        right: space[4],
        bottom: insets.bottom + space[6],
        alignItems: 'center',
      }}
    >
      <Animated.View key={toast.id} entering={FadeInDown.duration(200)} exiting={FadeOutDown.duration(160)}>
        <Pressable
          onPress={onDismiss}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: space[2],
            paddingHorizontal: space[4],
            paddingVertical: space[3],
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            maxWidth: '100%',
            ...float,
          }}
        >
          {dotColor ? (
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dotColor }} />
          ) : null}
          <Text variant="bodyMedium" numberOfLines={2} style={{ flexShrink: 1 }}>
            {toast.message}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
