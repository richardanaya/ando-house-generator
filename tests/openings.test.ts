import { describe, expect, it } from 'vitest';
import { containsRect, openingHoles, rectsOverlap, subtractMany, subtractRect, type Rect2 } from '../src/openings';

function area(parts: Rect2[]): number {
  return parts.reduce((sum, part) => sum + part.w * part.h, 0);
}

describe('opening subtraction', () => {
  it('removes a rectangular hole without overlap or lost area', () => {
    const host = { x: 0, y: 0, w: 10, h: 8 };
    const hole = { x: 2, y: 3, w: 4, h: 2 };
    const parts = subtractRect(host, hole);
    expect(area(parts) + hole.w * hole.h).toBeCloseTo(area([host]), 6);
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        expect(rectsOverlap(parts[i]!, parts[j]!)).toBe(false);
      }
      expect(containsRect(host, parts[i]!)).toBe(true);
    }
  });

  it('cuts a cruciform into a wall and keeps the concrete area', () => {
    const host = { x: 0, y: 0, w: 12, h: 9 };
    const opening = { kind: 'cruciform' as const, u: 1, v: 1, width: 10, height: 7, arm: 0.8 };
    const holes = openingHoles(opening);
    const parts = subtractMany(host, holes);
    const union = opening.arm * opening.height + opening.arm * opening.width - opening.arm * opening.arm;
    expect(area(parts)).toBeCloseTo(area([host]) - union, 5);
    for (const hole of holes) expect(containsRect(host, hole)).toBe(true);
    for (let i = 0; i < parts.length; i++) {
      for (let j = i + 1; j < parts.length; j++) {
        expect(rectsOverlap(parts[i]!, parts[j]!)).toBe(false);
      }
    }
  });
});
