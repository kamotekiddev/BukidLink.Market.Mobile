import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Returns a debounced version of a value that updates after `delay` ms.
 */
export function useDebouncedValue<T>(value: T, delay = 300): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}

/**
 * Returns a stable debounced function reference.
 * The latest callback is invoked after `delay` ms since the last call.
 */
export function useDebouncedCallback<T extends (...args: any[]) => void>(
    callback: T,
    delay = 300
): T {
    const callbackRef = useRef(callback);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Keep the ref in sync with the latest callback
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    const debounced = useCallback(
        (...args: Parameters<T>) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                callbackRef.current(...args);
            }, delay);
        },
        [delay]
    ) as T;

    // Clear on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return debounced;
}
