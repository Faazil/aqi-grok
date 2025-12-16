// app/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce a value, delaying its update until after a specified delay.
 * Useful for search inputs to prevent excessive API calls.
 * @param value The value to debounce (e.g., the search input state).
 * @param delay The delay in milliseconds (e.g., 500ms).
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the previous timer on every render if value or delay changes
    // This is the core logic of debouncing: resetting the timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
