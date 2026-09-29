/**
 * The six stand screens: the centre patient-journey screen followed by the
 * five business platforms. Order matters — it drives the "01"–"06" numbering.
 *
 * `color` / `onColor` are the screen's brand surface and the text colour that
 * sits on it; `glow` is the tinted drop shadow used on hover.
 */
export const SCREENS = [
  { id: "patient-journey", color: "var(--navy)", onColor: "var(--cream)", glow: "#2a327599" },
  { id: "manufacturing", color: "var(--orange)", onColor: "var(--navy)", glow: "#f7981dcc" },
  { id: "medical-systems", color: "var(--green)", onColor: "var(--white)", glow: "#006c40cc" },
  { id: "service", color: "var(--cyan)", onColor: "var(--navy)", glow: "#00b9dbcc" },
  { id: "digital-health", color: "var(--teal)", onColor: "var(--white)", glow: "#368d75cc" },
  { id: "direct-to-patient", color: "var(--cream)", onColor: "var(--navy)", glow: "#c9cb7acc" },
] as const;

export type Screen = (typeof SCREENS)[number];
export type ScreenId = Screen["id"];

/** "01", "02", … for a zero-based screen index. */
export const screenNumber = (index: number) => String(index + 1).padStart(2, "0");
