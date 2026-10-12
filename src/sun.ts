export interface SunSample {
  /** Direction from the house toward the sun. */
  x: number;
  y: number;
  z: number;
  intensity: number;
  /** Hex color, warm at the ends of the day. */
  color: number;
  elevation: number;
  azimuth: number;
}

/**
 * `hour` is 6–18. Noon is due design-south (+Z) and high;
 * 6:00 is east (+X); 18:00 is west (−X).
 */
export function sunAt(hour: number): SunSample {
  const h = Math.min(18, Math.max(6, hour));
  const azimuth = ((h - 12) / 12) * Math.PI;
  const t = (h - 6) / 12;
  const elevation = ((8 + Math.sin(t * Math.PI) * 58) * Math.PI) / 180;
  const cosEl = Math.cos(elevation);
  const day = Math.sin(t * Math.PI);
  const warmth = 1 - day;
  const r = 1;
  const g = 0.78 + day * 0.18;
  const b = 0.62 + day * 0.28;
  return {
    x: -Math.sin(azimuth) * cosEl,
    y: Math.sin(elevation),
    z: Math.cos(azimuth) * cosEl,
    intensity: 1.4 + day * 5.2,
    color: rgbToHex(r, g * (1 - warmth * 0.05), b * (1 - warmth * 0.15)),
    elevation,
    azimuth,
  };
}

function rgbToHex(r: number, g: number, b: number): number {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)));
  return (c(r) << 16) + (c(g) << 8) + c(b);
}
