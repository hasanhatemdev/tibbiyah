import Image from "next/image";
import type { Copy, Lang } from "@/lib/i18n";
import { rise } from "@/lib/motion";
import styles from "./SiteHeader.module.css";

type Props = {
  lang: Lang;
  t: Copy;
  onToggleLang: () => void;
};

export function SiteHeader({ lang, t, onToggleLang }: Props) {
  return (
    // The header keeps its left-to-right layout in both languages.
    <header className={`${styles.header} rise`} style={rise(0)} dir="ltr">
      <div className={styles.start}>
        <button
          type="button"
          className={styles.toggle}
          onClick={onToggleLang}
          aria-label={t.switchLanguage}
        >
          <span className={styles.option} data-active={lang === "en"} lang="en">
            EN
          </span>
          <span
            className={`${styles.option} ${styles.optionArabic}`}
            data-active={lang === "ar"}
            lang="ar"
          >
            عربي
          </span>
        </button>
        <p className={styles.event}>{t.event}</p>
      </div>

      <Image
        className={styles.logo}
        src="/tibbiyah-logo.svg"
        alt="Tibbiyah طبية"
        width={178}
        height={52}
        loading="eager"
      />
    </header>
  );
}
