import type { CSSProperties, MouseEvent } from "react";
import { rise } from "@/lib/motion";
import type { Screen } from "@/lib/screens";
import styles from "./PlatformCard.module.css";

type Props = {
  screen: Screen;
  number: string;
  title: string;
  line: string;
  cta: string;
  arrow: string;
  riseIndex: number;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

/** One business-platform tile; floods with the platform colour on hover. */
export function PlatformCard({
  screen,
  number,
  title,
  line,
  cta,
  arrow,
  riseIndex,
  onOpen,
}: Props) {
  const style = {
    ...rise(riseIndex),
    "--accent": screen.color,
    "--on-accent": screen.onColor,
    "--glow": screen.glow,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`${styles.card} rise`}
      style={style}
      onClick={onOpen}
    >
      <span className={styles.meta}>
        <span className={styles.number}>{number}</span>
        <span className={styles.dot} aria-hidden />
      </span>
      <span className={styles.body}>
        <span className={styles.title}>{title}</span>
        <span className={styles.line}>{line}</span>
      </span>
      <span className={styles.cta}>
        {cta} <span aria-hidden>{arrow}</span>
      </span>
    </button>
  );
}
