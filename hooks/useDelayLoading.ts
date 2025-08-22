// useSpinDelay.ts
import { useEffect, useRef, useState } from "react";

type Options = {
    delay?: number; // ms to wait before showing
    minDuration?: number; // ms to remain visible once shown
};

export function useDelayLoading(loading: boolean, options: Options = {}) {
    const { delay = 0, minDuration = 400 } = options;

    const [visible, setVisible] = useState(false);
    const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const shownAtRef = useRef<number | null>(null);

    useEffect(() => {
        // Clear any pending timers when dependencies change/unmount
        const clearTimers = () => {
            if (showTimerRef.current) {
                clearTimeout(showTimerRef.current);
                showTimerRef.current = null;
            }
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }
        };

        if (loading) {
            // Cancel any pending hide timers
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current);
                hideTimerRef.current = null;
            }

            // If already visible, do nothing
            if (visible) return;

            // Wait "delay" before showing
            if (!showTimerRef.current) {
                showTimerRef.current = setTimeout(() => {
                    shownAtRef.current = Date.now();
                    setVisible(true);
                    showTimerRef.current = null;
                }, delay);
            }
        } else {
            // Not loading: either cancel the pending show or hide after minDuration
            if (showTimerRef.current) {
                // Loading ended before delay elapsed: don't show
                clearTimeout(showTimerRef.current);
                showTimerRef.current = null;
                setVisible(false);
                shownAtRef.current = null;
            } else if (visible) {
                // Enforce minimum visible duration
                const elapsed = shownAtRef.current
                    ? Date.now() - shownAtRef.current
                    : 0;
                const remaining = Math.max(minDuration - elapsed, 0);

                if (remaining === 0) {
                    setVisible(false);
                    shownAtRef.current = null;
                } else {
                    hideTimerRef.current = setTimeout(() => {
                        setVisible(false);
                        shownAtRef.current = null;
                        hideTimerRef.current = null;
                    }, remaining);
                }
            }
        }

        return clearTimers;
    }, [loading, delay, minDuration, visible]);

    return visible;
}
