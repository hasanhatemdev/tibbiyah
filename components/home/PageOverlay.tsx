import { useCallback, useEffect, useId, useLayoutEffect, useRef, type CSSProperties } from "react";
import type { Copy } from "@/lib/i18n";
import { EASE_OUT, EASE_REVEAL } from "@/lib/motion";
import { SCREENS, screenNumber } from "@/lib/screens";
import styles from "./PageOverlay.module.css";

export type OverlayState = {
  index: number;
  /** Viewport point the circular reveal grows from. */
  origin: { x: number; y: number };
};

type Props = {
  state: OverlayState | null;
  t: Copy;
  motion: boolean;
  onClosed: () => void;
};

const circle = (r: number, x: number, y: number) => `circle(${r}px at ${x}px ${y}px)`;

/** Radius that covers the whole viewport from (x, y). */
const coverRadius = (x: number, y: number) =>
  Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

/**
 * Full-screen placeholder for a screen's page, revealed with a circle that
 * grows from the touch point. Stays mounted so it can animate in and out.
 */
export function PageOverlay({ state, t, motion, onClosed }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!state || !el) return;

    const { x, y } = state.origin;
    closing.current = false;
    returnFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    el.getAnimations().forEach((animation) => animation.cancel());
    el.animate(
      [{ clipPath: circle(0, x, y) }, { clipPath: circle(coverRadius(x, y), x, y) }],
      { duration: motion ? 900 : 0, easing: EASE_REVEAL, fill: "forwards" },
    );
    Array.from(el.children).forEach((child, k) =>
      child.animate(
        [
          { opacity: 0, transform: "translateY(24px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: motion ? 700 : 0,
          delay: motion ? 450 + k * 80 : 0,
          easing: EASE_OUT,
          fill: "backwards",
        },
      ),
    );
    backRef.current?.focus({ preventScroll: true });
  }, [state, motion]);

  const close = useCallback(() => {
    const el = ref.current;
    if (!state || !el || closing.current) return;
    closing.current = true;

    const { x, y } = state.origin;
    el.animate(
      [{ clipPath: circle(coverRadius(x, y), x, y) }, { clipPath: circle(0, x, y) }],
      { duration: motion ? 700 : 0, easing: EASE_REVEAL, fill: "forwards" },
    ).onfinish = () => {
      onClosed();
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [state, motion, onClosed]);

  useEffect(() => {
    if (!state) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [state, close]);

  const index = state?.index ?? 0;
  const screen = SCREENS[index];
  const content = t.screens[screen.id];
  const style = {
    "--overlay-bg": screen.color,
    "--overlay-fg": screen.onColor,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={styles.overlay}
      style={style}
      data-open={state !== null}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className={styles.bar}>
        <p className={styles.eyebrow}>
          {index === 0 ? t.centre : `${screenNumber(index)} · ${t.platform}`}
        </p>
        <button ref={backRef} type="button" className={styles.back} onClick={close}>
          <span aria-hidden>{t.backArrow}</span> {t.back}
        </button>
      </div>

      <div className={styles.content}>
        <h2 id={titleId} className={styles.title}>
          {content.title}
        </h2>
        <p className={styles.line}>{content.line}</p>
      </div>

      <p className={styles.note}>{t.later}</p>
    </div>
  );
}
