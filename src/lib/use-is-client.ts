import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false during the server render and hydration, true afterwards. For UI that depends on
// browser-only state, such as the theme next-themes reads from localStorage.
export function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
