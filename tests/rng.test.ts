import { describe, expect, it } from 'vitest';
import { PANEL_TIE_HOLES, PANEL_METERS } from '../src/materials/panel';
import { paramsFromSearch, normalizeParams } from '../src/params';
import { hashSeed, makeRng } from '../src/rng';
import { sunAt } from '../src/sun';

describe('rng', () => {
  it('hashes the same string to the same uint32', () => {
    expect(hashSeed('ando')).toBe(hashSeed('ando'));
    expect(hashSeed('ando')).not.toBe(hashSeed('ando-2'));
  });

  it('replays a stream from a seed', () => {
    const a = makeRng(hashSeed('chapel'));
    const b = makeRng(hashSeed('chapel'));
    const left = Array.from({ length: 8 }, () => a.next());
    const right = Array.from({ length: 8 }, () => b.next());
    expect(left).toEqual(right);
    expect(left.every((n) => n >= 0 && n < 1)).toBe(true);
  });
});

describe('sun', () => {
  it('puts noon due south and high, morning due east', () => {
    const noon = sunAt(12);
    expect(Math.abs(noon.x)).toBeLessThan(1e-6);
    expect(noon.z).toBeGreaterThan(0.25);
    expect(noon.y).toBeGreaterThan(0.7);

    const morning = sunAt(6);
    expect(morning.x).toBeGreaterThan(0.9);
    expect(Math.abs(morning.z)).toBeLessThan(1e-6);

    const evening = sunAt(18);
    expect(evening.x).toBeLessThan(-0.9);
    expect(Math.abs(evening.z)).toBeLessThan(1e-6);
  });
});

describe('params', () => {
  it('reads the seed query and clamps sliders', () => {
    expect(paramsFromSearch('?seed=church&scale=2&volumes=9&water=-1')).toEqual({
      seed: 'church',
      scale: 1.4,
      volumes: 4,
      water: 0,
    });
    expect(normalizeParams({ seed: '  ', scale: Number.NaN }).seed).toBe('ando');
  });
});

describe('panel', () => {
  it('uses a 1.8×0.9 m panel with six tie holes', () => {
    expect(PANEL_METERS).toEqual({ w: 1.8, h: 0.9 });
    expect(PANEL_TIE_HOLES).toHaveLength(6);
    const columns = new Set(PANEL_TIE_HOLES.map(([u]) => u));
    const rows = new Set(PANEL_TIE_HOLES.map(([, v]) => v));
    expect(columns.size).toBe(2);
    expect(rows.size).toBe(3);
  });
});
