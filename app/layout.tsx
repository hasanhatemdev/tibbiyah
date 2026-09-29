import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getLang } from "@/lib/get-lang";
import { dirFor } from "@/lib/i18n";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  weight: ["300", "400", "500", "600"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "Tibbiyah · Global Health Exhibition 2026",
  description:
    "Explore the Tibbiyah stand: the patient journey and five business platforms.",
};

export const viewport: Viewport = {
  themeColor: "#f8f8f3",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();

  return (
    <html
      lang={lang}
      dir={dirFor(lang)}
      className={`${hanken.variable} ${plexArabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
