"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { copy, dirFor, persistLang, type Lang } from "@/lib/i18n";
import { EASE_OUT, rise, useMotion } from "@/lib/motion";
import { SCREENS, screenNumber } from "@/lib/screens";
import { JourneyCard } from "./JourneyCard";
import { PageOverlay, type OverlayState } from "./PageOverlay";
import { PlatformCard } from "./PlatformCard";
import { SiteHeader } from "./SiteHeader";
import styles from "./HomeScreen.module.css";

function centreOf(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export function HomeScreen({ initialLang }: { initialLang: Lang }) {
  const motion = useMotion();
  const [lang, setLang] = useState(initialLang);
  const [overlay, setOverlay] = useState<OverlayState | null>(null);
  const mainRef = useRef<HTMLElement>(null);
  const switchingLang = useRef(false);

  const t = copy[lang];
  const dir = dirFor(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  function toggleLang() {
    if (switchingLang.current) return;
    const next: Lang = lang === "en" ? "ar" : "en";
    persistLang(next);

    const main = mainRef.current;
    if (!main || !motion) {
      setLang(next);
      return;
    }

    // Fade the content out, swap language, then ease it back in.
    switchingLang.current = true;
    const fadeOut = main.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 220,
      easing: "ease-in",
      fill: "forwards",
    });
    fadeOut.onfinish = () => {
      flushSync(() => setLang(next));
      main.animate(
        [
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 520, easing: EASE_OUT },
      );
      fadeOut.cancel();
      switchingLang.current = false;
    };
  }

  function openScreen(index: number, event: MouseEvent<HTMLElement>) {
    // Keyboard-triggered clicks report (0, 0); reveal from the card's centre instead.
    const origin =
      event.detail === 0
        ? centreOf(event.currentTarget)
        : { x: event.clientX, y: event.clientY };
    setOverlay({ index, origin });
  }

  const closeOverlay = useCallback(() => setOverlay(null), []);

  return (
    <div className={styles.root} dir={dir} lang={lang}>
      <SiteHeader lang={lang} t={t} onToggleLang={toggleLang} />

      <main ref={mainRef} className={styles.main}>
        <div className={`${styles.intro} rise`} style={rise(1)}>
          <h1 className={styles.title}>{t.title}</h1>
          <p className={styles.lede}>{t.intro}</p>
        </div>

        <JourneyCard
          t={t}
          motion={motion}
          riseIndex={2}
          onOpen={(event) => openScreen(0, event)}
        />

        <div className={styles.platforms}>
          {SCREENS.slice(1).map((screen, i) => {
            const index = i + 1;
            return (
              <PlatformCard
                key={screen.id}
                screen={screen}
                number={screenNumber(index)}
                title={t.screens[screen.id].title}
                line={t.screens[screen.id].line}
                cta={t.explore}
                arrow={t.arrow}
                riseIndex={3 + i}
                onOpen={(event) => openScreen(index, event)}
              />
            );
          })}
        </div>
      </main>

      <PageOverlay
        state={overlay}
        t={t}
        motion={motion}
        onClosed={closeOverlay}
      />
    </div>
  );
}
