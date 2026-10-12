/** One plywood form panel: 1.8 m × 0.9 m at scale 1, six tie cones. */
export const PANEL_METERS = { w: 1.8, h: 0.9 } as const;

/**
 * Six form-tie holes per panel, two columns by three rows.
 * Coordinates are fractions of the panel (u across the width, v up the height).
 */
export const PANEL_TIE_HOLES: readonly (readonly [number, number])[] = [
  [0.25, 1 / 6],
  [0.75, 1 / 6],
  [0.25, 0.5],
  [0.75, 0.5],
  [0.25, 5 / 6],
  [0.75, 5 / 6],
];
