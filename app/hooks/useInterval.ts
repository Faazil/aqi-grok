// app/hooks/useInterval.ts
import { useEffect, useRef } from 'react';

/**
 * Custom hook to set up an interval that calls a function repeatedly.
 * @param callback The function to be called repeatedly.
 * @param delay The delay (in milliseconds) between executions. If null, the interval is paused.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // 1. Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 2. Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      // Clear the interval when the component unmounts or delay changes
      return () => clearInterval(id);
    }
    // No cleanup required if delay is null
  }, [delay]);
}
