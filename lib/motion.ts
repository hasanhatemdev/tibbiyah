import { useSyncExternalStore, type CSSProperties } from "react";

/** How long each patient-journey stage stays highlighted. */
export const STAGE_INTERVAL_MS = 1800;

export const EASE_OUT = "cubic-bezier(.2,.7,.2,1)";
export const EASE_REVEAL = "cubic-bezier(.7,0,.2,1)";

/**
 * Staggered entrance: pair with the global `.rise` class. Elements animate in
 * order of `index` (see globals.css).
 */
export const rise = (index: number) => ({ "--rise-index": index }) as CSSProperties;

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** `false` when the visitor has asked the OS to reduce motion. */
export function useMotion() {
  return useSyncExternalStore(
    subscribe,
    () => !window.matchMedia(REDUCED_MOTION).matches,
    () => true,
  );
}
