# Tibbiyah — GHE 2026 stand

Touchscreen home page for the Tibbiyah stand at the Global Health Exhibition 2026: the patient journey plus five business platforms, in English and Arabic.

```bash
npm run dev     # http://localhost:3000
npm run build && npm run start
```

## Structure

```
app/
  layout.tsx            fonts (Hanken Grotesk, IBM Plex Sans Arabic), <html lang/dir>
  page.tsx              home route
  globals.css           brand tokens, base styles, .rise entrance animation
components/home/
  HomeScreen.tsx        client root: language switch + overlay state
  SiteHeader.tsx        language toggle, event label, logo
  JourneyCard.tsx       centre-screen hero with auto-advancing stage timeline
  PlatformCard.tsx      one platform tile (colour flood on hover)
  PageOverlay.tsx       full-screen page placeholder with circular reveal
lib/
  i18n.ts               EN/AR copy, language helpers
  get-lang.ts           reads the language cookie on the server
  screens.ts            the six screens and their brand colours
  motion.ts             timings, easings, reduced-motion hook
```

The chosen language is stored in the `tib-home-lang` cookie so the server renders it directly on reload. Animations respect `prefers-reduced-motion`.
