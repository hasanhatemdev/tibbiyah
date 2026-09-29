import { useEffect, useId, useState, type CSSProperties, type MouseEvent } from "react";
import type { Copy } from "@/lib/i18n";
import { STAGE_INTERVAL_MS, rise } from "@/lib/motion";
import styles from "./JourneyCard.module.css";

type Props = {
  t: Copy;
  motion: boolean;
  riseIndex: number;
  onOpen: (event: MouseEvent<HTMLButtonElement>) => void;
};

type StageState = "done" | "active" | "upcoming";

const stageState = (i: number, active: number): StageState =>
  i < active ? "done" : i === active ? "active" : "upcoming";

/** The centre-screen hero: the patient journey with an auto-advancing timeline. */
export function JourneyCard({ t, motion, riseIndex, onOpen }: Props) {
  const [active, setActive] = useState(0);
  const titleId = useId();
  const descriptionId = useId();
  const stageCount = t.stages.length;

  useEffect(() => {
    if (!motion) return;
    const timer = setInterval(
      () => setActive((a) => (a + 1) % stageCount),
      STAGE_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [motion, stageCount]);

  const style = {
    ...rise(riseIndex),
    "--progress": active / (stageCount - 1),
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`${styles.card} rise`}
      style={style}
      onClick={onOpen}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <span className={styles.top}>
        <span className={styles.heading}>
          <span className={styles.eyebrow}>{t.centre}</span>
          <span id={titleId} className={styles.title}>
            {t.screens["patient-journey"].title}
          </span>
          <span id={descriptionId} className={styles.description}>
            {t.journeyDesc}
          </span>
        </span>
        <span className={styles.cta}>
          {t.touch}
          <span className={styles.ctaArrow} aria-hidden>
            {t.arrow}
          </span>
        </span>
      </span>

      <span className={styles.timeline} aria-hidden>
        <span className={styles.track} />
        <span className={styles.progress} />
        <span className={styles.stages}>
          {t.stages.map((name, i) => (
            <span key={i} className={styles.stage} data-state={stageState(i, active)}>
              <span className={styles.dot} />
              <span className={styles.label}>{name}</span>
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
